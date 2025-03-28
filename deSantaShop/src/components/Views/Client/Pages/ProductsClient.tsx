import { useQuery } from "@tanstack/react-query";
import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../../configs/axios";

interface Product {
  id: number | string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  discount: number;
  categoryID: number;
}

interface Category {
  id: number | string;
  name: string;
}

const ProductsClient = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await instance.get("/products");
      return response.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance.get("/categories");
      return response.data;
    },
    enabled: !!products,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  let filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product: Product) => product.categoryID === selectedCategory
    );
  }

  if (minPrice !== "" && maxPrice !== "") {
    filteredProducts = filteredProducts.filter(
      (product: Product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  if (sortOrder === "asc") {
    filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          placeholder="📂 Select Category"
          allowClear
          className="w-full"
          onChange={(value) => setSelectedCategory(value)}
        >
          {categories?.map((cat: Category) => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="💰 Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || "")}
          />
          <Input
            type="number"
            placeholder="💰 Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || "")}

          />
        </div>

        <Select
          labelInValue={true}
          defaultValue={{ value: "default", label: "🔄 Default" }}
          className="w-full"
          onChange={(option) => setSortOrder(option.value)}
        >
          <Select.Option value="default">🔄 Default</Select.Option>
          <Select.Option value="asc">⬆ Price ascending</Select.Option>
          <Select.Option value="desc">⬇ price descending</Select.Option>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-3 pb-2">
            <h3 className="text-sm font-medium text-center">{product.title}</h3>
            <div className="flex flex-col items-center mt-3">
              <img
                src={product.thumbnail || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md"
              />

              <div className="text-center mt-2">
                <span className="text-sm font-semibold text-cyan-500">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through mr-1">
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
              <Link to={`/product/${product.id}`} className="w-full">
                <Button
                  size="small"
                  className="w-full h-8 mt-3 text-xs font-medium !bg-black !text-white hover:!bg-yellow-300 hover:!text-black transition-all"
                >
                  ADD TO CART
                </Button>

              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default ProductsClient;
