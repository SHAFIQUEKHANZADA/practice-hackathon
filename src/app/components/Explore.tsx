"use client"
import { Poppins } from 'next/font/google';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { products } from './ProductArray';
import { BsStarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const Explore = () => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setVisibleItems(4);
      } else if (screenWidth >= 768) {
        setVisibleItems(3);
      } else {
        setVisibleItems(1);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);


  const itemsToDisplay = products.slice(
    currentIndex,
    currentIndex + visibleItems
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + visibleItems) % products.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - visibleItems + products.length) % products.length
    );
  };

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

  return (
    <div className={`${poppins.className} md:px-[65px] px-5`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-md" />
        <h1 className="text-[16px] font-semibold text-[#DB4444] hover:underline">
          Our Products
        </h1>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="md:text-[36px] text-[28px] font-semibold">Explore Our Products</h1>
        <div className="md:flex hidden items-center gap-3">
          <button
            onClick={prevSlide}
            className="  bg-[#F5F5F5] w-[46px] h-[46px] rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className=" bg-[#F5F5F5] w-[46px] h-[46px] rounded-full flex items-center justify-center"
          >
            <FaArrowRight />
          </button>

        </div>
        <div className="md:hidden block">
          <button
            onClick={prevSlide}
            className="absolute left-5 top-[45%] transform -translate-y-1/2 bg-[#F5F5F5]  w-10 h-10 rounded-full flex items-center justify-center "
          >
            &#60;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-5 top-[45%] transform -translate-y-1/2 bg-[#F5F5F5]  w-10 h-10 rounded-full flex items-center justify-center "
          >
            &#62;
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="relative my-8 hover:cursor-pointer px-0">
        {/* Carousel */}
        <div className="grid grid-cols-4 grid-rows-2 gap-6">
          {products.slice(7, 21).map((product) => (
            <div
              key={product.id}
              className="group relative bg-white w-full h-[322px] flex flex-col justify-between overflow-hidden"
            >
              <div className="relative w-full h-[250px] overflow-hidden rounded">
                <Image
                  src={product.image}
                  alt={product.category}
                  width={270}
                  height={250}
                  className="w-full h-full object-cover rounded group-hover:scale-110 duration-500"
                />
                <div className="absolute text-[16px] font-medium bottom-0 left-0 w-full h-12 bg-[#000000] text-[#FAFAFA] text-center group-hover:translate-y-0 transition opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  Add to Cart
                </div>
              </div>

              <div className="bg-white flex flex-col justify-center gap-2">
                <h2 className="text-[16px] font-medium text-black truncate">
                  {product.slug.replace(/-/g, " ")}
                </h2>
                <div className="flex gap-2">
                  <p className="text-[#DB4444] pb-1 text-[16px] font-medium">
                    ${product.originalPrice}
                  </p>
                  <div className="ml-[2px]">{renderStars(product.rating)}</div>
                  <div className="text-[14px] font-semibold text-gray-500">
                    ({product.ratedBy})
                  </div>
                </div>
              </div>
              {/* New Badge */}
              {product.newArrival && (
                <div className="absolute top-[10px] left-2 bg-[#00FF66] text-white text-xs px-[12px] py-[4px] rounded">
                  New
                </div>
              )}
              <div className="absolute right-3 top-12 transform -translate-y-1/2 flex flex-col gap-2">
                <div className="bg-white  w-[34px] h-[34px] rounded-full flex items-center justify-center ">
                  <AiOutlineHeart className="text-[24px]" />
                </div>
                <div className="bg-white w-[34px] h-[34px] rounded-full flex items-center justify-center ">
                  <IoEyeOutline className="text-[24px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="flex justify-center py-10">
        <button className="text-[16px] font-medium text-white bg-[#DB4444] rounded px-[48px] py-[16px]">View All Products</button>
      </div>
    </div>
  )
}

export default Explore