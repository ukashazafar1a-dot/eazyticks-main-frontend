import { permanentRedirect, redirect } from "next/navigation";

export const runtime = "edge";

const page = async ({ params, searchParams }: any) => {
  const id = searchParams?.id;
  const sec = searchParams?.sec;
  if (id && sec) {
    permanentRedirect(`/checkout/thank-you?id=${id}&sec=${sec}`);
  } else {
    redirect("/");
  }
};

export default page;
