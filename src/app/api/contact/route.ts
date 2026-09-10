import { NextResponse } from 'next/server';
import { addLocalInquiry } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactPerson, phone, city, businessType, message } = body;

    if (!contactPerson || !phone || !message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (contacto, teléfono o mensaje).' },
        { status: 400 }
      );
    }

    const newInquiry = addLocalInquiry({
      businessName: businessName?.trim() || 'No especificado',
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      city: city?.trim() || 'No especificada',
      businessType: businessType || 'barberia',
      message: message.trim(),
    });

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact inquiry:', error);
    return NextResponse.json(
      { error: 'Error interno al guardar la consulta.' },
      { status: 500 }
    );
  }
}

