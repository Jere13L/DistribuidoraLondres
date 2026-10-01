import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Archivo no proporcionado' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cleanFileName = file.name.replace(/[^\w.-]/g, '_');
    const fileName = `${Date.now()}_${cleanFileName}`;

    // 1. Si Supabase está configurado, subir directamente a Supabase Storage (bucket 'uploads')
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(fileName, buffer, {
            contentType: file.type || 'image/jpeg',
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(fileName);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
          }
        } else if (error) {
          console.warn('Supabase storage upload error, fallback a local:', error.message);
        }
      } catch (err) {
        console.warn('Supabase storage exception, fallback a local:', err);
      }
    }

    // 2. Si es entorno local de desarrollo con disco de escritura
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${fileName}`;
      return NextResponse.json({ success: true, url: publicUrl });
    } catch {
      // 3. Si el disco es de solo lectura (Vercel) y aún no configuraron storage, usar data URL para que la foto no se pierda
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (error) {
    console.error('Error in /api/admin/upload:', error);
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
  }
}

