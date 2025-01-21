"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { TbRefresh } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const Products =  () => {
  
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  
  const fetchBookings = async () => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&search=${search}`
    );
    setProducts(data.products);
    setCount(data.totalProducts);
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, filter, itemsPerPage, search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users-count?filter=${filter}&search=${search}`
      );
  
      setCount(data.count); 
    };
    getCount();
  }, [filter, search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&search=${search}`
      );
      setCount(data.totalProducts); 
    };
    getCount();
  }, [filter, search, itemsPerPage]);
  

  const numberOfPages = count > 0 ? Math.ceil(count / itemsPerPage) : 1;
const pages = [...Array(numberOfPages).keys()].map((el) => el + 1);


  //  handle pagination button
  const handlePaginationButton = (value: number): void => {
    console.log(value);
    setCurrentPage(value);
  };
  
  const handleReset = (): void => {
    setFilter("");
    setSearch("");
    setSearchText("");
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearch(searchText);
  };

  console.log(products)
  
  return (
    <div className="text-slate-800 mb-24">
      <div className="text-center container mx-auto">
        <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
        <h2 className="text-5xl">Our Service Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which do not look even slightly
          believable.{" "}
        </p>
      </div>

      <div className=" flex w-full flex-col md:flex-row items-center gap-5">
        <div className="md:max-w-44 relative flex items-center font-roboto font-medium text-base w-full">
          <select
            onChange={e => {
              setFilter(e.target.value)
              setCurrentPage(1)
            }}
            value={filter}
            name=""
            id=""
            className="border w-full appearance-none cursor-pointer focus:outline-none px-4 py-3 rounded"
          >
            <option value=""></option>
          </select>
          <span className="absolute text-xl right-3 pointer-events-none">
            <IoFilter />
          </span>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex-grow font-roboto font-medium w-full"
        >
          <div className="flex overflow-hidden border focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <button className="px-3 py-3 text-sm font-medium tracking-wider uppercase rounded bg-none transition-colors duration-300 transform focus:outline-none">
              <FaSearch className="font-bold" />
            </button>
            <input
              className="pr-6 pl-1 py-2 w-full placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder="Search By Product Name"
                aria-label='Enter User Name'
            />
            <button className="lg:flex hidden px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#00C8AA] hover:bg-[#2CACD5] focus:[#FF0143] focus:outline-none">
              Search
            </button>
          </div>
        </form>

        <button
          onClick={handleReset}
          className="px-2 md:px-4 font-roboto justify-center flex items-center gap-1 py-3 text-base font-medium rounded border"
        >
          <TbRefresh />
          Reset
        </button>
      </div>

      <div className="container mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products?.length > 0 &&
          products.map((product, indx) => (
            <ProductCard product={product} key={indx} />
          ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-white disabled:text-gray-500 capitalize bg-[#FD4C5C] rounded-full disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#FF0143] hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <IoIosArrowBack />
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-[#FD4C5C] text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform border rounded-full sm:inline hover:bg-[#FF0143]  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-[#FD4C5C] rounded-full hover:bg-[#FF0143] disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <IoIosArrowForward />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Products;
