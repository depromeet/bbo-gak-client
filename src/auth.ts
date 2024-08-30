import NextAuth from 'next-auth';
import 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import { postLogin } from './app/login/api/postLogin';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, JOB_SELECTION, REFRESH_TOKEN, SELECT, NONE } from './app/login/constants/token';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, account }) {
      // 첫 로그인
      if (account) {
        // TODO: 카카오 로그인
        const provider = account?.provider === 'google' ? 'GOOGLE' : 'KAKAO';

        console.log(account);

        const {
          data: { accessToken, refreshToken, isFirstLogin },
        } = await postLogin(provider, account?.access_token!);

        const jobSelection = isFirstLogin ? SELECT : NONE;

        cookies().set(ACCESS_TOKEN, accessToken);
        cookies().set(REFRESH_TOKEN, refreshToken);
        cookies().set(JOB_SELECTION, jobSelection);

        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        return token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
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
