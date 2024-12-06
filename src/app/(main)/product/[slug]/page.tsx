import { bestSelling, products } from '@/app/components/ProductArray';
import QuantitySelector from '@/app/components/Qty';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const ProductPage = async ({ params, }: { params: { slug: string }; }) => {
    const product =
        products.find((p) => p.slug === params.slug) ||
        bestSelling.find((p) => p.slug === params.slug);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <BsStarFill
                    key={i}
                    className={`text-yellow-500 ${i < rating ? 'fill-current' : ''}`}
                />
            ));
    };


    return (
        <div className={`${poppins.className} md:px-[70px] px-5 md:my-10 my-6 flex flex-col gap-5`}>
            <div>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/" className="text-[14px] text-black opacity-[50%]">
                            Home
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li>
                        <Link href="/products" className="text-[14px] text-black opacity-[50%]">
                            Product
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li className="text-black text-[14px]">{product.title}</li>
                </ul>
            </div>

             
                <div className="flex flex-col md:flex-row md:gap-0 gap-10  justify-evenly md:mt-16 mt-5">
                    <div className='sm:w-[500px] sm:h-[600px]'>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={600}
                            className="rounded"
                        />
                    </div>
                    <div className="flex flex-col justify-between sm:w-[399px] md:h-[650px] gap-[10px] md:gap-0">
                        <h1 className="text-2xl font-semibold">{product.title}</h1>
                        <p className="text-gray-600">{product.category}</p>
                        <div className="flex items-center gap-2">
                            {renderStars(product.rating)}
                            <div className='flex gap-3 text-gray-500 text-[14px]'>
                                <span className="text-gray-500">({product.ratedBy} Reviews)</span> |
                                <span className='text-gray-500 opacity-[60%] text-[14px]'>In stock</span>
                            </div>
                        </div>
                        <p className="text-[24px]">
                            ${product.originalPrice}
                        </p>
                        <p className="text-[14px]">
                            {product.description}
                        </p>
                        <div className="bg-[#000000] opacity-[30%] sm:h-[2px] h-[1px]   w-full" />

                        {/* Color options */}
                        <div className="flex mt-4 gap-5">
                            <p className="text-[20px]">Colors:</p>
                            <div className="flex space-x-4">
                                {product.color.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer ${color.toLowerCase()}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-4 my-4">
                            <p className="text-[20px]">Sizes:</p>
                            <div className="flex flex-wrap space-x-4">
                                {product.size.map((size, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-300 text-[14px] rounded p-2 h-[32px] w-[32px] flex justify-center items-center cursor-pointer hover:bg-gray-100"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between sm:items-center sm:gap-0 gap-4">
                            <QuantitySelector />
                          <div className='flex justify-between gap-0 sm:gap-3'>
                          <div>
                                <button className='text-[16px] font-medium py-[10px] px-[48px] bg-[#DB4444] rounded text-white'>Buy Now</button>
                            </div>
                            <div className='h-[45px] w-[45px] border border-gray-400 text-[32px] hover:bg-[#DB4444] hover:text-white flex justify-center items-center rounded'>
                                <IoIosHeartEmpty />
                            </div>
                          </div>
                        </div>

                        <div className='w-full h-[180px] flex flex-col justify-between py-4 border mt-5 border-gray-500'>
                        <div className='flex gap-3  px-5'>
                          <Image src={"/images/icon-delivery.png"} alt='delivery' width={100} height={100} className='h-[40px] w-[40px]'/>
                          <div>
                            <h1 className='text-[16px] font-medium'>Free Delivery</h1>
                            <p className='text-[12px] underline font-medium'>Enter your postal code for Delivery Availability</p>
                          </div>
                        </div>
                        <div className="bg-[#000000]  h-[1px] my-3 w-full  " />
                        <div className='flex gap-3 px-5'>
                          <Image src={"/images/iconRet.png"} alt='delivery' width={100} height={100} className='h-[40px] w-[40px]'/>
                          <div>
                            <h1 className='text-[16px] font-medium'>Return Delivery</h1>
                            <p className='text-[12px]   font-medium'>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
                          </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
     
    );
};

export default ProductPage;
