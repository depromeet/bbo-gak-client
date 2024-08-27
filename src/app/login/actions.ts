'use server';

import { signIn } from '@/auth';

export const googleLogin = () => signIn('google', { redirectTo: '/login?auth=select' });
