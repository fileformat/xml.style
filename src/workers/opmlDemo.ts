import { XMLBuilder, XMLParser } from "fast-xml-parser";

export async function opmlDemo(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams;

    const targetUrlStr = query.get("url");
    if (!targetUrlStr) {
        return new Response(null, {
            status: 302,
            headers: { location: "/opml/demo.html?err=missing+url+parameter" },
        });
    }

    let targetUrl: string;

    try {
        targetUrl = new URL(targetUrlStr).toString();
    } catch (err) {
        return new Response(null, {
            status: 302,
            headers: {
                location: `/opml/demo.html?err=invalid+url+parameter&url=${encodeURIComponent(targetUrlStr)}`,
            },
        });
    }

    let response: Response;
    let xmltext: string;

    try {
        response = await fetch(targetUrl);
        xmltext = await response.text();
    } catch (err) {
        return new Response(null, {
            status: 302,
            headers: {
                location: `/opml/demo.html?err=failed+to+fetch+url&url=${encodeURIComponent(targetUrl)}`,
            },
        });
    }

    if (!response.ok) {
        return new Response(null, {
            status: 302,
            headers: {
                location: `/opml/demo.html?err=non-200+response+from+url&url=${encodeURIComponent(targetUrl)}`,
            },
        });
    }

    const xmlOptions = {
        // Use a prefix to distinguish attributes from elements in the JSON object
        attributeNamePrefix: "@_",
        // Do not ignore attributes during parsing
        ignoreAttributes: false,
        ignoreNamespaces: false,
        // Optionally, parse attribute values to native types (int, float, boolean)
        parseAttributeValue: false,
        suppressBooleanAttributes: false,
        format: true,
        indentBy: "  ",
    };

    const parser = new XMLParser(xmlOptions);

    const xmlDocument = parser.parse(xmltext);

    if (xmlDocument.opml) {
        xmlDocument.opml["script"] = {
            "@_src": "/opml/basic.js",
            "@_xmlns": "http://www.w3.org/1999/xhtml",
            "#text": "",
        };
    }

    const builder = new XMLBuilder(xmlOptions);
    const newXmlText = builder.build(xmlDocument);

    return new Response(newXmlText, {
        headers: { "content-type": "text/xml; charset=utf-8" },
    });
}
