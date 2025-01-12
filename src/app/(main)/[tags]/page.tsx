"use client";
import { Poppins } from "next/font/google";
import { BsStarFill } from "react-icons/bs";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/components/types";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const ProPage = ({ params }: { params: { tags: string } }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProducts = async (category: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/${category}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data.data);
    } catch (err) {
      console.log(err)
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    const category = path.replace("/", "");

    if (category) {
      fetchProducts(category);
    }
  }, [router]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<BsStarFill key={i} className="text-yellow-500" />);
      } else {
        stars.push(<BsStarFill key={i} className="text-gray-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const renderDiscount = (salePrice: number, originalPrice: number) => {
    if (salePrice < originalPrice) {
      const discountPercentage = Math.round(
        ((originalPrice - salePrice) / originalPrice) * 100
      );
      return (
        <div className="bg-[#DB4444] text-[#FAFAFA] py-[5px] px-[15px] rounded text-[12px]">
          -{discountPercentage}%
        </div>
      );
    }
    return null;
  };


  return (
    <div className={`${poppins.className} md:px-[65px] px-5 flex flex-col justify-between my-12`}>

      {/* Breadcrumbs */}
      <div>
        <ul className="flex items-center space-x-1 md:space-x-3">
          <li>
            <Link href="/" className="text-[14px] text-black opacity-[50%]">
              Home
            </Link>
          </li>
          <li className="text-[14px] text-black opacity-[50%]">/</li>
          <li className="text-black text-[14px]">{params.tags}</li>
        </ul>
      </div>

      {isLoading ? (
        <div className="my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded md:h-[350px] h-[300px] md:w-[270px] w-full"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center my-8">
          {error}
        </div>
      ) : (
        <div className="my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4 relative">

          {products.map((product, id) => (
            <Link href={`/product/${product.name}`} className="w-full overflow-hidden" key={id}>
              <div className="relative group bg-white rounded overflow-hidden md:h-[350px] h-[300px] md:w-[270px] flex flex-col justify-between">
                <div className="relative w-full sm:h-[250px] h-[200px] flex items-center justify-center overflow-hidden rounded">
                  <Image
                    src={urlFor(product.imageUrl).url()}
                    alt={product.name}
                    width={270}
                    height={250}
                    className="w-[200px] h-[200px] rounded group-hover:scale-110 duration-500"
                  />
                  <div className="absolute text-[16px] font-medium bottom-0 left-0 w-full h-12 bg-[#000000] text-[#FAFAFA] text-center  group-hover:translate-y-0 transition opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    Add to Cart
                  </div>
                </div>

                <div className="bg-white flex flex-col gap-2">
                  <h2 className="text-[16px] font-semibold text-black truncate">{product.name.replace(/-/g, " ")}</h2>
                  <div className="flex items-center gap-3">
                    <p className="text-[#DB4444] text-[16px] font-medium">${product.price}</p>
                    <p className="text-gray-500 text-[16px] font-medium line-through">${product.priceWithoutDiscount}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="mb-[3px]">{renderStars(product.rating)}</div>
                    <div className="text-[14px] font-semibold text-gray-500">({product.ratingCount})</div>
                  </div>
                </div>



                <div className="absolute sm:right-3 right-2 top-7 transform -translate-y-1/2 flex flex-col gap-2">
                  <div className="bg-white sm:w-[34px] sm:h-[34px] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <IoEyeOutline className="sm:text-[24px] text-[20px]" />
                  </div>

                </div>
              </div>

              <div className="absolute left-3 top-3">
                {renderDiscount(product.price, product.priceWithoutDiscount)}
              </div>

            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProPage;
