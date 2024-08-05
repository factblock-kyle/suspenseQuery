/* eslint-disable import/no-extraneous-dependencies */
// stacks/MyStack.ts
import path from 'path';

import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import dotenv from 'dotenv'; // Add this line
import { StackContext, NextjsSite } from 'sst/constructs';

export function BoilerPlateStack({ stack }: StackContext) {
  const stage = process.env.SST_STAGE || 'local';

  // Look up hosted zone for the root domain
  // Load environment variables from the root .env file
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });

  const hostedZone = HostedZone.fromLookup(stack, 'playfablo.com', {
    domainName: 'playfablo.com',
  });
  // Use the existing wildcard certificate for *.playfablo.com
  const certificate = Certificate.fromCertificateArn(
    stack,
    'WildcardCertificate',
    'arn:aws:acm:us-east-1:985207450571:certificate/e399159e-f08d-489e-af64-48404e16f503',
  );

  const site = new NextjsSite(stack, 'Site', {
    path: '.', // Changed this line
    customDomain: {
      domainName: 'dev.playfablo.com',
      cdk: {
        hostedZone,
        certificate,
      },
    },
    environment: {
      NEXT_PUBLIC_URL:
        process.env.NEXT_PUBLIC_URL || 'https://dev.playfablo.com',
      NEXTAUTH_URL:
        process.env.NEXTAUTH_URL || 'https://dev.playfablo.com/api/auth',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'my-secret',
      NEXT_PUBLIC_GOOGLE_CLIENT_ID:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
      NEXT_PUBLIC_KAKAO_CLIENT_ID:
        process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      NEXT_PUBLIC_KAKAO_CLIENT_SECRET:
        process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || '',
      NEXT_PUBLIC_NAVER_CLIENT_ID:
        process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '',
      NEXT_PUBLIC_NAVER_CLIENT_SECRET:
        process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || '',
      NEXT_PUBLIC_DEV_ENDPOINT: process.env.NEXT_PUBLIC_DEV_ENDPOINT || '',
      NEXT_PUBLIC_FABLO_S3_BUCKET_URL:
        process.env.NEXT_PUBLIC_FABLO_S3_BUCKET_URL || '',
      NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || '',
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
