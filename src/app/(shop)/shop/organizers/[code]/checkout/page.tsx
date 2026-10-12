import ShopCheckoutClient from "../../../_components/ShopCheckoutClient";
import { fetchOrganizerDetail } from "../../../lib/fetchers";

export const runtime = 'edge';

export default async function OrganizerCheckoutPage({
  params,
}: {
  params: { code: string };
}) {
  const organizer = await fetchOrganizerDetail(params.code);

  return (
    <ShopCheckoutClient
      organizerCode={params.code}
      organizerName={organizer?.name ?? undefined}
    />
  );
}
