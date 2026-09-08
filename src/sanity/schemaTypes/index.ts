import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from './category';
import { brandType } from './brand';
import { productType } from './product';
import { siteSettingsType } from './siteSettings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, brandType, siteSettingsType],
};

