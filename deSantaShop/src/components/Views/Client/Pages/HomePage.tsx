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
        }
    });

    const { data: News } = useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const response = await instance.get("/news");
            return response.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const filteredProducts = selectedCategory
        ? Products?.filter((product: Products) => product.categoryID === selectedCategory)
        : Products;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white py-8 m-6">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 uppercase">PROMOTIONAL TODAY</h3>
                </div>

                <div className="flex justify-center mb-6">
                    <img src="https://hstatic.net/744/1000088744/1000124945/banner_lena3_1.jpg?v=176" alt="banner" className="w-[100%] max-w-[1600px] rounded-lg shadow-lg object-cover" />
                </div>

                <div className="flex justify-center space-x-10 text-gray-700 font-semibold text-lg">
                    <a href="#" className="flex flex-col items-center">
                        <i className="fa-solid fa-truck text-3xl text-blue-500 mb-2"></i>
                        <span>FREE SHIP</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <i className="fa-solid fa-headset text-3xl text-green-500 mb-2"></i>
                        <span>SUPPORT 24/7</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <i className="fa-solid fa-rotate-left text-3xl text-red-500 mb-2"></i>
                        <span>REFUND 100%</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <i className="fa-solid fa-shield text-3xl text-yellow-500 mb-2"></i>
                        <span>SECURE PAYMENT</span>
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
                <div className="flex space-x-8">
                    <button className="font-bold text-black hover:text-gray-400 transition">
                        NEW PRODUCTS
                    </button>
                    <button className="font-bold text-black hover:text-gray-400 transition">
                        BEST SALE
                    </button>
                    <button className="font-bold text-black hover:text-gray-400 transition">
                        PROMOTIONAL
                    </button>
                </div>
                <button className="bg-black text-white px-6 py-2 uppercase font-bold hover:bg-gray-700 transition">
                    SEE MORE
                </button>
            </div>

            <div className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Products?.slice(0, 4).map((product: Products) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-[350px] w-full">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <span className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                    SALE
                                </span>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <p className="text-xl font-bold text-black">
                                        {product.price}
                                        <span className="text-sm">$</span>
                                    </p>
                                    <p className="text-gray-400 line-through text-sm">
                                        {product.price * 100}
                                        <span className="text-sm">$</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
                <div className="flex gap-6">
                    {Categories?.slice(0, 3).map((category: Category) => (
                        <span
                            key={category.id}
                            className={`cursor-pointer font-bold uppercase ${selectedCategory === category.id ? "text-yellow-300" : "text-black"
                                }`}
                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : (category.id as number))}
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
                <button className="bg-black text-white px-6 py-2 uppercase font-bold hover:bg-gray-700 transition">
                    SEE MORE
                </button>
            </div>

            <div className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.slice(0, 8).map((product: Products) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-[300px] w-full">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <span className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                    SALE
                                </span>
                            </div>
                            <div className="p-4 text-center space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-xl font-bold text-black-500">
                                        {product.price}
                                        <span className="text-sm">$</span>
                                    </p>
                                    <p className="text-gray-400 line-through text-sm">
                                        {product.price * 100}
                                        <span className="text-sm">$</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8 mt-4">
                <CountdownTimer />
            </div>

            <div className="w-full px-4 py-8 mb-10">
                <div className="mb-6 flex items-center">
                    <h4 className="text-3xl font-semibold p-5 border-l-4 border-black pl-4">
                        News
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {News?.slice(0, 4).map((news: News) => (
                        <div key={news.id} className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={news.image} alt="error" className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <h5 className="font-bold text-lg">{news.title}</h5>
                                <p className="text-gray-600 mt-2">{news.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
