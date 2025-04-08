import { message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BannerHeader from  '../../../../components/Views/Client/ImgClient/358091233_cccadcdf-c2b7-403a-9fbe-34c62edc24ea.jpg'

interface IHeaderClientProps {
    search: (value: string) => void;
}

const HeaderClient: React.FC<IHeaderClientProps> = ({ search }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, [location]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const expiresAt = localStorage.getItem("expiresAt");

        if (token && expiresAt) {
            const now = new Date();
            const expiry = new Date(expiresAt);

            if (now > expiry) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                localStorage.removeItem("expiresAt");
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } else {
            const sessionToken = sessionStorage.getItem("accessToken");
            setIsLoggedIn(!!sessionToken);
        }
    }, []);

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

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");

        setIsLoggedIn(false);
        messageApi.success("Logout successfully!");
        navigate("/signin");
    };

    return (
        <div>
            {/* Top bar */}
            {contextHolder}
            <div className='flex justify-between items-center py-2 px-6 border-gray-200 text-gray-700 text-sm border-b'>
                <span>Support 24/7 : (+84) 6 888 888</span>
                <span>
                    {isLoggedIn ? (
                        <Popconfirm
                            title="Are you sure to logout?"
                            onConfirm={handleLogout}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button className='hover:underline text-red-500'>Logout</button>
                        </Popconfirm>
                    ) : (
                        <>
                            <a href="/signin" className='hover:underline'>Sign In</a>
                            <span className='mx-1'>|</span>
                            <a href="/signup" className='hover:underline'>Sign Up</a>
                        </>
                    )}
                </span>
            </div>

            {/* Header */}
            <header className='container mx-auto flex justify-between items-center py-4 px-6'>
                <h1 className='text-3xl font-bold tracking-wide text-gray-800'>DE SANTA</h1>
                <div className='relative'>
                    <a href="/cart" className='text-gray-800 hover:text-yellow-500 transition'>
                        <i className='fas fa-shopping-bag text-xl'></i> <span className='ml-1'>Cart</span>
                    </a>
                </div>
            </header>

            {/* Menu */}
            <nav id='menu' className='bg-black text-white py-4 shadow-md'>
                <div className='container mx-auto flex justify-between items-center px-6'>
                    <ul className='flex space-x-8 text-base font-medium'>
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
            </nav>

            {/* Banner */}
            {location.pathname === "/" && (
                <div className='mt-6 mb-4 flex justify-center'>
                    <img
                        src={BannerHeader}
                        alt="banner"
                        className='w-full max-h-[500px] object-cover rounded-lg shadow-lg'
                    />
                </div>

            )}
        </div>
    );
};

export default HeaderClient;
