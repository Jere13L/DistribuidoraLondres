import { NextRequest, NextResponse } from 'next/server';
import {
  getInquiriesAsync,
  updateInquiryStatusAsync,
  deleteInquiryAsync,
} from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const inquiries = await getInquiriesAsync();
  return NextResponse.json(inquiries);
}

export async function PATCH(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const success = await updateInquiryStatusAsync(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Consulta no encontrada' }, { status: 404 });
    }

    const inquiries = await getInquiriesAsync();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error('Error in PATCH /api/admin/inquiries:', error);
    return NextResponse.json({ error: 'Error al actualizar estado' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Falta el parámetro id' }, { status: 400 });
    }

    await deleteInquiryAsync(id);
    const inquiries = await getInquiriesAsync();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error('Error in DELETE /api/admin/inquiries:', error);
    return NextResponse.json({ error: 'Error al eliminar consulta' }, { status: 500 });
  }
}
