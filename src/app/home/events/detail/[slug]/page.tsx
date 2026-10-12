import React from "react";
import { permanentRedirect } from "next/navigation";

export const runtime = "edge";

const page = async ({ params }: any) => {
  const slug = params?.slug;
  permanentRedirect("/events/" + slug);
};

export default page;
