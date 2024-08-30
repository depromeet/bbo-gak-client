import { StrictPropsWithChildren } from '@/types';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleProvider({ children }: StrictPropsWithChildren) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID!;

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
