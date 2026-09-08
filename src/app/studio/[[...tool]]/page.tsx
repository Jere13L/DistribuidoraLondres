'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-xs font-semibold">
      Redirigiendo al Panel de Administración...
    </div>
  );
}
