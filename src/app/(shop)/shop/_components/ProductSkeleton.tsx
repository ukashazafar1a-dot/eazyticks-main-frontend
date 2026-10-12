export default function ProductSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden animate-pulse">

      <div className="aspect-square bg-gray-200" />

      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>

    </div>
  );
}