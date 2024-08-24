import { signIn } from '@/auth';

export default function Page() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
