import fs from 'fs';
import path from 'path';
import { Product, Category, Brand, SiteSettings, Inquiry } from '@/types';
import {
  mockProducts,
  mockCategories,
  mockBrands,
  mockSiteSettings,
} from '@/data/mockData';
import { getSupabase } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const BRANDS_FILE = path.join(DATA_DIR, 'brands.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataFiles() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(mockProducts, null, 2), 'utf8');
    }

    if (!fs.existsSync(CATEGORIES_FILE)) {
      fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(mockCategories, null, 2), 'utf8');
    }

    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(mockSiteSettings, null, 2), 'utf8');
    }

    if (!fs.existsSync(BRANDS_FILE)) {
      fs.writeFileSync(BRANDS_FILE, JSON.stringify(mockBrands, null, 2), 'utf8');
    }

    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (e) {
    // In serverless environments, filesystem may be read-only
  }
}

// Ensure initial files exist on module load
try {
  ensureDataFiles();
} catch (e) {
  // Ignored in read-only environments
}

/* ========================================================
   LOCAL STORAGE HELPERS (SYNCHRONOUS FALLBACK)
======================================================== */

export function getLocalProducts(): Product[] {
  try {
    ensureDataFiles();
    if (fs.existsSync(PRODUCTS_FILE)) {
      const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      return JSON.parse(content);
    }
    return mockProducts;
  } catch (error) {
    console.error('Error reading products.json:', error);
    return mockProducts;
  }
}

export function saveLocalProducts(products: Product[]): boolean {
  try {
    ensureDataFiles();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.warn('Could not write products.json (may be read-only environment):', error);
    return false;
  }
}

export function getLocalCategories(): Category[] {
  try {
    ensureDataFiles();
    if (fs.existsSync(CATEGORIES_FILE)) {
      const content = fs.readFileSync(CATEGORIES_FILE, 'utf8');
      return JSON.parse(content);
    }
    return mockCategories;
  } catch (error) {
    console.error('Error reading categories.json:', error);
    return mockCategories;
  }
}

export function saveLocalCategories(categories: Category[]): boolean {
  try {
    ensureDataFiles();
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.warn('Could not write categories.json:', error);
    return false;
  }
}

export function getLocalSettings(): SiteSettings {
  try {
    ensureDataFiles();
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf8');
      return JSON.parse(content);
    }
    return mockSiteSettings;
  } catch (error) {
    console.error('Error reading settings.json:', error);
    return mockSiteSettings;
  }
}

export function saveLocalSettings(settings: SiteSettings): boolean {
  try {
    ensureDataFiles();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.warn('Could not write settings.json:', error);
    return false;
  }
}

export function getLocalBrands(): Brand[] {
  try {
    ensureDataFiles();
    if (fs.existsSync(BRANDS_FILE)) {
      const content = fs.readFileSync(BRANDS_FILE, 'utf8');
      return JSON.parse(content);
    }
    return mockBrands;
  } catch (error) {
    console.error('Error reading brands.json:', error);
    return mockBrands;
  }
}

export function getLocalInquiries(): Inquiry[] {
  try {
    ensureDataFiles();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.error('Error reading inquiries.json:', error);
    return [];
  }
}

export function saveLocalInquiries(inquiries: Inquiry[]): boolean {
  try {
    ensureDataFiles();
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.warn('Could not write inquiries.json:', error);
    return false;
  }
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
   HYBRID SUPABASE + LOCAL ASYNC STORAGE
   (Automatic fallback to local files when Supabase is not connected)
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
        // Also update local copy for offline cache
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

  // Fallback local
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
      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn('Supabase products fetch exception, using local:', err);
    }
  }
  return getLocalProducts();
}

export async function saveProductsAsync(products: Product[]): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('products').upsert(products, { onConflict: '_id' });
      if (!error) {
        try { saveLocalProducts(products); } catch {}
        return true;
      }
      console.warn('Supabase upsert products error:', error.message);
    } catch (err) {
      console.warn('Supabase upsert products exception:', err);
    }
  }
  return saveLocalProducts(products);
}

export async function getCategoriesAsync(): Promise<Category[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (err) {
      console.warn('Supabase categories fetch exception, using local:', err);
    }
  }
  return getLocalCategories();
}

export async function saveCategoriesAsync(categories: Category[]): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(categories, { onConflict: '_id' });
      if (!error) {
        try { saveLocalCategories(categories); } catch {}
        return true;
      }
      console.warn('Supabase upsert categories error:', error.message);
    } catch (err) {
      console.warn('Supabase upsert categories exception:', err);
    }
  }
  return saveLocalCategories(categories);
}

export async function getBrandsAsync(): Promise<Brand[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('brands').select('*');
      if (!error && data && data.length > 0) {
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
        return data.data as SiteSettings;
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
        try { saveLocalSettings(settings); } catch {}
        return true;
      }
    } catch (err) {
      console.warn('Supabase save settings exception:', err);
    }
  }
  return saveLocalSettings(settings);
}
