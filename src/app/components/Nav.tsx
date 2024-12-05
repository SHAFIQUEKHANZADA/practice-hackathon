import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { RiShoppingCart2Line } from 'react-icons/ri'
import SearchInput from './SearchInput'
import MobileMenuBar from './Navlink'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ["400"] })

const Nav = () => {
    return (
        <div className='h-[70px] justify-end flex flex-col gap-3'>
            <div className='text-[#000000] flex items-center md:h-[38px] h-full justify-between w-[90%] mx-auto'>
                <MobileMenuBar/>
                <h1 className={`${inter.className} text-[24px] md:pl-0 pl-[52px] font-bold`}>Exclusive</h1>
                <ul className={`${poppins.className} text-[16px] font-normal hidden gap-[48px] md:flex`}>
                    <Link href='/'>
                        <li className="relative cursor-pointer group">
                            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
                                Home
                                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
                            </span>
                        </li>
                    </Link>
                    <Link href='/contact'>
                        <li className="relative cursor-pointer group">
                            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
                                Contact
                                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
                            </span>
                        </li>
                    </Link>
                    <Link href='/about'>
                        <li className="relative cursor-pointer group">
                            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
                                About
                                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
                            </span>
                        </li>
                    </Link>
                    <Link href='/sign-up'>
                        <li className="relative cursor-pointer group">
                            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
                                Sign Up
                                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
                            </span>
                        </li>
                    </Link>
                </ul>

                <div className='flex items-center gap-6'>
                    <div className="relative md:block hidden">
                        <input
                            type="email"
                            placeholder="What are you looking for?"
                            className="bg-[#F5F5F5] rounded py-3 pr-10 pl-4 h-[38px] w-full"
                        />
                        <FiSearch
                            className="h-6 w-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        />
                    </div>
                    <div className='flex items-center sm:gap-4 gap-3'>
                    <SearchInput/>
                        <FaRegHeart className='sm:w-6 sm:h-6 w-5 h-5' />
                        <RiShoppingCart2Line className='sm:w-6 sm:h-6 w-5 h-5' />
                    </div>
                </div>
            </div>
            <div className="bg-[#000000] opacity-[30%] h-[1px] w-full md:block hidden" />
        </div>
    )
}

export default Nav