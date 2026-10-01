import fs from 'fs';
import path from 'path';
import os from 'os';
import { Product, Category, Brand, SiteSettings, Inquiry } from '@/types';
import {
  mockProducts,
  mockCategories,
  mockBrands,
  mockSiteSettings,
} from '@/data/mockData';
import { getSupabase } from './supabase';

// Global in-memory cache to ensure instant reactivity and persistence across warm serverless lambdas
declare global {
  var __londress_products: Product[] | undefined;
  var __londress_categories: Category[] | undefined;
  var __londress_settings: SiteSettings | undefined;
  var __londress_brands: Brand[] | undefined;
  var __londress_inquiries: Inquiry[] | undefined;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const BRANDS_FILE = path.join(DATA_DIR, 'brands.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Writable fallback storage in serverless environments (e.g. Vercel /tmp)
const TMP_DIR = path.join(os.tmpdir(), 'londress_data');
const TMP_PRODUCTS_FILE = path.join(TMP_DIR, 'products.json');
const TMP_CATEGORIES_FILE = path.join(TMP_DIR, 'categories.json');
const TMP_SETTINGS_FILE = path.join(TMP_DIR, 'settings.json');
const TMP_BRANDS_FILE = path.join(TMP_DIR, 'brands.json');
const TMP_INQUIRIES_FILE = path.join(TMP_DIR, 'inquiries.json');

function ensureTmpDir() {
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
  } catch {}
}

function writeSafe(targetFile: string, tmpFile: string, data: any): boolean {
  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  let written = false;

  // 1. Try local project file (works in development or writable disk)
  try {
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(targetFile, jsonStr, 'utf8');
    written = true;
  } catch (e) {
    // In Vercel serverless, filesystem is read-only
  }

  // 2. Write to /tmp (always writable in Vercel serverless)
  try {
    ensureTmpDir();
    fs.writeFileSync(tmpFile, jsonStr, 'utf8');
    written = true;
  } catch (e) {
    console.warn('Could not write to tmpdir file:', tmpFile, e);
  }

  return written;
}

function readSafe<T>(targetFile: string, tmpFile: string, fallback: T): T {
  // 1. Check if a newer version was saved to /tmp
  try {
    if (fs.existsSync(tmpFile)) {
      const content = fs.readFileSync(tmpFile, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {}

  // 2. Check bundled file in src/data/
  try {
    if (fs.existsSync(targetFile)) {
      const content = fs.readFileSync(targetFile, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {}

  return fallback;
}

/* ========================================================
   LOCAL STORAGE HELPERS (SYNCHRONOUS FALLBACK + IN-MEMORY)
======================================================== */

export function getLocalProducts(): Product[] {
  if (globalThis.__londress_products && Array.isArray(globalThis.__londress_products)) {
    return globalThis.__londress_products;
  }
  const products = readSafe<Product[]>(PRODUCTS_FILE, TMP_PRODUCTS_FILE, mockProducts);
  globalThis.__londress_products = products;
  return products;
}

export function saveLocalProducts(products: Product[]): boolean {
  globalThis.__londress_products = products;
  return writeSafe(PRODUCTS_FILE, TMP_PRODUCTS_FILE, products);
}

export function getLocalCategories(): Category[] {
  if (globalThis.__londress_categories && Array.isArray(globalThis.__londress_categories)) {
    return globalThis.__londress_categories;
  }
  const categories = readSafe<Category[]>(CATEGORIES_FILE, TMP_CATEGORIES_FILE, mockCategories);
  globalThis.__londress_categories = categories;
  return categories;
}

export function saveLocalCategories(categories: Category[]): boolean {
  globalThis.__londress_categories = categories;
  return writeSafe(CATEGORIES_FILE, TMP_CATEGORIES_FILE, categories);
}

export function getLocalSettings(): SiteSettings {
  if (globalThis.__londress_settings) {
    return globalThis.__londress_settings;
  }
  const settings = readSafe<SiteSettings>(SETTINGS_FILE, TMP_SETTINGS_FILE, mockSiteSettings);
  globalThis.__londress_settings = settings;
  return settings;
}

export function saveLocalSettings(settings: SiteSettings): boolean {
  globalThis.__londress_settings = settings;
  return writeSafe(SETTINGS_FILE, TMP_SETTINGS_FILE, settings);
}

export function getLocalBrands(): Brand[] {
  if (globalThis.__londress_brands && Array.isArray(globalThis.__londress_brands)) {
    return globalThis.__londress_brands;
  }
  const brands = readSafe<Brand[]>(BRANDS_FILE, TMP_BRANDS_FILE, mockBrands);
  globalThis.__londress_brands = brands;
  return brands;
}

export function getLocalInquiries(): Inquiry[] {
  if (globalThis.__londress_inquiries && Array.isArray(globalThis.__londress_inquiries)) {
    return globalThis.__londress_inquiries;
  }
  const inquiries = readSafe<Inquiry[]>(INQUIRIES_FILE, TMP_INQUIRIES_FILE, []);
  globalThis.__londress_inquiries = inquiries;
  return inquiries;
}

export function saveLocalInquiries(inquiries: Inquiry[]): boolean {
  globalThis.__londress_inquiries = inquiries;
  return writeSafe(INQUIRIES_FILE, TMP_INQUIRIES_FILE, inquiries);
}

export function addLocalInquiry(
  data: Omit<Inquiry, '_id' | 'createdAt' | 'status'>
): Inquiry {
  const inquiries = getLocalInquiries();
  const newInquiry: Inquiry = {
    ...data,
    _id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  inquiries.unshift(newInquiry);
  saveLocalInquiries(inquiries);
  return newInquiry;
}

export function updateInquiryStatus(
  id: string,
  status: 'pending' | 'contacted' | 'archived'
): boolean {
  const inquiries = getLocalInquiries();
  const idx = inquiries.findIndex((i) => i._id === id);
  if (idx === -1) return false;
  inquiries[idx].status = status;
  return saveLocalInquiries(inquiries);
}

export function deleteLocalInquiry(id: string): boolean {
  const inquiries = getLocalInquiries();
  const filtered = inquiries.filter((i) => i._id !== id);
  return saveLocalInquiries(filtered);
}

/* ========================================================
   HYBRID SUPABASE + SERVERLESS ASYNC STORAGE
======================================================== */

export async function getInquiriesAsync(): Promise<Inquiry[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) {
        return data as Inquiry[];
      }
      if (error) {
        console.warn('Supabase inquiries query error, using local:', error.message);
      }
    } catch (err) {
      console.warn('Supabase inquiries exception, using local:', err);
    }
  }
  return getLocalInquiries();
}

export async function addInquiryAsync(
  data: Omit<Inquiry, '_id' | 'createdAt' | 'status'>
): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...data,
    _id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').insert([newInquiry]);
      if (!error) {
        try {
          const local = getLocalInquiries();
          local.unshift(newInquiry);
          saveLocalInquiries(local);
        } catch {}
        return newInquiry;
      }
      console.warn('Supabase insert inquiry error, saving local:', error.message);
    } catch (err) {
      console.warn('Supabase insert inquiry exception, saving local:', err);
    }
  }

  const inquiries = getLocalInquiries();
  inquiries.unshift(newInquiry);
  saveLocalInquiries(inquiries);
  return newInquiry;
}

export async function updateInquiryStatusAsync(
  id: string,
  status: 'pending' | 'contacted' | 'archived'
): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('_id', id);
      if (!error) {
        try {
          updateInquiryStatus(id, status);
        } catch {}
        return true;
      }
      console.warn('Supabase update inquiry error:', error.message);
    } catch (err) {
      console.warn('Supabase update inquiry exception:', err);
    }
  }
  return updateInquiryStatus(id, status);
}

