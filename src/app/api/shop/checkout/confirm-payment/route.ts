export const runtime = "edge";
// Proxy POST to external Confirm-Payment endpoint
const EXTERNAL_CONFIRM_URL = 'https://shop-api.eazyticks.com/api/Shop/Checkout/Confirm-Payment';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const orgCode = url.searchParams.get('orgCode');
    const target = orgCode ? `${EXTERNAL_CONFIRM_URL}?orgCode=${encodeURIComponent(orgCode)}` : EXTERNAL_CONFIRM_URL;

    const body = await req.text();

    const res = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const text = await res.text();
    const contentType = res.headers.get('content-type') || 'application/json';

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Proxy error', error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
