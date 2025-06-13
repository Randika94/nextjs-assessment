
"use client"
import { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [step, setStep] = useState('username');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureWord, setSecureWord] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [issuedAt, setIssuedAt] = useState(null);
    const router = useRouter();  
    const timerRef = useRef(null);

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/getSecureWord', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });

        const response = await res.json();
        if (res.ok) {
          setSecureWord(response.secureWord);
          localStorage.setItem('username', username);
          setStep('password');
          setTimeout(() => setSecureWord('EXPIRED'), 60000);
          setIssuedAt(Date.now());
        } else {
            toast.error(response.error);
        }
    };

    useEffect(() => {
        if (!secureWord || !issuedAt) return;
    
        timerRef.current = setInterval(() => {
          const secondsPassed = Math.floor((Date.now() - issuedAt) / 1000);
          const remaining = 60 - secondsPassed;
          if (remaining <= 0) {
            setTimeLeft(0);
            setSecureWord('');
            clearInterval(timerRef.current);
          } else {
            setTimeLeft(remaining);
          }
        }, 1000);
    
        return () => clearInterval(timerRef.current);
      }, [secureWord, issuedAt]);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        const hashedPassword = CryptoJS.SHA256(password).toString();
    
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, hashedPassword: hashedPassword, secureWord: secureWord })
        });
        const response = await res.json();
        if (res.ok) {
            localStorage.setItem('token', response.token);
            toast.success(response.message);
            router.push('/mfa');
        } else {
            toast.error(response.error || "An unexpected error occurred");
        }
    };

    return (
        <div className="bg-gray-100">
            <div className='flex items-center justify-center h-screen'>
                {step === 'username' && (
                    <form className='lg:w-1/4 w-full mx-auto px-4 border rounded-lg border-gray-200 py-10 bg-white' onSubmit={handleUsernameSubmit} autoComplete="off">
                        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
                        <div className='mb-5'>
                            <label htmlFor='userName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                            <input type='text' id='userName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' 
                                placeholder='Username' value={username}  onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <button type='submit' className='bg-black rounded-lg w-full px-5 py-2.5 mb-2 text-white font-medium text-sm text-center cursor-pointer'>Next</button>
                    </form>
                )}

                {step === 'password' && (
                    <form className='lg:w-1/4 w-full mx-auto px-4 border rounded-lg border-gray-200 py-10 bg-white' onSubmit={handlePasswordSubmit} autoComplete="off">
                        <h2 className="text-xl font-bold mb-4 text-center">Enter Password</h2>

                        <p className="break-words bg-green-100 p-3 rounded mb-2">
                            <strong>Secure Word:</strong> {secureWord}
                        </p>
                        <p className="text-sm text-red-600 mb-4">
                            Secure word will expire in {timeLeft} second{timeLeft !== 1 ? 's' : ''}
                        </p>
                        <div className='mb-5'>
                            <input type="password" placeholder="Password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <button type="submit" className="bg-black text-white w-full py-2 rounded cursor-pointer"> Login </button>
                    </form>
                )}
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    )
}