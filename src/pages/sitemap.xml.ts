import type { APIRoute } from 'astro';
import { productionUrl, sitemapPageUrls } from '../data/site';

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <script src="/sitemap/basic.js" xmlns="http://www.w3.org/1999/xhtml"></script>
    ${sitemapPageUrls.map((url) => `  <url><loc>${productionUrl}${url}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
