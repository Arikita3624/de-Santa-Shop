import React, { useEffect, useState } from 'react';

interface IHeaderClientProps {
    search: (value: string) => void;
}

const HeaderClient: React.FC<IHeaderClientProps> = ({ search }) => {
    const [searchValue, setSearchValue] = useState('');

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

    return (
        <div>
            {/* Support */}
            <div className='flex justify-between items-center py-2 px-6 border-gray-200 text-gray-700 text-sm'>
                <span>Support 24/7 : (+84) 6 888 888</span>
                <span>
                    <a href="#" className='hover:underline'>Sign In</a>
                    <span> - </span>
                    <a href="#" className='hover:underline'>Sign Up</a>
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

            {/* Main Menu */}
            <div id='menu' className='bg-black text-white py-4'>
                <div className='container mx-auto flex justify-between items-center px-6'>
                    <ul className='flex space-x-10 text-base font-medium'>
                        <li><a href="#" className='hover:text-yellow-500 transition duration-300'>Home</a></li>
                        <li><a href="about-us" className='hover:text-yellow-500 transition duration-300'>About</a></li>
                        <li><a href="products-client" className='hover:text-yellow-500 transition duration-300'>Products</a></li>
                        <li><a href="contact" className='hover:text-yellow-500 transition duration-300'>Contact</a></li>
                    </ul>
                    {/* Search bar */}
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

            <div className='banner mt-6 mb-6'>
                <img src="https://github.com/duyhungDev24/Vue/blob/main/Rim%20Chalesto/src/assets/Images/Banners/banner3.jpg?raw=true"
                    alt="banner"
                    className='w-full h-[600px] object-cover' />
            </div>
        </div>
    )
}

export default HeaderClient;

