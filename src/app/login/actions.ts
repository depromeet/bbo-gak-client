'use server';

import { signIn } from '@/auth';

export const googleLogin = async () => await signIn('google', { redirectTo: '/login?auth=select' });
