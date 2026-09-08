import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';

// Image URL builder for Sanity
const imageBuilder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) => {
  if (!imageBuilder || !source) return '';
  return imageBuilder.image(source).auto('format').fit('max').url();
};

