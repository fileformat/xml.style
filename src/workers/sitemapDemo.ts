export function sitemapDemo(request: Request): Response {
  const url = new URL(request.url);
  const query = url.searchParams;

  // Placeholder read so this endpoint can consume query params in follow-up logic.
  query.toString();

  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
    {
      headers: { "content-type": "text/xml; charset=utf-8" },
    },
  );
}