"use client";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { ProductType } from "./types";
import { urlFor } from "@/sanity/lib/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const FlashSale = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<number>(0);

  console.log(activeIndex)

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        setActiveIndex(swiperInstance.realIndex);
      });
    }
  }, [swiperInstance]);

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/all");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load products");
        }
        const saleProducts = data.data.filter((product: ProductType) => product.discountPercentage > 0);
        setProducts(saleProducts);
      } catch (err) {
        console.log(err)
        setError("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
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

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${poppins.className} md:px-[65px] px-5`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-md" />
          <h1 className="text-[16px] font-semibold text-[#DB4444] hover:underline">
            Today’s
          </h1>
        </div>
        <div className="flex items-center justify-center text-center md:text-start md:justify-between">
          <div className="flex md:flex-row flex-col md:items-end md:gap-[87px]">
            <h1 className="text-[36px] font-semibold">Flash Sales</h1>
            <div className="flex items-end">
              <div>
                <h1 className="text-[12px]">Days</h1>
                <p className="text-[32px] font-bold">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
              </div>
              <span className="text-[#DB4444] font-bold text-[30px] px-3 mb-1">:</span>
              <div>
                <h1 className="text-[12px]">Hours</h1>
                <p className="text-[32px] font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
              </div>
              <span className="text-[#DB4444] font-bold text-[30px] px-3 mb-1">:</span>
              <div>
                <h1 className="text-[12px]">Minutes</h1>
                <p className="text-[32px] font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
              </div>
              <span className="text-[#DB4444] font-bold text-[30px] px-3 mb-1">:</span>
              <div>
                <h1 className="text-[12px]">Seconds</h1>
                <p className="text-[32px] font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex hidden items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevClick}
              className="bg-[#F5F5F5] w-[46px] h-[46px] rounded-full flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextClick}
              className="bg-[#F5F5F5] w-[46px] h-[46px] rounded-full flex items-center justify-center"
            >
              <FaArrowRight />
            </button>
          </div>


        </div>
      </div>
      {/* Products Section */}
      <div className="relative my-8 hover:cursor-pointer px-0">
        {/* Swiper Carousel */}
        <div className="flex">
          {isLoading ? (
            <div className="my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4">
              {Array.from({ length: screenSize >= 1024 ? 4 : screenSize >= 768 ? 3 : 2, }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse rounded md:h-[350px] h-[300px] md:w-[270px] w-full"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center my-8">{error}</div>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView="auto"
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              loop={true}
              className="carousel__wrapper"
            >
              {products.map((product, id) => (
                <SwiperSlide key={id}>
                  <Link href={`/${product.tags}/${product.name}`} className="w-full overflow-hidden">
                    <div className="w-full group relative">

                      <div className="relative mx-3 bg-white sm:w-[270px] w-[80vw] sm:h-[350px] h-[400px] flex flex-col justify-between overflow-hidden">
                        <div className="relative w-full sm:h-[250px] h-[300px] flex items-center justify-center overflow-hidden rounded">
                          <div className="absolute inset-0 flex justify-center items-center bg-white rounded">
                            {isLoading ? (
                              <div className="spinner-border animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                            ) : (
                              <Image
                                src={urlFor(product.imageUrl).url()}
                                alt={product.name}
                                width={270}
                                height={250}
                                className="w-[200px] h-[200px] rounded group-hover:scale-110 duration-500"
                              />
                            )}
                          </div>

                          {/* Discount Percentage */}
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                            {Math.round(((product.priceWithoutDiscount - product.price) / product.priceWithoutDiscount) * 100)}%
                          </div>

                          <div className="absolute text-[16px] font-medium bottom-0 left-0 w-full h-12 bg-[#000000] text-[#FAFAFA] text-center group-hover:translate-y-0 transition opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            Add to Cart
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className=" bg-white flex flex-col justify-center gap-2">
                          <h2 className="text-lg font-semibold text-black truncate">
                            {product.name.replace(/-/g, " ")}
                          </h2>
                          <div className="flex items-center gap-3">
                            <p className="text-[#DB4444] text-[16px] font-medium">
                              ${product.priceWithoutDiscount}
                            </p>
                            <p className="text-gray-500 text-[16px] font-medium line-through">
                              ${product.price}
                            </p>
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="mb-[3px]">{renderStars(product.rating)}</div>
                            <div className="text-[14px] font-semibold text-gray-500">({product.ratingCount})</div>
                          </div>
                        </div>

                        {/* Add to Favorites and View */}
                        <div className="absolute right-3 top-12 transform -translate-y-1/2 flex flex-col gap-2">
                          <div className="bg-white sm:w-[34px] sm:h-[34px] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                            <AiOutlineHeart className="text-[20px] sm:text-[24px]" />
                          </div>
                          <div className="bg-white sm:w-[34px] sm:h-[34px] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                            <IoEyeOutline className="text-[20px] sm:text-[24px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className="flex justify-center py-10">
        <Link href={"/all"}><button className="text-[16px] font-medium text-white bg-[#DB4444] rounded px-[48px] py-[16px] hover:scale-100">View All Products</button></Link>
      </div>

      <div className="bg-[#000000] opacity-[30%] sm:h-[1px] h-[8px] rounded-2xl sm:w-full w-[30%] mx-auto sm:mt-12 mt-6 mb-10 sm:mb-20" />
    </div>

  );
};

export default FlashSale;
