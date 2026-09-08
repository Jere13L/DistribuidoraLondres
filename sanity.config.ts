import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';
import { dataset, projectId } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Londres Distribuidora Studio',
  projectId: projectId || 'dummy-project-id',
  dataset: dataset || 'production',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
});

