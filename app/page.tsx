'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const { isLoggedIn, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        if (user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user');
        }
      } else {
        router.push('/login');
      }
    }
  }, [isLoggedIn, user, isLoading, router]);

  return (
    <div style={{ 
      height: '100vh', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', background: '#05070a', color: 'var(--cyan)' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <Loader2 className="animate-spin" size={48} />
        <p style={{ marginTop: '16px', fontFamily: 'var(--font-rajdhani)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Syncing with Arena...
        </p>
      </div>
    </div>
  );
}
