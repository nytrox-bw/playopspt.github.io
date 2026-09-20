export async function onRequestGet() {
  const upstream = "https://github.com/nytrox-bw/playopspt.github.io/releases/download/v1.0.0/120.epw";
  const response = await fetch(upstream, {
    redirect: "follow",
    cf: {
      cacheEverything: true,
      cacheTtl: 86400
    }
  });

  if (!response.ok) {
    return new Response("EPW upstream error: " + response.status, {
      status: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/octet-stream");
  headers.set("Cache-Control", "public, max-age=86400");
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: 200,
    headers
  });
}
