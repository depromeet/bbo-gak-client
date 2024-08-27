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
      // TODO: 카카오 로그인
      const provider = account?.provider === 'google' ? 'GOOGLE' : 'KAKAO';

      const {
        data: { accessToken },
      } = await postLogin(provider, account?.id_token!);

      token.accessToken = accessToken;
      return token;
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
  }
}
