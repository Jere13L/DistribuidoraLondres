import { NextRequest, NextResponse } from 'next/server';
import { getProductsAsync, saveProductsAsync } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';
import { Product } from '@/types';

export async function GET() {
  const products = await getProductsAsync();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const products = await getProductsAsync();

    const newProduct: Product = {
      _id: body._id || `prod-${Date.now()}`,
      name: body.name || 'Sin título',
      slug:
        body.slug ||
        body.name
          ?.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-') ||
        `prod-${Date.now()}`,
      sku: body.sku || `SKU-${Date.now().toString().slice(-4)}`,
      shortDescription: body.shortDescription || '',
      description: body.description || '',
      category: body.category,
      brand: body.brand,
      images:
        body.images && body.images.length > 0
          ? body.images
          : ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80'],
      presentation: body.presentation || 'Unidad',
      specifications: body.specifications || [],
      inStock: body.inStock ?? true,
      featured: body.featured ?? false,
      isNew: body.isNew ?? false,
    };

    products.unshift(newProduct);
    await saveProductsAsync(products);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error in POST /api/admin/products:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const updatedProduct = await req.json();
    if (!updatedProduct._id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });
    }

    const products = await getProductsAsync();
    const index = products.findIndex((p) => p._id === updatedProduct._id);

    if (index === -1) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    products[index] = {
      ...products[index],
      ...updatedProduct,
    };

    await saveProductsAsync(products);
    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    console.error('Error in PUT /api/admin/products:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el producto' },
      { status: 500 }
    );
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
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const products = await getProductsAsync();
    const filtered = products.filter((p) => p._id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    await saveProductsAsync(filtered);
    return NextResponse.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/products:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
}
