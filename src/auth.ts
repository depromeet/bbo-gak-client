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

        console.log(account.access_token);

        const {
          data: { accessToken },
        } = await postLogin(provider, account?.access_token!);

        token.accessToken = accessToken;
        token.expiresAt = account.expires_at || 0;
        token.refreshToken = account.refresh_token;

        return token;
      }

      throw new Error('로그인 중 에러가 발생했어요.');
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
