import { notFound } from "next/navigation";

const getData = async (slug?: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Catalog${slug ? slug : ""}`
    );
    const result = await res.json();
    if (!result?.succeeded) {
      return notFound();
    }
    //console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default getData;