export async function deleteInquiryAsync(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('_id', id);
      if (!error) {
        try {
          deleteLocalInquiry(id);
        } catch {}
        return true;
      }
      console.warn('Supabase delete inquiry error:', error.message);
    } catch (err) {
      console.warn('Supabase delete inquiry exception:', err);
    }
  }
  return deleteLocalInquiry(id);
}

export async function getProductsAsync(): Promise<Product[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        if (data.length > 0) {
          globalThis.__londress_products = data as Product[];
          return data as Product[];
        }
        // Tabla existe pero está vacía: auto-sembrar los 37 productos oficiales
        const initial = getLocalProducts();
        if (initial.length > 0) {
          await supabase.from('products').upsert(initial, { onConflict: '_id' });
          globalThis.__londress_products = initial;
          return initial;
        }
      }
      if (error) {
        console.warn('Supabase products fetch exception, using local:', error.message);
      }
    } catch (err) {
      console.warn('Supabase products fetch exception, using local:', err);
    }
  }
  return getLocalProducts();
}

export async function upsertProductAsync(product: Product): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('products').upsert(product, { onConflict: '_id' });
      if (error) {
        console.warn('Supabase upsert single product error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase upsert single product exception:', err);
    }
  }

  const current = getLocalProducts();
  const index = current.findIndex((p) => p._id === product._id);
  if (index >= 0) {
    current[index] = product;
  } else {
    current.unshift(product);
  }
  globalThis.__londress_products = current;
  saveLocalProducts(current);
  return true;
}

