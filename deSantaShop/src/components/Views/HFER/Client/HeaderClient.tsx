import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IHeaderClientProps {
    search: (value: string) => void;
}

const HeaderClient: React.FC<IHeaderClientProps> = ({ search }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, [location]);


    useEffect(() => {
        const handleScroll = () => {
            const menu = document.getElementById("menu");
            if (!menu) return;
            if (window.scrollY > 100) {
                menu.classList.add("fixed", "top-0", "left-0", "w-full", "z-50");
            } else {
                menu.classList.remove("fixed", "top-0", "left-0", "w-full", "z-50");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search(searchValue);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
        messageApi.open({
            type: "success",
            content: "Logout successfully",
        });
    };


    return (
        <div>
            {/* Top bar */}
            {contextHolder}
            <div className='flex justify-between items-center py-2 px-6 border-gray-200 text-gray-700 text-sm'>
                <span>Support 24/7 : (+84) 6 888 888</span>
                <span>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className='hover:underline text-red-500'>Logout</button>
                    ) : (
                        <>
                            <a href="/signin" className='hover:underline'>Sign In</a>
                            <span> - </span>
                            <a href="/signup" className='hover:underline'>Sign Up</a>
                        </>
                    )}
                </span>
            </div>

            {/* Header */}
            <header id='header' className='container mx-auto flex justify-between items-center py-4 px-6'>
                <div className='logo'>
                    <h3 className='text-2xl font-bold'>DE SANTA</h3>
                </div>
                <div className='link-cart relative'>
                    <a href="#" className='text-gray-800'>
                        <i className='fas fa-shopping-bag text-2xl'>Cart</i>
                    </a>
                </div>
            </header>

            {/* Menu */}
            <div id='menu' className='bg-black text-white py-4'>
                <div className='container mx-auto flex justify-between items-center px-6'>
                    <ul className='flex space-x-10 text-base font-medium'>
                        <li><a href="/" className='hover:text-yellow-500 transition duration-300'>Home</a></li>
                        <li><a href="/about-us" className='hover:text-yellow-500 transition duration-300'>About</a></li>
                        <li><a href="/products-client" className='hover:text-yellow-500 transition duration-300'>Products</a></li>
                        <li><a href="/contact" className='hover:text-yellow-500 transition duration-300'>Contact</a></li>
                    </ul>
                    <form onSubmit={handleSearch} className='relative w-64'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='w-full pl-4 pr-10 py-2 rounded-full text-gray-700 focus:outline-none'
                        />
                        <i className='fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500'></i>
                    </form>
                </div>
            </div>

            {/* Banner */}
            {location.pathname === "/" && (
                <div className='w-full mt-8 mb-3'>
                    <img
                        src="https://img.freepik.com/premium-photo/sale-ad-sale-with-laptop-headphones_913495-5603.jpg?w=1380"
                        alt="banner"
                        className='w-full h-auto object-cover'
                    />
                </div>
            )}
        </div>
    );
};

export default HeaderClient;
