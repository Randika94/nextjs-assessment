
"use client"
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MFA() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : '';

    const handleVerify = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/verifyMfa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, code })
        });
    
        const response = await res.json();
        if (res.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            toast.success(response.message);
            router.push('/dashboard');
        } else {
            toast.error(response.error);
        }
    };

    return (
        <div className="bg-gray-100">
            <div className='flex items-center justify-center h-screen'>
                
                <form className='lg:w-1/4 w-full mx-auto px-4 border rounded-lg border-gray-200 py-10 bg-white' onSubmit={handleVerify} autoComplete="off">
                    <h2 className="text-xl font-bold mb-4 text-center">Authorization</h2>
                    <div className='mb-5'>
                        <label htmlFor='otp' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>One Time Password</label>
                        <input type='text' id='otp' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' 
                            placeholder='OTP' maxLength={6} value={code}  onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    <button type='submit' className='bg-black rounded-lg w-full px-5 py-2.5 mb-2 text-white font-medium text-sm text-center cursor-pointer'>Verify</button>
                </form>
                
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    )
}