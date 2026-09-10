import { NextRequest, NextResponse } from 'next/server';
import { getSettingsAsync, saveSettingsAsync } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const settings = await getSettingsAsync();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const updated = await req.json();
    const current = await getSettingsAsync();
    const merged = { ...current, ...updated };

    await saveSettingsAsync(merged);
    return NextResponse.json({ success: true, settings: merged });
  } catch (error) {
    console.error('Error in PUT /api/admin/settings:', error);
    return NextResponse.json({ error: 'Error al guardar la configuración' }, { status: 500 });
  }
}
