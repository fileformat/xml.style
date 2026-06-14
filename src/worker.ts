import { sitemapDemo } from "./workers/sitemapDemo";
import { opmlDemo } from "./workers/opmlDemo";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap/demo.xml") {
      return sitemapDemo(request);
    }
    if (url.pathname === "/opml/demo.xml") {
        return opmlDemo(request);
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
