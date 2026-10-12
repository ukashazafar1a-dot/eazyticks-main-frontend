/** Organizer `img` field is often `cloudinaryId;https://...` */
export function parseShopImage(img: string | null | undefined): string {
  if (!img) return "/productPlaceholder.svg";
  const parts = img.split(";");
  const url = parts.length > 1 ? parts[1]!.trim() : parts[0]!.trim();
  return url || "/productPlaceholder.svg";
}
