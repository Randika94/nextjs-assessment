
"use client";
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        <p>NextJs Assessment</p>
      </main>
    </div>
  )
}