import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(req: NextRequest, { params }: { params: { product: string } }) {
  console.log(req)
  const { product: name } = params;

  try {
    const productQuery = `*[_type == "product" && name == $name][0]{
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

    const product = await client.fetch(productQuery, { name });

    if (!product) {
      return NextResponse.json(
        { success: false, message: `Product with slug "${name}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product details.' },
      { status: 500 }
    );
  }
}

