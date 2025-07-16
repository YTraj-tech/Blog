// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   featuredImage?: string;
//   createdAt: string;
//   author: {
//     name: string;
//     email: string;
//     imageUrl?: string;
//   };
//   comments: { id: string }[];
// }

// const TopArticles = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("/api/articels/top");
//         const data = await res.json();
//         setArticles(data.articles || []);
//       } catch (err) {
//         console.error("Failed to fetch articles:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {loading ? (
//         <p>Loading...</p>
//       ) : articles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         articles.map(article => (
//           <Link key={article.id} href={`/articels/${article.id}`}>
//             <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
//               {article.featuredImage && (
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={article.featuredImage}
//                     alt={article.title}
//                     fill
//                     className="object-cover rounded-t-2xl"
//                   />
//                 </div>
//               )}

//               <CardHeader>
//                 <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
//                   {article.title}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-gray-500 capitalize">
//                   {article.category}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <p className="text-gray-700 text-sm line-clamp-3">{article.content}</p>
//               </CardContent>

//               <CardFooter className="flex justify-between items-center text-xs text-gray-500">
//                 <span>{new Date(article.createdAt).toLocaleDateString()}</span>
//                 <span>{article.comments.length} comments</span>
//               </CardFooter>
//             </Card>
//           </Link>
//         ))
//       )}
//     </div>
//   );
// };

// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, Calendar, User, TrendingUp } from "lucide-react";

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   featuredImage?: string;
//   createdAt: string;
//   author: {
//     name: string;
//     email: string;
//     imageUrl?: string;
//   };
//   comments: { id: string }[];
// }

// const TopArticles = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("/api/articels/top");
//         const data = await res.json();
//         setArticles(data.articles?.slice(0, 4) || []); // Ensure max 4 articles
//       } catch (err) {
//         console.error("Failed to fetch articles:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       Technology: "bg-blue-500",
//       Programming: "bg-green-500",
//       Design: "bg-purple-500",
//       default: "bg-gray-500"
//     };
//     return colors[category as keyof typeof colors] || colors.default;
//   };

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6 px-4 sm:px-20 py-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div key={i} className="animate-pulse m-2">
//             <div className="bg-gray-200 rounded-xl h-96 max-w-[400px] mx-auto"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-x-2 gap-y-6 px-4 sm:px-20 py-6 bg-gray-50 min-h-screen">
//       {articles.length === 0 ? (
//         <div className="col-span-1 sm:col-span-2 text-center py-16">
//           <p className="text-gray-500 text-lg">No articles found.</p>
//         </div>
//       ) : (
//         articles.slice(0, 4).map((article) => (
//           <div
//             key={article.id}
//             className="group cursor-pointer opacity-0 animate-fadeIn max-w-[400px] mx-auto m-2"
//           >
//             <div 
//               className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//               onClick={() => window.location.href = `/articels/${article.id}`}
//             >
//               {/* Trending Badge */}
//               <div className="absolute top-4 left-4 z-10">
//                 <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                   <TrendingUp className="w-3 h-3" />
//                   Trending
//                 </span>
//               </div>

//               {/* Featured Image */}
//               {article.featuredImage && (
//                 <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
//                   <img
//                     src={article.featuredImage}
//                     alt={article.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                 </div>
//               )}

