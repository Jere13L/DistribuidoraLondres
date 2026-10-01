import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const configured = isSupabaseConfigured();

  return NextResponse.json({
    supabaseConfigured: configured,
    storageType: configured ? 'supabase_cloud' : 'local_storage',
  });
}
