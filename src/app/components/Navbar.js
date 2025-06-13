'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isLoggedIn, setLoginStatus] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        
        if (token) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }
    }, []);

    function handleSignOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.push("/login");
    }

    return (
        <nav className='bg-white border-1 border-gray-200 text-dark p-4 flex items-center justify-between relative'>
            <a href='/' className='text-xl font-bold'>AEON</a>
            <div className='md:hidden w-full float-right flex justify-end space-x-5'>
                <div className='search'>
                    <button className='md:hidden z-20' onClick={() => setIsClicked(!isClicked)}>
                        {isClicked ? '' : <FaSearch className='font-thin text-2xl text-gray-500 mt-1' />}
                    </button>
                    {isClicked && (
                        <div class='relative w-full max-w-sm mt-[-18px]'>
                            <input type='text' placeholder='Search...' className='bg-gray-400 rounded-lg py-2 px-2' />
                            <button 
                            class='absolute right-2 py-2 text-gray-700 hover:text-black'
                            onClick={() => setIsClicked(!isClicked)}
                            >
                            <FaTimes className='font-extralight text-2xl' />
                            </button>
                      </div>
                    )}
                </div>

                <button className='md:hidden z-20 justify-end' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div className='hidden w-full md:block ml-5'>
                <ul className='flex justify-start font-medium text-gray-500 space-x-5'>
                    <li>
                        <a href='#'>Showcase</a>
                    </li>
                    <li>
                        <a href='#'>Docs</a>
                    </li>
                    <li>
                        <a href='#'>Blog</a>
                    </li>
                    <li>
                        <a href='#'>Analytics</a>
                    </li>
                    <li>
                        <a href='#'>Template</a>
                    </li>
                    <li>
                        <a href='#'>Enterprice</a>
                    </li>
                </ul>
            </div>
            <div className='hidden md:block w-full'>
                <ul className='flex justify-end space-x-2'>
                    <li>
                        <input type='text' placeholder='Search...' className='bg-gray-400 rounded-lg py-2 px-2' />
                    </li>
                    {isLoggedIn ? 
                        <li><button  onClick={handleSignOut} className='text-black bg-white border focus:outline-none rounded-lg font-medium text-sm text-center py-2 px-5 cursor-pointer'>Sign out</button></li> : 
                        <li className='mt-2'><a href='/login' className='text-white bg-black focus:outline-none rounded-lg font-medium text-sm text-center py-3 px-5'>Sign in</a></li>
                    }
                </ul>
            </div>

            {isOpen && (
                <div className='absolute top-16 left-0 w-full bg-white text-dark px-4 py-3 md:hidden'>
                    <ul className='text-lg text-gray-500 font-normal space-y-3'>
                        <li>
                            <a href='#'>Showcase</a>
                        </li>
                        <li>
                            <a href='#'>Docs</a>
                        </li>
                        <li>
                            <a href='#'>Blog</a>
                        </li>
                        <li>
                            <a href='#'>Analytics</a>
                        </li>
                        <li>
                            <a href='#'>Template</a>
                        </li>
                        <li>
                            <a href='#'>Enterprice</a>
                        </li>
                        {isLoggedIn ? 
                            <li><a onClick={handleSignOut} className='text-white bg-black focus:outline-none rounded-lg font-medium text-sm text-center py-3 px-5'>Sign out</a></li> : 
                            <li className='mt-2'><a href='/login' className='text-white bg-black focus:outline-none rounded-lg font-medium text-sm text-center py-3 px-5'>Sign in</a></li>
                        }
                    </ul>
                </div>
            )}
        </nav>
    )
}