import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.xml.style',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'preserve'
  }
});
