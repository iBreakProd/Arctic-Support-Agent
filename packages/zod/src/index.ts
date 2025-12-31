import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  imageUrl: z.string().min(1),
  seller: z.string().min(1),
  sellerEmail: z.string().email(),
  sellerRating: z.number().min(0).max(5),
  sellerReviews: z.array(z.string()).min(1),
  category: z.string().min(1),
  subCategory: z.string().min(1),
  rating: z.number().min(0).max(5),
  reviews: z.array(z.string()).min(1),
});

export const orderSchema = z.object({
  productId: z.string().min(1),
  shippingAddress: z.string().min(1),
  shippingStatus: z.string().min(1),
  deliveryDate: z.date(),
  deliveryTime: z.string().min(1),
  deliveryInstructions: z.string().min(1),
  paymentStatus: z.string().min(1),
  paymentMethod: z.string().min(1),
  paymentDate: z.date(),
  totalPrice: z.number().min(0),
  tax: z.number().min(0),
  shipping: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().min(0),
});
