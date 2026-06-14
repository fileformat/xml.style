export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap/demo.xml") {
      return new Response(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
        {
          headers: { "content-type": "application/xml; charset=utf-8" },
        },
      );
    }

    // Example API route you can build out later:
    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ hello: "from the worker!" }), {
        headers: { "content-type": "application/json" },
      });
    }

    // FALLBACK: If no worker routes match, serve the static Astro assets
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
