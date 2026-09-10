export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  itemCount?: number;
}

export interface Brand {
  _id: string;
  name: string;
  slug?: string;
  logo?: string;
  description?: string;
  country?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description?: string;
  category: Category;
  brand?: Brand;
  images: string[];
  presentation: string; // Ej: "Caja x 12 unidades", "Pack x 6", "Bulto cerrado"
  specifications?: ProductSpecification[];
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  schedule: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
}

export interface Inquiry {
  _id: string;
  createdAt: string; // ISO date string
  businessName: string;
  contactPerson: string;
  phone: string;
  city: string;
  businessType: string;
  message: string;
  status: 'pending' | 'contacted' | 'archived';
}


