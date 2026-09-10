import fs from 'fs';
import path from 'path';
import { Product, Category, Brand, SiteSettings, Inquiry } from '@/types';
import {
  mockProducts,
  mockCategories,
  mockBrands,
  mockSiteSettings,
} from '@/data/mockData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const BRANDS_FILE = path.join(DATA_DIR, 'brands.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataFiles() {
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
}

// Ensure initial files exist on module load
try {
  ensureDataFiles();
} catch (e) {
  console.warn('Could not auto-initialize data files:', e);
}

export function getLocalProducts(): Product[] {
  try {
    ensureDataFiles();
    const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(content);
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
    console.error('Error writing products.json:', error);
    return false;
  }
}

export function getLocalCategories(): Category[] {
  try {
    ensureDataFiles();
    const content = fs.readFileSync(CATEGORIES_FILE, 'utf8');
    return JSON.parse(content);
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
    console.error('Error writing categories.json:', error);
    return false;
  }
}

export function getLocalSettings(): SiteSettings {
  try {
    ensureDataFiles();
    const content = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(content);
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
    console.error('Error writing settings.json:', error);
    return false;
  }
}

export function getLocalBrands(): Brand[] {
  try {
    ensureDataFiles();
    const content = fs.readFileSync(BRANDS_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading brands.json:', error);
    return mockBrands;
  }
}

export function getLocalInquiries(): Inquiry[] {
  try {
    ensureDataFiles();
    const content = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    return JSON.parse(content);
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
    console.error('Error writing inquiries.json:', error);
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


