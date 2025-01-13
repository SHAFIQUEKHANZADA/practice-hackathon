"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import { ProductType } from "@/app/components/types";
import { BsStarFill } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
    return builder.image(source);
}

const ProductPage = ({ params }: { params: { tags: string, product: string } }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { product: name } = params;

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productResponse = await fetch(`/api/${name}`);
                const productData = await productResponse.json();
                console.log("Product Data:", productData);

                if (!productData.success) {
                    throw new Error(productData.message);
                }

                setProduct(productData.data);

                const relatedResponse = await fetch(`/api/${name}`);
                const relatedData = await relatedResponse.json();

                if (!relatedData.success) {
                    throw new Error(relatedData.message);
                }

                setRelatedProducts(relatedData.data || []);
            } catch (err) {
                console.log(err)
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [name]);

    const handleAddToCartAndRedirect = () => {
        if (product) {
            dispatch(
                addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.imageUrl?.asset?.url || '',
                    quantity: 1,
                })
            );
            router.push("/cart");
        } else {
            console.error("Product not found.");
            alert("Product not found.");
        }
    };

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <BsStarFill
                    key={i}
                    className={`text-yellow-500 ${i < rating ? "fill-current" : ""}`}
                />
            ));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className={`${poppins.className} md:px-[70px] px-5 md:my-10 my-6 flex flex-col gap-5`}>
            {/* Breadcrumbs */}
            <div>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/" className="text-[14px] text-black opacity-[50%]">
                            Home
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li>
                        <Link href={`/${params.tags}`} className="text-[14px] text-black opacity-[50%]">
                            {params.tags}
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li className="text-black text-[14px] overflow-hidden whitespace-nowrap text-ellipsis w-[60vw] md:w-full">{product.name}</li>
                </ul>
            </div>

            {/* Product Details */}
            <div className="flex flex-col md:flex-row md:gap-0 gap-10 justify-evenly md:mt-16 mt-5">
                <div className="sm:w-[400px] sm:h-[500px] flex justify-center">
                    <Image
                        src={urlFor(product.imageUrl).url() || '/images/imgone.png'}  
                        alt={product.name || 'Product Image'}
                        width={500}
                        height={600}
                        className="rounded p-4 w-[300px] h-[400px]"
                    />
                </div>

                <div className="flex flex-col  space-y-5 sm:w-[399px] gap-[10px] md:gap-0">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-gray-600">{product.tags}</p>
                    <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <div className="flex gap-3 text-gray-500 text-[14px]">
                            <span className="text-gray-500">({product.ratingCount} Reviews)</span> |
                        </div>
                    </div>
                    <p className="text-[24px]">${product.price}</p>
                    <p className="text-[14px]">{product.description}</p>

                    {/* Add to Cart Section */}
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center sm:gap-0 gap-4">
                        <div className="flex sm:flex-row flex-col justify-between sm:items-center sm:gap-0 gap-4">
                            <button onClick={handleAddToCartAndRedirect} className="text-[16px] font-medium py-[10px] px-[48px] bg-[#DB4444] rounded text-white">
                                Buy Now
                            </button>
                        </div>
                        <div className="h-[45px] w-[45px] border border-gray-400 text-[32px] hover:bg-[#DB4444] hover:text-white flex justify-center items-center rounded">
                            <IoIosHeartEmpty />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="flex flex-col my-10 gap-10">
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-md" />
                    <h1 className="text-[16px] font-semibold text-[#DB4444] hover:underline">Related Items</h1>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct._id} className="rounded justify-between h-[350px] md:w-[270px] relative group">
                                <Image
                                    src={relatedProduct.imageUrl?.asset?.url ? urlFor(relatedProduct.imageUrl).url() : '/default-image.jpg'}
                                    alt={relatedProduct.name}
                                    width={200}
                                    height={200}
                                    className="rounded"
                                />
                                <h4>{relatedProduct.name}</h4>
                                <p>{relatedProduct.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
