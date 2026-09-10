const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('src/data/categories.json', 'utf8'));
const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf8'));
const settings = JSON.parse(fs.readFileSync('src/data/settings.json', 'utf8'));

let sql = `-- ====================================================================
-- DISTRIBUIDORA LONDRESS - ESQUEMA Y DATOS INICIALES PARA SUPABASE (POSTGRESQL)
-- ====================================================================
-- INSTRUCCIONES:
-- 1. En tu proyecto de Supabase (https://supabase.com), ve a "SQL Editor".
-- 2. Copia y pega TODO este archivo y haz clic en "Run" (Ejecutar).
-- 3. ¡Listo! Todas las tablas, permisos y tus 28 productos reales quedarán creados.
-- ====================================================================

-- 1. TABLA DE CONSULTAS DE CONTACTO (INQUIRIES)
CREATE TABLE IF NOT EXISTS inquiries (
  _id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "businessName" TEXT,
  "contactPerson" TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  "businessType" TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- 2. TABLA DE PRODUCTOS
CREATE TABLE IF NOT EXISTS products (
  _id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT,
  "shortDescription" TEXT,
  description TEXT,
  category JSONB,
  brand JSONB,
  images JSONB,
  presentation TEXT,
  specifications JSONB,
  "inStock" BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  "isNew" BOOLEAN DEFAULT FALSE
);

-- 3. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS categories (
  _id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  "itemCount" INTEGER DEFAULT 0
);

-- 4. TABLA DE MARCAS
CREATE TABLE IF NOT EXISTS brands (
  _id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo TEXT
);

-- 5. TABLA DE CONFIGURACIÓN DEL SITIO
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  data JSONB NOT NULL
);

-- HABILITAR ROW LEVEL SECURITY (RLS) Y PERMISOS ABIERTOS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public access to inquiries" ON inquiries;
  CREATE POLICY "Public access to inquiries" ON inquiries FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public access to products" ON products;
  CREATE POLICY "Public access to products" ON products FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public access to categories" ON categories;
  CREATE POLICY "Public access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public access to brands" ON brands;
  CREATE POLICY "Public access to brands" ON brands FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public access to site_settings" ON site_settings;
  CREATE POLICY "Public access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
END $$;

-- 6. CARGA DE CONFIGURACIÓN INICIAL
INSERT INTO site_settings (id, data) 
VALUES ('default', '${JSON.stringify(settings).replace(/'/g, "''")}'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;
\n`;

// Seed categories
sql += `-- 7. CARGA DE CATEGORÍAS\n`;
for (const cat of categories) {
  sql += `INSERT INTO categories (_id, title, slug, description, image, "itemCount") VALUES ('${cat._id}', '${(cat.title || '').replace(/'/g, "''")}', '${cat.slug}', '${(cat.description || '').replace(/'/g, "''")}', '${cat.image || ''}', ${cat.itemCount || 0}) ON CONFLICT (_id) DO NOTHING;\n`;
}

// Seed brands
sql += `\n-- 8. CARGA DE MARCAS\n`;
for (const b of brands) {
  sql += `INSERT INTO brands (_id, name, slug, logo) VALUES ('${b._id}', '${(b.name || '').replace(/'/g, "''")}', '${b.slug}', ${b.logo ? `'${b.logo}'` : 'NULL'}) ON CONFLICT (_id) DO NOTHING;\n`;
}

// Seed products
sql += `\n-- 9. CARGA DE PRODUCTOS REALES (${products.length} ARTÍCULOS)\n`;
for (const p of products) {
  const categoryJson = JSON.stringify(p.category || null).replace(/'/g, "''");
  const brandJson = JSON.stringify(p.brand || null).replace(/'/g, "''");
  const imagesJson = JSON.stringify(p.images || []).replace(/'/g, "''");
  const specsJson = JSON.stringify(p.specifications || []).replace(/'/g, "''");
  const name = (p.name || '').replace(/'/g, "''");
  const shortDesc = (p.shortDescription || '').replace(/'/g, "''");
  const desc = (p.description || '').replace(/'/g, "''");
  const pres = (p.presentation || '').replace(/'/g, "''");
  const sku = (p.sku || '').replace(/'/g, "''");

  sql += `INSERT INTO products (_id, name, slug, sku, "shortDescription", description, category, brand, images, presentation, specifications, "inStock", featured, "isNew") VALUES ('${p._id}', '${name}', '${p.slug}', '${sku}', '${shortDesc}', '${desc}', '${categoryJson}'::jsonb, '${brandJson}'::jsonb, '${imagesJson}'::jsonb, '${pres}', '${specsJson}'::jsonb, ${p.inStock ? 'TRUE' : 'FALSE'}, ${p.featured ? 'TRUE' : 'FALSE'}, ${p.isNew ? 'TRUE' : 'FALSE'}) ON CONFLICT (_id) DO NOTHING;\n`;
}

fs.writeFileSync('supabase_schema.sql', sql, 'utf8');
console.log('supabase_schema.sql successfully written!');

