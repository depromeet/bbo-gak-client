import NextAuth from 'next-auth';
import 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import { postLogin } from './app/login/api/postLogin';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/login',
    // TODO: 에러 페이지로 이동
    error: '/error',
  },
  callbacks: {
    async jwt({ token, account }) {
      // 첫 로그인
      if (account) {
        // TODO: 카카오 로그인
        const provider = account?.provider === 'google' ? 'GOOGLE' : 'KAKAO';

        const {
          data: { accessToken },
        } = await postLogin(provider, account?.id_token!);

        token.accessToken = accessToken;
        token.expiresAt = account.expires_at || 0;
        token.refreshToken = account.refresh_token;

        return token;
      }

      // at 만료 전
      if (Date.now() < token.expiresAt * 1000) {
        return token;
      }

      // at 만료 -> rt 발급로직
      try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID as string,
            client_secret: process.env.AUTH_GOOGLE_SECRET as string,
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken as string,
          }),
        });

        const tokensOrError = await response.json();

        if (!response.ok) {
          throw tokensOrError;
        }

        const newTokens = tokensOrError as {
          id_token: string;
          expires_in: number;
          refresh_token?: string;
        };

        token.accessToken = newTokens.id_token;
        token.expiresAt = Math.floor(Date.now() / 1000 + newTokens.expires_in);
        if (newTokens.refresh_token) {
          token.refreshToken = newTokens.refresh_token;
        }
        return token;
      } catch (error) {
        console.error('refresh token fetch 오류가 발생했어요.', error);

        throw new Error('로그인 중 에러가 발생했어요.');
      }
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    expiresAt: number;
    refreshToken?: string;
  }
}
