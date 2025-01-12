export interface ProductType {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    priceWithoutDiscount: number;
    rating: number;
    ratingCount: number;
    tags: string[];
    sizes: string[];
    imageUrl: { asset: { _ref: string; url: string }; alt?: string };
  }