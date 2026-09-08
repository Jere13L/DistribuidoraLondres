import { NextRequest, NextResponse } from 'next/server';
import {
  getLocalCategories,
  saveLocalCategories,
  getLocalProducts,
  saveLocalProducts,
} from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';
import { Category } from '@/types';

export async function GET() {
  const categories = getLocalCategories();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const categories = getLocalCategories();

    const newCategory: Category = {
      _id: body._id || `cat-${Date.now()}`,
      title: body.title || 'Nueva Categoría',
      slug:
        body.slug ||
        body.title
          ?.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-') ||
        `cat-${Date.now()}`,
      description: body.description || '',
      image: body.image || '',
      itemCount: 0,
    };

    categories.push(newCategory);
    saveLocalCategories(categories);

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error('Error in POST /api/admin/categories:', error);
    return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const updated = await req.json();
    const categories = getLocalCategories();
    const index = categories.findIndex((c) => c._id === updated._id);

    if (index === -1) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }

    const prevCategory = categories[index];
    categories[index] = { ...categories[index], ...updated };
    saveLocalCategories(categories);

    // Cascading updates to products
    const products = getLocalProducts();
    let changed = false;
    products.forEach((p) => {
      if (p.category?._id === updated._id || (prevCategory && p.category?.slug === prevCategory.slug)) {
        p.category = {
          ...p.category,
          _id: categories[index]._id,
          title: categories[index].title,
          slug: categories[index].slug,
          description: categories[index].description,
          image: categories[index].image,
        };
        changed = true;
      }
    });
    if (changed) {
      saveLocalProducts(products);
    }

    return NextResponse.json({ success: true, category: categories[index] });
  } catch (error) {
    console.error('Error in PUT /api/admin/categories:', error);
    return NextResponse.json({ error: 'Error al actualizar la categoría' }, { status: 500 });
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

    const categories = getLocalCategories();
    const target = categories.find((c) => c._id === id);
    const filtered = categories.filter((c) => c._id !== id);

    if (filtered.length === categories.length) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }

    saveLocalCategories(filtered);

    // Cascade: clear category from products
    const products = getLocalProducts();
    let changed = false;
    products.forEach((p) => {
      if (p.category?._id === id || (target && p.category?.slug === target.slug)) {
        p.category = undefined as any;
        changed = true;
      }
    });
    if (changed) {
      saveLocalProducts(products);
    }

    return NextResponse.json({ success: true, message: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/categories:', error);
    return NextResponse.json({ error: 'Error al eliminar la categoría' }, { status: 500 });
  }
}