//               {/* Content */}
//               <div className="p-6 space-y-4">
//                 {/* Category */}
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2 h-2 rounded-full ${getCategoryColor(article.category)}`}></div>
//                   <span className="text-sm font-medium text-gray-600 capitalize">
//                     {article.category}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
//                   {article.title}
//                 </h3>

//                 {/* Content Preview */}
//                 <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
//                   {article.content}
//                 </p>

//                 {/* Author Info */}
//                 <div className="flex items-center gap-3 pt-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
//                     {article.author.imageUrl ? (
//                       <img
//                         src={article.author.imageUrl}
//                         alt={article.author.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <User className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">
//                     {article.author.name}
//                   </span>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="px-6 pb-6">
//                 <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(article.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <MessageCircle className="w-4 h-4" />
//                     <span>{article.comments.length} comments</span>
//                   </div>
//                 </div>

//                 {/* Read More Button */}
//                 <Button 
//                   className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors duration-200"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     window.location.href = `/articels/${article.id}`;
//                   }}
//                 >
//                   Read More
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TopArticles;



// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { MessageCircle, Calendar, User, TrendingUp } from 'lucide-react';
// import Image from 'next/image';

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   featuredImage?: string;
//   createdAt: string;
//   author: {
//     name: string;
//     email: string;
//     imageUrl?: string;
//   };
//   comments: { id: string }[];
// }

// const TopArticles = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const startTime = Date.now();
      
//         const res = await fetch('/api/articels/top', {
//           next: { revalidate: 3600 },
//         });

//         const contentType = res.headers.get('content-type');
//         if (!contentType?.includes('application/json')) {
//           const text = await res.text();
//           console.error('Non-JSON response received:', text.slice(0, 100));
//           throw new Error('Server returned non-JSON response, likely a 404 or server error');
//         }

//         if (!res.ok) {
//           throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log('API response:', data);
//         if (data.success) {
//           setArticles(data.articles || []);
//         } else {
//           console.error('Failed to fetch articles:', data.error, data.details || 'No details provided');
//           setError(data.error || 'Failed to fetch articles');
//         }

//         const elapsed = Date.now() - startTime;
//         if (elapsed < 1000) {
//           await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
//         }
//       } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : 'Failed to fetch articles';
//         console.error('Failed to fetch articles:', message);
//         setError(message);
//       } finally {
//         console.log('Setting loading to false');
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       Technology: 'bg-blue-500',
//       Programming: 'bg-green-500',
//       Design: 'bg-purple-500',
//       default: 'bg-gray-500',
//     };
//     return colors[category as keyof typeof colors] || colors.default;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-100 to-gray-100">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
//           <p className="text-lg font-semibold text-gray-700">Buffering...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-96 bg-gray-50">
//         <p className="text-red-500 text-lg">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-x-2 gap-y-6 px-4 sm:px-20 py-6 bg-gray-50 min-h-screen">
//       {articles.length === 0 ? (
//         <div className="col-span-1 sm:col-span-2 text-center py-16">
//           <p className="text-gray-500 text-lg">No articles found.</p>
//         </div>
//       ) : (
//         articles.slice(0, 4).map((article) => (
//           <div
//             key={article.id}
//             className="group cursor-pointer opacity-0 animate-fadeIn max-w-[400px] mx-auto m-2"
//           >
//             <div
//               className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//               onClick={() => window.location.href = `/articles/${article.id}`}
//             >
//               <div className="absolute top-4 left-4 z-10">
//                 <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                   <TrendingUp className="w-3 h-3" />
//                   Trending
//                 </span>
//               </div>
//               {article.featuredImage && (
//                 <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
//                   <Image
//                     src={article.featuredImage}
//                     alt={article.title}
//                     width={400}
//                     height={224}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                 </div>
//               )}
//               <div className="p-6 space-y-4">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2 h-2 rounded-full ${getCategoryColor(article.category)}`}></div>
//                   <span className="text-sm font-medium text-gray-600 capitalize">
//                     {article.category}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
//                   {article.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
//                   {article.content}
//                 </p>
//                 <div className="flex items-center gap-3 pt-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
//                     {article.author.imageUrl ? (
//                       <Image
//                         src={article.author.imageUrl}
//                         alt={article.author.name}
//                         width={32}
//                         height={32}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <User className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">
//                     {article.author.name}
//                   </span>
//                 </div>
//               </div>
//               <div className="px-6 pb-6">
//                 <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(article.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <MessageCircle className="w-4 h-4" />
//                     <span>{article.comments.length} comments</span>
//                   </div>
//                 </div>
//                 <Button
//                   className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors duration-200"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     window.location.href = `/articles/${article.id}`;
//                   }}
//                 >
//                   Read More
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TopArticles;

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, User, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
    imageUrl?: string;
  };
  comments: { id: string }[];
}

const TopArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const startTime = Date.now();
      
        const res = await fetch('/api/articels/top', {
          next: { revalidate: 3600 },
        });

        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          const text = await res.text();
          console.error('Non-JSON response received:', text.slice(0, 100));
          throw new Error('Server returned non-JSON response, likely a 404 or server error');
        }

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('API response:', data);
        if (data.success) {
          setArticles(data.articles || []);
        } else {
          console.error('Failed to fetch articles:', data.error, data.details || 'No details provided');
          setError(data.error || 'Failed to fetch articles');
        }

        const elapsed = Date.now() - startTime;
        if (elapsed < 1000) {
          await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch articles';
        console.error('Failed to fetch articles:', message);
        setError(message);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: 'bg-blue-600',
      Programming: 'bg-green-600',
      Design: 'bg-purple-600',
      default: 'bg-gray-600',
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
        </div>
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-16 h-16 border-4 border-t-4 border-purple-400 border-solid rounded-full animate-spin border-t-transparent shadow-2xl"></div>
          <p className="text-lg font-semibold text-white/90">Buffering...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-red-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="text-center p-6 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-md w-full relative z-10">
          <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8">
        {articles.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-white/70 text-lg font-medium">No articles found.</p>
          </div>
        ) : (
          articles.slice(0, 4).map((article, index) => (
            <div
              key={article.id}
              className="group cursor-pointer opacity-0 animate-fadeIn w-full max-w-[400px] mx-auto"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="relative bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-purple-500/50 h-[650px] flex flex-col transform hover:-translate-y-1 hover:scale-[1.02]"
                onClick={() => window.location.href = `/articels/${article.id}`}
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                </div>

                <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0">
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      width={400}
                      height={256}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 2}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(article.category)}`}></div>
                    <span className="text-sm font-semibold text-gray-700 capitalize">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-200 mb-4 h-14">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4 h-16 flex-shrink-0">
                    {article.content}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                      {article.author.imageUrl ? (
                        <Image
                          src={article.author.imageUrl}
                          alt={article.author.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-800 truncate">
                      {article.author.name}
                    </span>
                  </div>

                  <div className="flex-1"></div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{article.comments.length} comments</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/articels/${article.id}`;
                      }}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TopArticles;