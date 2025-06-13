
"use client"
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [isLoggedIn, setLoginStatus] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoginStatus(true)
            fetch("/api/transaction-history").then((response) => response.json()).then(setData).catch((error) => toast.error(error || "An unexpected error occurred"));
        } else {
            setLoginStatus(false)
            router.push("/login");
        }
    }, []);


    return (
        <div>
            <Navbar />
            <main className="py-4 flex justify-center">
            { isLoggedIn ? 
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className='px-6 py-3'>Date</th>
                                <th scope="col" className='px-6 py-3'>Reference ID</th>
                                <th scope="col" className='px-6 py-3'>To</th>
                                <th scope="col" className='px-6 py-3'>Transaction Type</th>
                                <th scope="col" className='px-6 py-3'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr className='bg-white border-b border-gray-200 hover:bg-gray-50'>
                                    <td colSpan="4" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Loading data...
                                    </td>
                                </tr>
                            ) : (
                                data.map((txn) => (
                                <tr key={txn.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="text-md font-medium px-6 py-4">{txn.date}</td>
                                    <td className="text-md font-medium px-6 py-4">{txn.reference_id}</td>
                                    <td className="text-md font-medium px-6 py-4">{txn.to_ref}</td>
                                    <td className="text-md font-medium px-6 py-4">{txn.transaction_type}</td>
                                    <td className="text-md font-medium px-6 py-4">{txn.amount}</td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table> 

                </div>
            :
                <a href='login' className="text-2xl font-semibold">Please Sign in!</a> 
            }
            </main>
            
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    )
}