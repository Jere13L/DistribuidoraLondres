import { cookies } from 'next/headers';

export const ADMIN_USERNAME = 'distribuidoralondres';
export const ADMIN_PASSWORD = 'londres1234';
export const AUTH_COOKIE_NAME = 'londres_admin_session';
export const AUTH_TOKEN_VALUE = 'londres_auth_token_active_session';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_TOKEN_VALUE;
}

