/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../../configs/axios';
import { Button, Image, message, Spin } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  // State lưu lựa chọn
  const [selectedRAM, setSelectedRAM] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedGraphics, setSelectedGraphics] = useState('');

  const { data: product, isLoading: loadingProduct, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    },
  });

  const { data: category } = useQuery({
    queryKey: ['category', product?.categoryID],
    queryFn: async () => {
      const response = await instance.get(`/categories/${product.categoryID}`);
      return response.data;
    },
    enabled: !!product?.categoryID,
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await instance.get('/products');
      return response.data;
    },
    enabled: !!product?.categoryID,
  });

  const { mutate } = useMutation({
    mutationFn: async (productData: any) => {
      try {
        const response = await instance.post('carts', productData);
        return response.data;
      } catch (error) {
        throw new Error("Failed to add product");
      }
    },
    onSuccess: () => {
      messageApi.success("Product added successfully!");
    },
    onError: () => {
      messageApi.error("Failed to add product");
    }
  });

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Error loading product...
      </div>
    );
  }

  const finalPrice = product.discount > 0
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);
  const originalPrice = product.discount > 0 ? product.price.toFixed(2) : null;

  const similarProducts = allProducts
    ?.filter((p: any) => p.categoryID === product.categoryID && p.id !== product.id)
    .slice(0, 4) || [];

  const ramOptions = ['8GB', '16GB', '32GB'];
  const storageOptions = ['256GB SSD', '512GB SSD', '1TB SSD'];
  const graphicsOptions = ['Intel Iris Xe', 'NVIDIA GTX 1650', 'NVIDIA RTX 3060'];

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    if (!selectedRAM || !selectedStorage || !selectedGraphics) {
      messageApi.error("Please select all configurations (RAM, Storage, Graphics Card)!");
      return;
    }

    const cartItem = {
      ...product,
      selectedRAM,
      selectedStorage,
      selectedGraphics,
      finalPrice,
    };

    mutate(cartItem);
  };

  return (
    <div>
      {contextHolder}
      <div className="container mx-auto mt-6 px-4 mb-10 shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-100">
        <div className="flex flex-col lg:flex-row gap-12 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 items-start">

          {/* Hình ảnh sản phẩm */}
          <div className="w-full lg:w-1/2 flex justify-center items-start min-h-[300px]">
            <Image
              src={product.thumbnail || '/placeholder.jpg'}
              alt={product.title || 'Product Image'}
              className="w-full max-w-lg rounded-xl object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              fallback="/placeholder.jpg"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start space-y-4 min-h-[300px]">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.title}
            </h1>

            {/* Giá */}
            <div className="flex items-center gap-6">
              {originalPrice && (
                <span className="text-xl text-gray-400 line-through">${originalPrice}</span>
              )}
              <span className="text-5xl font-bold text-black">${finalPrice}</span>
              {product.discount > 0 && (
                <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Lựa chọn loại sản phẩm */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">RAM</label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  value={selectedRAM}
                  onChange={(e) => setSelectedRAM(e.target.value)}
                >
                  <option value="">Chọn RAM</option>
                  {ramOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">Storage</label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                >
                  <option value="">Chọn Storage</option>
                  {storageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">Graphics Card</label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  value={selectedGraphics}
                  onChange={(e) => setSelectedGraphics(e.target.value)}
                >
                  <option value="">Chọn Graphics Card</option>
                  {graphicsOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mô tả sản phẩm */}
            {product.description && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Description</h2>
                <div className="flex flex-col gap-2 text-gray-700 leading-relaxed">
                  {product.description.split('\n').map((line: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-gray-500">•</span>
                      <p>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category */}
            <div className="pt-4 text-lg">
              <span className="text-gray-600">Category: </span>
              <span className="text-black font-semibold">{category?.name || 'Unknown'}</span>
            </div>

            {/* Button Add to Cart */}
            <div className="pt-8">
              <Button
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 py-4 px-8 rounded-xl w-full text-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((p: any) => (
                <Link key={p.id} to={`/product-client/${p.id}`}>
                  <div className="bg-white p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200 rounded-xl">
                    <Image
                      src={p.thumbnail || '/placeholder.jpg'}
                      alt={p.title}
                      className="w-full h-48 object-cover rounded-md mb-2"
                      fallback="/placeholder.jpg"
                    />
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">{p.title}</h3>
                      <div className="mt-auto">
                        <p className="text-gray-700">${p.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;