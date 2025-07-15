'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Herosection from '@/components/hero_section';
import TopArticles from '@/components/top_articel';
import Footer from '@/components/Fotter';
import Faq from '@/components/Faq';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Herosection />
      <section>
        <TopArticles />
      </section>
      <Faq />
      <Footer />
    </div>
  );
}