import ProductCard from "./ProductCard";
import type { ShopProductListItem } from "../lib/types";

interface Props {
  items: ShopProductListItem[];
  code: string;
}

export default function RelatedProducts({ items, code }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="container px-4 py-14 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          You may also like
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          More from this organizer&apos;s catalog.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              code={code}
              name={product.name}
              image={product.image}
              startingPrice={product.startingPrice}
              collections={product.collections ?? []}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
