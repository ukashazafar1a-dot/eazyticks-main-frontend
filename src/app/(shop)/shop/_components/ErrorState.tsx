export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="text-center py-20 text-red-500">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500 mt-2">
        {message || "Please try again later"}
      </p>
    </div>
  );
}