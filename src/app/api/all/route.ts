import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `*[_type == "product" && (tags match "featured" || tags match "electronics" || tags match "jewelery")]{
         _id,
         name,
         description,
         price,
         discountPercentage,
         priceWithoutDiscount,
         rating,
         ratingCount,
         tags,
         sizes,
        "imageUrl": image.asset->url
       }`;

    const products = await client.fetch(query);

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching all products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch all products.' },
      { status: 500 }
    );
  }
}
