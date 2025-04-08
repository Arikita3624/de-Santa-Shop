/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Select, Pagination } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../../configs/axios";

const ProductsClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await instance.get("/products");
      return response.data;
    },
  });

  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance.get("/categories");
      return response.data;
    },
  })

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  let filteredProducts = products.filter((product: { title: string; }) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product: { categoryID: number; }) => product.categoryID === selectedCategory
    );
  }

  if (minPrice !== "" && maxPrice !== "") {
    filteredProducts = filteredProducts.filter(
      (product: { price: number; }) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  if (sortOrder === "asc") {
    filteredProducts.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
  }

  const totalItems = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      {/* Bộ lọc */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select
          placeholder="📂 Category"
          allowClear
          className="w-full"
          onChange={(value) => setSelectedCategory(value)}
        >
          {Categories?.map((category: { id: number; name: string }) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>

        <div className="flex gap-2">
          <Input type="number" placeholder="💰 Min Price" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value) || "")} />
          <Input type="number" placeholder="💰 Max Price" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value) || "")} />
        </div>
        <Select defaultValue="default" className="w-full" onChange={(value) => setSortOrder(value)}>
          <Select.Option value="default">🔄 Default</Select.Option>
          <Select.Option value="asc">⬆ Ascending</Select.Option>
          <Select.Option value="desc">⬇ Descending</Select.Option>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {paginatedProducts.map((product: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; thumbnail: any; discount: number; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) => (
          <div key={product.id} className="border rounded-lg shadow-md p-3 flex flex-col items-center">
            <h3 className="text-sm font-medium text-center">{product.title}</h3>
            <Link to={`/product-client/${product.id}`}><img src={product.thumbnail || "/placeholder.jpg"} alt={product.title} className="w-full h-48 object-contain rounded-md" /></Link>
            <div className="mt-auto text-center">
              <span className="text-sm font-semibold text-cyan-500 block mt-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-gray-500 line-through mr-1">${product.price}</span>
                    <span>${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                  </>
                ) : (
                  `$${product.price}`
                )}
              </span>
              <Link to={`/product/${product.id}`} className="w-full">
                <Button className="w-full h-8 mt-3 text-xs font-medium !bg-black !text-white hover:!bg-yellow-300 hover:!text-black transition-all">
                  ADD TO CART
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductsClient;
