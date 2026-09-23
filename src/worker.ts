import { sitemapDemo, sitemapRandomDemo } from "./workers/sitemapDemo";
import { opmlDemo, opmlRandomDemo } from "./workers/opmlDemo";

export default {
  async fetch(request:any, env:any, ctx:any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap/demo.xml") {
      return sitemapDemo(request);
    }
    if (url.pathname === "/sitemap/random.go") {
        return sitemapRandomDemo(request);
    }
    if (url.pathname === "/opml/demo.xml") {
        return opmlDemo(request);
    }
    if (url.pathname === "/opml/random.go") {
        return opmlRandomDemo(request);
    }

    // FALLBACK: 404
    return new Response(JSON.stringify({
        success: false,
        message: "Invalid URL",
        url: url.pathname
    }), {
        status: 404,
        headers: { "content-type": "application/json" },
    });
  },
};
