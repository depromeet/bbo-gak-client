'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  const handleGoogle = async () => {
    await signIn('google', {});
  };

  if (session) {
    return (
      <div>
        <p>Welcome, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={handleGoogle}>Login with Google</button>;
}
