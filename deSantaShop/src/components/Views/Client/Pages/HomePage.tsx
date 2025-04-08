import React, { useState } from 'react';
import CountdownTimer from '../Support/CountdownTimer';
import { useQuery } from '@tanstack/react-query';
import instance from '../../../../configs/axios';

interface Products {
    id: number | string;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    categoryID: number;
    quantity: number;
    count: number;
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

    const { data: Products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await instance.get('/products');
            return response.data;
        },
    });

    const { data: Categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await instance.get('/categories');
            return response.data;
        },
    });

    const { data: News } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await instance.get('/news');
            return response.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const filteredProducts = selectedCategory
        ? Products?.filter((product: Products) => product.categoryID === selectedCategory)
        : Products;

    return (
        <div className="max-w-screen-xl mx-auto px-4">

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-6 my-10 bg-white py-6 rounded-xl">
                {[
                    { icon: 'fa-truck', text: 'FREE SHIPPING' },
                    { icon: 'fa-headset', text: '24/7 SUPPORT' },
                    { icon: 'fa-rotate-left', text: '100% REFUND' },
                    { icon: 'fa-shield', text: 'SECURE PAYMENT' },
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <i className={`fa-solid ${item.icon} text-5xl text-yellow-500 mb-3`}></i>
                        <p className="font-semibold text-lg">{item.text}</p>
                    </div>
                ))}
            </div>


            {/* New Products Section */}
            <section className="mb-10">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold uppercase">New Arrivals</h2>
                    <a href="/products-client" className="text-sm text-blue-600 hover:underline">
                        View All
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Products?.slice(0, 4).map((product: Products) => (
                        <div key={product.id} className="border rounded-lg p-3 hover:shadow-md">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-40 object-contain mb-2"
                            />
                            <h3 className="text-sm font-semibold line-clamp-2 h-[3rem]">{product.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-red-500">${product.price}</span>
                                <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Category Filter Section */}
            <section className="mb-10">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <div className="flex gap-4">
                        {Categories?.slice(0, 4).map((category: Category) => (
                            <button
                                key={category.id}
                                className={`text-sm font-semibold uppercase hover:text-blue-600 transition ${selectedCategory === category.id ? 'text-yellow-400' : ''
                                    }`}
                                onClick={() =>
                                    setSelectedCategory(selectedCategory === category.id ? null : (category.id as number))
                                }
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <a href="/products-client" className="text-sm text-blue-600 hover:underline">
                        View All
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredProducts?.slice(0, 8).map((product: Products) => (
                        <div key={product.id} className="border rounded-lg p-3 hover:shadow-md">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-40 object-contain mb-2"
                            />
                            <h3 className="text-sm font-semibold line-clamp-2 h-[3rem]">{product.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-red-500">${product.price}</span>
                                <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Countdown Timer */}
            <div className="mb-10">
                <CountdownTimer />
            </div>

            {/* News Section */}
            <section className="mb-10">
                <div className="mb-4 border-l-4 border-black pl-4">
                    <h3 className="text-2xl font-semibold">Latest News</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {News?.slice(0, 4).map((news: News) => (
                        <div key={news.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <h4 className="font-semibold text-sm mb-1">{news.title}</h4>
                                <p className="text-xs text-gray-600 line-clamp-3">{news.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
