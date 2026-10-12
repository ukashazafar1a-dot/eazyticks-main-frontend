import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "../../_components/ProductDetailClient";
import RelatedProducts from "../../_components/RelatedProducts";
import ShopNav from "../../_components/ShopNav";
import {
  fetchOrganizerDetail,
  fetchOrganizerProducts,
  fetchProductDetails,
} from "../../lib/fetchers";

export const runtime = 'edge';

interface PageProps {
  params: { id: string };
  searchParams: { code?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const code = searchParams.code;
  if (!code) {
    return (
      <div className="container px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Organizer code required</h1>
        <p className="mt-3 text-muted-foreground">
          Open this product from an organizer shop so we know which catalog to
          load.
        </p>
        <Link
          href="/shop/organizers"
          className="btn btn--primary mt-8 inline-block"
        >
          Browse organizers
        </Link>
      </div>
    );
  }

  const product = await fetchProductDetails(params.id, code);
  if (!product) {
    notFound();
  }

  const organizer = await fetchOrganizerDetail(code);
  const catalog = await fetchOrganizerProducts(code);
  const related = catalog
    .filter((p) => p.id !== Number(params.id))
    .slice(0, 8);

  return (
    <div className="bg-white">
      <ShopNav />
      <ProductDetailClient
        product={product}
        organizerCode={code}
        organizerName={organizer?.name ?? undefined}
      />
      <RelatedProducts items={related} code={code} />
    </div>
  );
}
