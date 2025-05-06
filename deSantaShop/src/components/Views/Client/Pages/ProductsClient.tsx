/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Select, Pagination, Empty } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../../configs/axios";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discount: number;
  categoryID: number;
}

interface Category {
  id: number;
  name: string;
}

const ProductsClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await instance.get("/products");
      return response.data;
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance.get("/categories");
      return response.data;
    },
  });

  // Hàm lọc sản phẩm
  const filterProducts = (products: Product[]): Product[] => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryID === selectedCategory);
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 px-4 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="border rounded-lg p-3 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-md"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="mt-3 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading products</div>;
  }

  const filteredProducts = filterProducts(products || []);
  const totalItems = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      {/* Filter */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 border-gray-300 rounded-md"
        />
        <Select
          placeholder="Select category"
          allowClear
          className="h-10"
          onChange={(value) => setSelectedCategory(value)}
        >
          {categories?.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Minimum price"
            value={minPrice}
            min={0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMinPrice(value >= 0 ? value : "");
            }}
            className="h-10 border-gray-300 rounded-md"
          />
          <Input
            type="number"
            placeholder="Maximum price"
            value={maxPrice}
            min={0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMaxPrice(value >= 0 ? value : "");
            }}
            className="h-10 border-gray-300 rounded-md"
          />
        </div>
        <Select
          defaultValue="default"
          className="h-10"
          onChange={(value) => setSortOrder(value)}
        >
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="asc">Price ascending</Select.Option>
          <Select.Option value="desc">Price descending</Select.Option>
        </Select>
      </div>

      {/* Products list */}
      {paginatedProducts.length === 0 ? (
        <Empty description="No products found" className="my-10" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product-client/${product.id}`}>
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={product.thumbnail || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <h3 className="text-base font-semibold text-gray-800 text-center mt-3 truncate">
                {product.title}
              </h3>
              <div className="mt-2 text-center">
                <span className="text-sm font-semibold text-cyan-500">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        ${product.price}
                      </span>
                      <span>
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    `$${product.price}`
                  )}
                </span>
              </div>
              <Link to={`/product-client/${product.id}`}>
                <Button
                  className="w-full h-10 mt-4 text-sm font-semibold bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  View details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsClient;