export async function saveProductsAsync(products: Product[]): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('products').upsert(products, { onConflict: '_id' });
      if (!error) {
        globalThis.__londress_products = products;
        saveLocalProducts(products);
        return true;
      }
      console.warn('Supabase upsert products error:', error.message);
    } catch (err) {
      console.warn('Supabase upsert products exception:', err);
    }
  }
  globalThis.__londress_products = products;
  return saveLocalProducts(products);
}

export async function deleteProductAsync(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('_id', id);
      if (error) {
        console.warn('Supabase delete product error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete product exception:', err);
    }
  }

  const current = getLocalProducts();
  const filtered = current.filter((p) => p._id !== id);
  globalThis.__londress_products = filtered;
  saveLocalProducts(filtered);
  return true;
}

export async function getCategoriesAsync(): Promise<Category[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data) {
        if (data.length > 0) {
          globalThis.__londress_categories = data as Category[];
          return data as Category[];
        }
        const initial = getLocalCategories();
        if (initial.length > 0) {
          await supabase.from('categories').upsert(initial, { onConflict: '_id' });
          globalThis.__londress_categories = initial;
          return initial;
        }
      }
      if (error) {
        console.warn('Supabase categories fetch exception, using local:', error.message);
      }
    } catch (err) {
      console.warn('Supabase categories fetch exception, using local:', err);
    }
  }
  return getLocalCategories();
}

export async function upsertCategoryAsync(category: Category): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(category, { onConflict: '_id' });
      if (error) {
        console.warn('Supabase upsert category error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase upsert category exception:', err);
    }
  }

  const current = getLocalCategories();
  const index = current.findIndex((c) => c._id === category._id);
  if (index >= 0) {
    current[index] = category;
  } else {
    current.push(category);
  }
  globalThis.__londress_categories = current;
  saveLocalCategories(current);
  return true;
}

export async function saveCategoriesAsync(categories: Category[]): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(categories, { onConflict: '_id' });
      if (!error) {
        globalThis.__londress_categories = categories;
        saveLocalCategories(categories);
        return true;
      }
      console.warn('Supabase upsert categories error:', error.message);
    } catch (err) {
      console.warn('Supabase upsert categories exception:', err);
    }
  }
  globalThis.__londress_categories = categories;
  return saveLocalCategories(categories);
}

export async function deleteCategoryAsync(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('categories').delete().eq('_id', id);
      if (error) {
        console.warn('Supabase delete category error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete category exception:', err);
    }
  }

  const current = getLocalCategories();
  const filtered = current.filter((c) => c._id !== id);
  globalThis.__londress_categories = filtered;
  saveLocalCategories(filtered);
  return true;
}

export async function getBrandsAsync(): Promise<Brand[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('brands').select('*');
      if (!error && data && data.length > 0) {
        globalThis.__londress_brands = data as Brand[];
        return data as Brand[];
      }
    } catch (err) {
      console.warn('Supabase brands fetch exception, using local:', err);
    }
  }
  return getLocalBrands();
}

export async function getSettingsAsync(): Promise<SiteSettings> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 'default')
        .single();
      if (!error && data?.data) {
        globalThis.__londress_settings = data.data as SiteSettings;
        return data.data as SiteSettings;
      }
      if (error && error.code === 'PGRST116') {
        const initial = getLocalSettings();
        await supabase.from('site_settings').upsert({ id: 'default', data: initial });
        globalThis.__londress_settings = initial;
        return initial;
      }
    } catch (err) {
      console.warn('Supabase settings fetch exception, using local:', err);
    }
  }
  return getLocalSettings();
}

export async function saveSettingsAsync(settings: SiteSettings): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'default', data: settings }, { onConflict: 'id' });
      if (!error) {
        globalThis.__londress_settings = settings;
        saveLocalSettings(settings);
        return true;
      }
    } catch (err) {
      console.warn('Supabase save settings exception:', err);
    }
  }
  globalThis.__londress_settings = settings;
  return saveLocalSettings(settings);
}
