import { fetchCookie, normalizeResponse } from "@/lib/utils";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

/**
 * Type definition for the options parameter in fetchClient function.
 */
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Centralized fetch function to handle common setup and processing.
 * @param {string} endpoint - The endpoint URL (relative to the base URL).
 * @param {FetchOptions} [options={}] - The fetch options including method, body, etc.
 * @returns {Promise<any>} The response from the fetch request.
 */
async function fetchClient(endpoint: string, options: FetchOptions = {}): Promise<any> {
  const user = JSON.parse(fetchCookie() as string);
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (user?.token) {
    defaultHeaders["Authorization"] = `Bearer ${user.token}`;
  }

  const headers: Record<string, string> = {
    ...defaultHeaders,
    ...options.headers,
  };

  const url = `${BASE_URL}${endpoint}`;

  try {
    // Sanitize options to avoid passing unsupported RequestInit fields
    const sanitized: RequestInit = { ...options };
    // Convert RequestInit "cache" to a request header (Cloudflare Workers don't implement RequestInit.cache)
    const cacheVal = (sanitized as any).cache as string | undefined;
    delete (sanitized as any).cache;
    // Remove Next.js-specific fetch option if present
    delete (sanitized as any).next;

    const finalHeaders = {
      ...headers,
    } as Record<string, string>;

    if (cacheVal) {
      // translate common values to Cache-Control header
      if (cacheVal === "no-store" || cacheVal === "no-cache") {
        finalHeaders["Cache-Control"] = "no-store";
      } else if (cacheVal === "force-cache" || cacheVal === "default") {
        // keep default behavior; do not set a restrictive header
      } else if (cacheVal === "reload") {
        finalHeaders["Cache-Control"] = "no-cache";
      }

      // ensure headers are set when a cache directive was requested
      sanitized.headers = { ...(sanitized.headers as Record<string, string>), ...finalHeaders };
    } else {
      sanitized.headers = { ...(sanitized.headers as Record<string, string>), ...finalHeaders };
    }

    const response = await fetch(url, sanitized);

    // if (!response?.ok) {
    //   return null;
    // }

    const result = await response?.json();
    return normalizeResponse(result, response?.status);
  } catch (error) {
    console.error("Fetch Client Error:", error);
    return null;
  }
}

export default fetchClient;
