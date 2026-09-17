import { groq } from 'next-sanity';

export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    sku,
    shortDescription,
    description,
    presentation,
    inStock,
    featured,
    isNew,
    specifications,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon
    },
    "brand": brand->{
      _id,
      name,
      "slug": slug.current
    },
    "images": images[].asset->url
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    sku,
    shortDescription,
    description,
    presentation,
    inStock,
    featured,
    isNew,
    specifications,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon
    },
    "brand": brand->{
      _id,
      name,
      "slug": slug.current
    },
    "images": images[].asset->url
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    "image": image.asset->url,
    "itemCount": count(*[_type == "product" && references(^._id)])
  }
`;

export const brandsQuery = groq`
  *[_type == "brand"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "logo": logo.asset->url,
    description
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    slogan,
    whatsapp,
    phone,
    email,
    city,
    schedule,
    heroTitle,
    heroSubtitle,
    heroBadge
  }
`;

