import EmptyState from "../../_components/EmptyState";
import ErrorState from "../../_components/ErrorState";
import OrganizerShopClient from "../../_components/OrganizerShopClient";
import {
  fetchOrganizerDetail,
  fetchOrganizerProducts,
} from "../../lib/fetchers";

export const runtime = 'edge';

interface PageProps {
  params: { code: string };
}

export default async function Page({ params }: PageProps) {
  try {
    const [organizer, products] = await Promise.all([
      fetchOrganizerDetail(params.code),
      fetchOrganizerProducts(params.code),
    ]);

    if (!products.length) {
      return <EmptyState />;
    }

    return (
      <OrganizerShopClient
        organizer={organizer}
        products={products}
        code={params.code}
      />
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";
    return <ErrorState message={message} />;
  }
}
