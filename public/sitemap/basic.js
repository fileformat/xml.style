/* this is a script to make sitemap.xml files human-readable in browsers.  See https://www.xml.style/ for details. */
console.log(`INFO: processing sitemap.xml from ${window.location.href}`);
document.onreadystatechange = async function () {
    if (document.readyState === "complete") {

        var urlsetEl = document.querySelector("urlset");  // avoid all the namespace stuff and just find based on attributes
        if (!urlsetEl) {
            console.log("WARNING: <urlset> element not found");
            return;
        }

        var urls = urlsetEl.querySelectorAll("url");
        if (!urls || urls.length === 0) {
            console.log("WARNING: no <url> elements found in <urlset>");
            return;
        }

        var title = `Sitemap for ${window.location.hostname}`;
        var description = `This sitemap contains ${urls.length} URLs.`;

        const NS = "http://www.w3.org/1999/xhtml"; // Soooooo important!

        const htmlRoot = document.createElementNS(NS, "html");
        const head = document.createElementNS(NS, "head");
        const link = document.createElementNS(NS, "link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://www.rss.style/css/water.min.css");
        head.appendChild(link);
        const viewport = document.createElementNS(NS, "meta");
        viewport.setAttribute("name", "viewport");
        viewport.setAttribute("content", "width=device-width, initial-scale=1");
        head.appendChild(viewport);
        htmlRoot.appendChild(head);

        const body = document.createElementNS(NS, "body");

        const h1 = document.createElementNS(NS, "h1");
        const sitemapIcon = document.createElementNS(NS, "img");
        sitemapIcon.setAttribute("alt", "sitemap icon");
        sitemapIcon.setAttribute("src", "https://www.xml.style/sitemap/favicon.svg");
        sitemapIcon.setAttribute(
            "style",
            "height:1em;vertical-align:middle;padding-right:0.25em;"
        );
        h1.appendChild(sitemapIcon);
        h1.appendChild(document.createTextNode(title));
        body.appendChild(h1);

        const pdesc = document.createElementNS(NS, "p");
        pdesc.textContent = description;
        body.appendChild(pdesc);

        const listEl = document.createElementNS(NS, "ul");
        for (const urlEl of urls) {
            const locEl = urlEl.querySelector("loc");
            const lastmodEl = urlEl.querySelector("lastmod");
            const url = locEl ? locEl.textContent : null;
            const lastmod = lastmodEl ? lastmodEl.textContent : null;

            if (url) {
                const listItem = document.createElementNS(NS, "li");
                const link = document.createElementNS(NS, "a");
                link.setAttribute("href", url);
                link.textContent = url;
                listItem.appendChild(link);
                if (lastmod) {
                    const lastmodText = document.createElementNS(NS, "span");
                    lastmodText.textContent = ` (last modified: ${lastmod})`;
                    listItem.appendChild(lastmodText);
                }
                listEl.appendChild(listItem);
            }
        }
        body.appendChild(listEl);

        var smallPoweredBy = document.createElementNS(NS, "small");
        smallPoweredBy.appendChild(document.createTextNode("Powered by "));

        const xmlStyleLink = document.createElementNS(NS, "a");
        xmlStyleLink.setAttribute("href", "https://www.xml.style/");
        var xmlStyleIcon = document.createElementNS(NS, "img");
        xmlStyleIcon.setAttribute("alt", "XML.style logo");
        xmlStyleIcon.setAttribute("src", "https://www.xml.style/favicon.svg");
        xmlStyleIcon.setAttribute(
            "style",
            "height:1em;vertical-align:middle;padding-right:0.25em;"
        );
        xmlStyleLink.appendChild(xmlStyleIcon);
        xmlStyleLink.appendChild(document.createTextNode("XML.style"));
        smallPoweredBy.appendChild(xmlStyleLink);
        smallPoweredBy.appendChild(document.createTextNode("."));

        var pPoweredBy = document.createElementNS(NS, "p");
        pPoweredBy.appendChild(smallPoweredBy);

        body.appendChild(pPoweredBy);

        htmlRoot.appendChild(body);

        document.documentElement.replaceWith(htmlRoot);
        return;
    }
};
