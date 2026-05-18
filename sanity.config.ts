import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'rehat-coffeehouse',
  title: 'Rehat Coffeehouse',
  projectId: '16myqbse',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
