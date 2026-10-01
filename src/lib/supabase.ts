import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

let supabaseClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  return Boolean(
    url &&
      key &&
      url.startsWith('https://') &&
      !url.includes('tu-proyecto') &&
      !url.includes('your-project')
  );
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;

  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
}

