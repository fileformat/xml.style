/* this is a script to make OPML files human-readable in browsers.  See https://www.xml.style/ for details. */
console.log(`INFO: processing OPML from ${window.location.href}`);
document.onreadystatechange = async function () {
    if (document.readyState === "complete") {

        var opmlEl = document.querySelector("opml");  // avoid all the namespace stuff and just find based on attributes
        if (!opmlEl) {
            console.log("WARNING: <opml> element not found");
            return;
        }

        var bodyEl = opmlEl.querySelector("body");  // avoid all the namespace stuff and just find based on attributes
        if (!bodyEl) {
            console.log("WARNING: <body> element not found");
            return;
        }

        var title = `OPML for ${window.location.hostname}`;

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
        sitemapIcon.setAttribute("alt", "OPML icon");
        sitemapIcon.setAttribute("src", "https://www.xml.style/opml/favicon.svg");
        sitemapIcon.setAttribute(
            "style",
            "height:1em;vertical-align:middle;padding-right:0.25em;"
        );
        h1.appendChild(sitemapIcon);
        h1.appendChild(document.createTextNode(title));
        body.appendChild(h1);

        const getDirectOutlineChildren = function (el) {
            return Array.from(el.children).filter((child) => child.localName === "outline");
        };

        const appendOutlineTitleWithLinks = function (containerEl, outlineEl, outlineTitle) {
            containerEl.appendChild(document.createTextNode(outlineTitle));

            const htmlUrl = outlineEl.getAttribute("htmlUrl");
            if (htmlUrl) {
                containerEl.appendChild(document.createTextNode(" "));
                const htmlLink = document.createElementNS(NS, "a");
                htmlLink.setAttribute("href", htmlUrl);
                htmlLink.appendChild(document.createTextNode("website"));
                containerEl.appendChild(htmlLink);
            }

            const xmlUrl = outlineEl.getAttribute("xmlUrl");
            if (xmlUrl) {
                containerEl.appendChild(document.createTextNode(" "));
                const xmlLink = document.createElementNS(NS, "a");
                xmlLink.setAttribute("href", xmlUrl);
                xmlLink.appendChild(document.createTextNode("rss"));
                containerEl.appendChild(xmlLink);
            }
        };

        const buildOutlineDetails = function (outlineEl) {
            const outlineTitle = outlineEl.getAttribute("title") || outlineEl.getAttribute("text") || "(untitled)";
            const childOutlines = getDirectOutlineChildren(outlineEl);

            if (childOutlines.length === 0) {
                const leaf = document.createElementNS(NS, "div");
                appendOutlineTitleWithLinks(leaf, outlineEl, outlineTitle);
                return leaf;
            }

            const details = document.createElementNS(NS, "details");
            const summary = document.createElementNS(NS, "summary");
            summary.style.width = "100%";
            appendOutlineTitleWithLinks(summary, outlineEl, outlineTitle);
            details.appendChild(summary);

            childOutlines.forEach((childOutline) => {
                details.appendChild(buildOutlineDetails(childOutline));
            });

            return details;
        };

        const topLevelOutlines = getDirectOutlineChildren(bodyEl);
        if (topLevelOutlines.length === 0) {
            console.log("WARNING: <body> does not contain a child <outline> element");
            return;
        }

        topLevelOutlines.forEach((outlineEl) => {
            body.appendChild(buildOutlineDetails(outlineEl));
        });




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
