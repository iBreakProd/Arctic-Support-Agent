export const ALLOWED_PRODUCT_IMAGE_URLS = [
  "/images/products/B-1.png",
  "/images/products/B-2.png",
  "/images/products/B-3.png",
  "/images/products/B-4.png",
  "/images/products/B-5.png",
  "/images/products/B-6.png",
  "/images/products/B-7.png",
  "/images/products/B-8.png",
  "/images/products/B-9.png",
  "/images/products/B-10.png",
  "/images/products/B-11.png",
  "/images/products/B-12.png",
  "/images/products/B-13.png",
] as const;

export function isAllowedProductImageUrl(url: string): boolean {
  return (ALLOWED_PRODUCT_IMAGE_URLS as readonly string[]).includes(url);
}
