export type PostLoginArgs = {
    ipAddress: string;
    lang: string;
    message?: string;
    referralCode: string;
    socialType: string;
    token: string;
    userAgent: string;
    nonce?: string;
    termsAgreed: boolean;
    trackId?: string;
    marketingAgreed: boolean;
    personalAgreed: boolean;
  };