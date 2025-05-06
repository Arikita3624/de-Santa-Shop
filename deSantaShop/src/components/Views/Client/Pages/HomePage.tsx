import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import CountdownTimer from '../Support/CountdownTimer';
import { useQuery } from '@tanstack/react-query';
import instance from '../../../../configs/axios';


interface Product {
  id: number | string;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  categoryID: number;
  quantity: number;
}

interface Category {
  id: number | string;
  name: string;
}

interface News {
  id: number | string;
  title: string;
  content: string;
  image: string;
}

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await instance.get('/products');
      return response.data;
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await instance.get('/categories');
      return response.data;
    },
  });

  const { data: news } = useQuery<News[]>({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await instance.get('/news');
      return response.data;
    },
  });

  console.log(news);


  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.categoryID === selectedCategory)
    : products;

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Skeleton cho Feature Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex flex-col items-center animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-full mb-2"></div>
              <div className="w-20 h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
        {/* Skeleton cho New Arrivals */}
        <section className="my-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="border rounded-lg p-2 animate-pulse">
                <div className="w-full h-36 bg-gray-100 rounded-md mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4 mx-auto"></div>
                <div className="flex justify-between mt-2">
                  <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Skeleton cho Latest News */}
        <section className="my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="border rounded-lg animate-pulse">
                <div className="w-full h-32 bg-gray-100"></div>
                <div className="p-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading data</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 bg-white">

      {/* Feature Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
        {[
          { icon: 'fa-truck', text: 'Free Ship' },
          { icon: 'fa-headset', text: '24/7 Support' },
          { icon: 'fa-rotate-left', text: 'Free Return' },
          { icon: 'fa-shield', text: 'Secure Payment' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-full transition-colors duration-300"
          >
            <i className={`fa-solid ${item.icon} text-4xl text-yellow-400 mb-2`}></i>
            <p className="font-medium text-base text-gray-800">{item.text}</p>
          </div>
        ))}
      </div>

      {/* New Arrivals Section */}
      <section className="my-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">New Arrivals</h2>
          <Link to="/products-client" className="text-sm text-cyan-500 hover:underline">
            View All
          </Link>
        </div>
        {products?.length === 0 ? (
          <Empty description="No new products" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products?.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product-client/${product.id}`}>
                <div className="group border rounded-lg p-2 bg-white hover:shadow-md transition-shadow duration-300">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={product.thumbnail || '/placeholder.jpg'}
                      alt={product.title}
                      className="w-full h-36 object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mt-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-semibold text-cyan-500">${product.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Category Filter Section */}
      <section className="my-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <div className="flex gap-3 flex-wrap">
            {categories?.slice(0, 4).map((category) => (
              <button
                key={category.id}
                className={`text-sm font-medium uppercase hover:text-cyan-500 transition ${
                  selectedCategory === category.id ? 'text-yellow-400' : 'text-gray-800'
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : Number(category.id)
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </div>
          <Link to="/products-client" className="text-sm text-cyan-500 hover:underline">
            View All
          </Link>
        </div>
        {filteredProducts?.length === 0 ? (
          <Empty description="No products in this category" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts?.slice(0, 8).map((product) => (
              <Link key={product.id} to={`/product-client/${product.id}`}>
                <div className="group border rounded-lg p-2 bg-white hover:shadow-md transition-shadow duration-300">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={product.thumbnail || '/placeholder.jpg'}
                      alt={product.title}
                      className="w-full h-36 object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mt-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-semibold text-cyan-500">${product.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Countdown Timer */}
      <div className="my-8 bg-white shadow-sm rounded-lg p-4 flex justify-center">
        <CountdownTimer />
      </div>

      {/* News Section */}
      <section className="my-8">
        <div className="mb-4 border-l-4 border-gray-800 pl-3">
          <h3 className="text-2xl font-semibold text-gray-800">Latest News</h3>
        </div>
        {news?.length === 0 ? (
          <Empty description="Không có tin tức mới" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {news?.slice(0, 4).map((newsItem) => (
              <div
                key={newsItem.id}
                className="group bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={newsItem.image || '/placeholder.jpg'}
                    alt={newsItem.title}
                    className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-medium text-sm text-gray-800 group-hover:text-cyan-500 transition-colors mb-1">
                    {newsItem.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{newsItem.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
