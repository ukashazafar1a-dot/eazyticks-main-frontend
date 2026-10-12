"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function useQueryParams<T = {}>() {
  const router: any = useRouter();
  const pathname: any = usePathname();
  const searchParams = useSearchParams();
  let newArr: any = Array.from(searchParams?.entries());
  const urlSearchParams: any = searchParams
    ? new URLSearchParams(newArr)
    : null;

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, value ? String(value) : '');
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return { urlSearchParams, setQueryParams };
}
