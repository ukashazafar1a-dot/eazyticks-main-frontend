export const runtime = "edge";
import { SHOP_ENDPOINTS } from '@/app/(shop)/shop/lib/constants';




// Proxy POST to external Shop Checkout endpoint to avoid CORS from the browser.
const EXTERNAL_CHECKOUT_URL = SHOP_ENDPOINTS.checkout;

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const orgCode = url.searchParams.get('orgCode');
    const target = orgCode ? `${EXTERNAL_CHECKOUT_URL}?orgCode=${encodeURIComponent(orgCode)}` : EXTERNAL_CHECKOUT_URL;

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
