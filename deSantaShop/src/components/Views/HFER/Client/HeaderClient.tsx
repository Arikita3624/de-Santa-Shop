import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BannerHeader from '../../../../components/Views/Client/ImgClient/358091233_cccadcdf-c2b7-403a-9fbe-34c62edc24ea.jpg';
import useAuth from '../../Client/Pages/Auth/UseAuth';

interface IHeaderClientProps {
    search: (value: string) => void;
}

const HeaderClient: React.FC<IHeaderClientProps> = ({ search }) => {
    const { user, loading } = useAuth();
    const [searchValue, setSearchValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(loading ? false : !!user);

    useEffect(() => {
        setIsLoggedIn(loading ? false : !!user);
    }, [user, loading]);

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("expiresAt");
        messageApi.success("Logout successful!");
        navigate("/signin");
        setIsLoggedIn(false);
    };

    const isAdmin = isLoggedIn && user?.role === "admin";

    return (
        <div>
            {/* Top Bar */}
            {contextHolder}
            <div className='flex justify-between items-center py-2 px-6 border-gray-200 text-gray-700 text-sm border-b'>
                <span>Support 24/7: (+84) 6 888 888</span>
                <div className='flex items-center gap-2'>
                    {!isLoggedIn ? (
                        <span>
                            <a href="/signin" className='hover:underline'>Sign In</a>
                            <span className='mx-1'>|</span>
                            <a href="/signup" className='hover:underline'>Sign Up</a>
                        </span>
                    ) : (
                        <>
                            <button
                                onClick={handleLogout}
                                className='hover:underline text-red-500'
                            >
                                Logout
                            </button>
                            {isAdmin && (
                                <>
                                    <span className='mx-1'>|</span>
                                    <a href="/admin" className='hover:underline'>
                                        Go to Admin
                                    </a>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Header */}
            <nav id='menu' className='bg-black text-white py-4 shadow-md'>
                <div className='container mx-auto flex justify-between items-center px-6'>
                    <div className='flex items-center gap-8'>
                        <a href="/" className='text-3xl font-bold tracking-wide'>
                            DE SANTA
                        </a>
                        <ul className='flex space-x-6 text-base font-medium'>
                            <li><a href="/" className='hover:text-yellow-500 transition duration-300'>Home</a></li>
                            <li><a href="/about-us" className='hover:text-yellow-500 transition duration-300'>About Us</a></li>
                            <li><a href="/products-client" className='hover:text-yellow-500 transition duration-300'>Products</a></li>
                            <li><a href="/contact" className='hover:text-yellow-500 transition duration-300'>Contact</a></li>
                        </ul>
                    </div>
                    <div className='flex items-center gap-4'>
                        <form onSubmit={handleSearch} className='relative w-48'>
                            <input
                                type="text"
                                placeholder='Search'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='w-full pl-4 pr-10 py-1.5 rounded-full text-gray-700 focus:outline-none border border-gray-200'
                            />
                            <i className='fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500'></i>
                        </form>
                        <a href="/cart" className='text-white hover:text-yellow-500 transition duration-300'>
                            <i className='fas fa-shopping-bag text-xl'></i>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Banner */}
            {location.pathname === "/" && (
                <div className='mb-4 flex justify-center'>
                    <img
                        src={BannerHeader}
                        alt="banner"
                        className='w-full max-h-[500px] object-cover'
                    />
                </div>
            )}
        </div>
    );
};

export default HeaderClient;