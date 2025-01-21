"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { TbRefresh } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

type Product = {
  _id: string;
  title: string;
  photo: {
    thumbnail: string;
    cover: string;
  };
  price: number;
};
const Products = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProductData = async () => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&search=${search}`
    );
    setProducts(data.products);
    setCount(data.totalProducts);
  };

  useEffect(() => {
    fetchProductData();
  }, [currentPage, filter, itemsPerPage, search]);

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

  console.log(products);

  return (
    <div className="text-slate-800 mb-24 container mx-auto">
      <div className="text-center container mx-auto my-5">
        <h3 className="text-3xl font-bold ">Our Products</h3>
      </div>

      <div className="flex w-full flex-col md:flex-row items-center gap-5">
        <div className="">
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={filter}
            name="filter"
            id=""
            className="border px-4 py-3 rounded-sm"
          >
            <option value="">Filter By Name</option>
            {[
              ...new Set(products.map((product) => product.title)), 
            ].map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSearch} className="flex-grow">
          <div className="flex p-1 overflow-hidden border focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 w-full text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent "
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Search By Product Name"
              aria-label="Enter Product Name"
            />
            <button
              className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-primary focus:[#FF0143] focus:outline-none
            "
            >
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
          className="px-4 py-2 mx-1 text-white disabled:text-gray-500 capitalize bg-primary rounded-full disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-gray-500  hover:text-white"
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
              currentPage === btnNum ? "bg-primary text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform border rounded-full sm:inline hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-primary rounded-full disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
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
