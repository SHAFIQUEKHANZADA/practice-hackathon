"use client";
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';  

const SearchInput = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
        setIsOpen(true);  
    };

    const closeSearch = () => {
        setIsOpen(false);  
    };

    return (
        <div className="relative md:hidden block">
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-full h-full flex justify-center items-start pt-40 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg p-4">
                        <FiX
                            onClick={closeSearch}
                            className="absolute top-6 right-6 text-gray-700 cursor-pointer text-3xl z-10"
                        />
                        <div className="flex flex-col items-center space-y-4 w-full">
                            <h2 className="text-xl font-semibold text-gray-800">What are you looking for?</h2>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="bg-[#F5F5F5] bg-opacity-60 backdrop-blur-lg w-[80%] sm:w-[300px] py-3 pl-4 pr-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                </div>
            )}
            {!isOpen && (
                <FiSearch
                    onClick={toggleSearch}
                    className="sm:w-6 sm:h-6 w-5 h-5 text-black rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                />
            )}
        </div>
    );
};

export default SearchInput;
