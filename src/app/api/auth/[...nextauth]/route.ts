/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
   import crypto from 'crypto';

  import { cookies, headers } from 'next/headers';

  import { getAddressFromMessage, getChainIdFromMessage, SIWESession, verifySignature } from '@web3modal/siwe';
  import * as jose from 'jose';
  import { DefaultSession, User } from 'next-auth';
  import NextAuth from 'next-auth/next';
  import credentialsProvider from 'next-auth/providers/credentials';
  import GoogleProvider from 'next-auth/providers/google';
  import KakaoProvider from 'next-auth/providers/kakao';
  import NaverProvider from 'next-auth/providers/naver';

  import { postLogin } from '@/api/user/login';
  import { PostLoginArgs } from '@dto/request/user/LoginRequestDto';
  import { LoginResponseType } from '@dto/response/user/LoginResponseDto';

  declare module 'next-auth' {
    interface Session extends DefaultSession, SIWESession {
      accessToken: string;
      refreshToken: string;
      userId: number;
      address?: string;
      chainId?: number;
    }
  }
  interface JWT {
    id: number;
    email: string;
    token_type: string;
    exp: number;
  }
  
  const ALGORITHM = 'aes-256-cbc';
  const CIPHER_KEY = 'ca55175c6e9a4dd18b7be3dc52e9a1dd';
  const BLOCK_SIZE = 16;
  
  function encrypt(plainText: string) {
    const iv = crypto.randomBytes(BLOCK_SIZE);
  
    const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, iv);
    let cipherText;
    try {
      cipherText = cipher.update(plainText, 'utf8', 'hex');
      cipherText += cipher.final('hex');
      cipherText = iv.toString('hex') + cipherText;
    } catch (e) {
      cipherText = '';
    }
    return cipherText;
  }
  
  const nextAuthSecret = process.env.NEXTAUTH_SECRET
  if (!nextAuthSecret) {
    throw new Error('NEXTAUTH_SECRET is not set')
  }
  
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
  }
  const providers = [
    GoogleProvider({
    // checks: ['none'],
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
    // checks: ['none'],
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
    clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
    clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET as string,
    }),
    credentialsProvider({
    id: 'crypto',
    name: 'Ethereum',
    credentials: {
        signature: {
        label: 'signature',
        type: 'text',
        },
        nonce: {
        label: 'nonce',
        type: 'text',
        },
        message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
        }
    },
      async authorize(credentials) {
        try {
          if (!credentials?.message) {
            throw new Error('SiweMessage is undefined')
          }
          const { message, signature } = credentials
          const address = getAddressFromMessage(message)
          const chainId = getChainIdFromMessage(message)
          const dataToEncrypt = signature;
          const isValid = await verifySignature({ address, message, signature, chainId, projectId })
          const encryptedData = encrypt(dataToEncrypt);
          const user = {
            id: encryptedData,
          };
          if(isValid){return user as unknown as User}return null;
        } catch (e) {
          return null
        }
      }
    })
  ]
  let accessToken = '';
  let refreshToken = '';
  let id = 0;
  
  const handler = NextAuth(
    {
    // https://next-auth.js.org/configuration/providers/oauth
    secret: nextAuthSecret,
  
    providers,
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      async jwt({ token, account, trigger, session }) {
          if (trigger === 'update') {
            // update jwt
            return {
              ...token,
              accessToken: session.accessToken,
              refreshToken: session.refreshToken,
            };
          }
  
          if (account) {
            return {
              ...token,
              userId: id,
              accessToken,
              refreshToken,
            };
          }
          return token;
        },
      async signIn({ account, user, credentials }) {
        let socialType = '';

        if (account?.provider === 'kakao') {
        socialType = 'kakao';
        } else if (account?.provider === 'google') {
        socialType = 'google';
        } else if (account?.provider === 'naver') {
        socialType = 'naver';
        } else if (account?.provider === 'crypto') {
        socialType = 'Metamask';
        }
        const token =
        account?.provider === 'crypto'
            ? user.id
            : account?.access_token || '';

        // const nonce =
        // account?.provider === 'crypto'
        //     ? (credentials?.nonce as string)
        //     : undefined;
        const cookieStore = cookies();
        const headersList = headers();
        const userAgent = headersList.get('user-agent') || '';
        const ipAddress = headersList.get('x-forwarded-for') || '';
        const lang = cookieStore.get('i18next')?.value === 'en' ? 'EN' : 'KR';
        
        // return true;
        const loginArgs: PostLoginArgs = {
        ipAddress,
        lang,
        referralCode: '',
        socialType,
        userAgent,
        message: credentials?.message as string || '',
        token,
        nonce: undefined,
        termsAgreed:  true,
        trackId: 'track_id',
        marketingAgreed:  true ,
        personalAgreed:  true,
        };
        try {
        const [status, response] = await postLogin(loginArgs);
        if (status === 200) {
            const { access_token, refresh_token, need_agreement } =
            response as LoginResponseType;
            if (need_agreement) {
            // handle agreement. Need to open a modal on the client side
            cookieStore.set('need_agreement', account?.provider as string);
            if (account?.provider === 'crypto') {
                cookieStore.set(
                'signature',
                credentials?.signature as string,
                );
                cookieStore.set('nonce', credentials?.nonce as string);
            }
            return '/terms-agree';
            } 
            cookieStore.delete('terms_agreed');
            cookieStore.delete('signature');
            cookieStore.delete('nonce');
            cookieStore.delete('need_agreement');
            cookieStore.delete('marketing_agreed');
            cookieStore.delete('personal_agreed');
            accessToken = access_token;
            refreshToken = refresh_token;
            const claims: JWT = jose.decodeJwt(accessToken);
            id = claims.id;
            return true;
            
        }
        // cookieStore.set('code', code.toString());
        return '/';
        } catch (err) {
        // log in error
        return '/error';
        }
    },
      session({ session, token }) {
        const cookieStore = cookies();
        if(session.address && session.chainId){
          if (!token.sub) {
            return session
          }
          const [, chainId, address] = token.sub.split(':')
          if (chainId && address) {
            session.address = address
            session.chainId = parseInt(chainId, 10)
          }
          return {
            ...session,
            accessToken: session.accessToken as string,
            refreshToken: session.refreshToken as string,
            userId: session.userId as number,
          }
        } 
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            cookieStore.set('logged-in', 'logged-in', {
              secure: true,
            });
            return {
              ...session,
              accessToken: token.accessToken as string,
              refreshToken: token.refreshToken as string,
              userId: token.userId as number,
            };
        
        
      }
    }
  })
  
  
  export { handler as GET, handler as POST };
  