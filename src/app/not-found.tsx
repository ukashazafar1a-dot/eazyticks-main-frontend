import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center flex-col">
      <h2 className="h3 mb-5">Not Found</h2>
      <p className="mb-5">Could not find requested resource</p>
      <Link href="/" className="btn btn--primary">
        Return Home
      </Link>
    </div>
  );
}
