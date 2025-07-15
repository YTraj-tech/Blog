// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import Image from "next/image";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// interface Author {
//   name: string;
//   email: string;
//   imageUrl?: string;
// }

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   featuredImage?: string;
//   createdAt: string;
//   author: Author;
// }

// interface PaginationInfo {
//   currentPage: number;
//   totalPages: number;
//   totalArticles: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   limit: number;
// }

// const Mainallaticel = () => {
//   const router = useRouter();
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState<PaginationInfo | null>(null);
//   const limit = 3; // Display 3 articles per page

//   const filteredArticles = searchValue.trim()
//     ? articles.filter((article) =>
//         article.title.toLowerCase().includes(searchValue.toLowerCase())
//       )
//     : articles;

//   const fetchArticles = async (page: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/articels/limit?page=${page}&limit=${limit}`);
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to load articles.");
//         return;
//       }

//       if (!Array.isArray(data.articles)) {
//         setError("Invalid data format from server.");
//         return;
//       }

//       setArticles(data.articles);
//       setPagination(data.pagination);
//       setError("");
//     } catch (err) {
//       setError("Something went wrong while fetching articles.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles(currentPage);
//   }, [currentPage]);

//   const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && filteredArticles.length === 1) {
//       router.push(`/articels/${filteredArticles[0].id}`);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setSearchValue(""); // Clear search when changing pages
//   };

//   const handlePrevious = () => {
//     if (pagination?.hasPreviousPage) {
//       handlePageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (pagination?.hasNextPage) {
//       handlePageChange(currentPage + 1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-muted-foreground">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-t-transparent mr-3"></div>
//         <span>Loading articles...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Search Input */}
//       <div className="w-full max-w-md mx-auto mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//           <Input
//             type="text"
//             placeholder="Search articles by title..."
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={handleSearchKeyDown}
//             className="pl-10 py-2"
//           />
//         </div>
//       </div>

//       {/* Pagination Info */}
//       {pagination && !searchValue && (
//         <div className="text-center text-sm text-muted-foreground mb-4">
//           Showing {articles.length} of {pagination.totalArticles} articles
//         </div>
//       )}

//       {/* No articles match */}
//       {filteredArticles.length === 0 ? (
//         <div className="text-center text-muted-foreground">
//           {searchValue ? "No matching articles found." : "No articles found."}
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredArticles.map((article) => (
//               <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200">
//                 {article.featuredImage && (
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={article.featuredImage}
//                       alt={article.title}
//                       fill
//                       className="rounded-t-lg object-cover"
//                     />
//                   </div>
//                 )}
//                 <CardHeader>
//                   <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
//                   <p className="text-xs text-muted-foreground capitalize">{article.category}</p>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-gray-700 line-clamp-3">{article.content}</p>
//                   <div className="mt-4 flex justify-between items-center">
//                     <div className="text-xs text-muted-foreground">
//                       By <span className="font-medium">{article.author.name}</span>
//                     </div>
//                     <Link href={`/articels/${article.id}`}>
//                       <Button size="sm" variant="outline">
//                         Read More
//                       </Button>
//                     </Link>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination Controls - Only show when not searching */}
//           {pagination && !searchValue && (
//             <div className="flex justify-center items-center mt-8 space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handlePrevious}
//                 disabled={!pagination.hasPreviousPage}
//                 className="flex items-center"
//               >
//                 <ChevronLeft className="h-4 w-4 mr-1" />
//                 Previous
//               </Button>

//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
//                   <Button
//                     key={page}
//                     variant={page === currentPage ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => handlePageChange(page)}
//                     className="min-w-[40px]"
//                   >
//                     {page}
//                   </Button>
//                 ))}
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleNext}
//                 disabled={!pagination.hasNextPage}
//                 className="flex items-center"
//               >
//                 Next
//                 <ChevronRight className="h-4 w-4 ml-1" />
//               </Button>
//             </div>
//           )}

//           {/* Page Info */}
//           {pagination && !searchValue && (
//             <div className="text-center text-xs text-muted-foreground mt-4">
//               Page {pagination.currentPage} of {pagination.totalPages}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Mainallaticel;






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, Calendar, MessageCircle, User, TrendingUp, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Author {
  name: string;
  email: string;
  imageUrl?: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
  createdAt: string;
  author: Author;
  comments?: { id: string }[];
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
}

const Mainallaticel = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const limit = 3;

  const filteredArticles = searchValue.trim()
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : articles;

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/articels/limit?page=${page}&limit=${limit}`); // Fixed typo
      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response received:', text.slice(0, 100));
        throw new Error('Server returned non-JSON response, likely a 404 or server error');
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to load articles');
      }

      const data = await res.json();
      if (!Array.isArray(data.articles)) {
        throw new Error('Invalid data format from server');
      }

      setArticles(data.articles);
      setPagination(data.pagination);
      setError('');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to load articles';
      console.error('Failed to fetch articles:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredArticles.length === 1) {
      router.push(`/articels/${filteredArticles[0].id}`); // Keep as /articels per request
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchValue('');
  };

  const handlePrevious = () => {
    if (pagination?.hasPreviousPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.hasNextPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: 'bg-gradient-to-r from-blue-500 to-blue-600',
      Programming: 'bg-gradient-to-r from-green-500 to-green-600',
      Design: 'bg-gradient-to-r from-purple-500 to-purple-600',
      default: 'bg-gradient-to-r from-gray-500 to-gray-600',
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 px-4 sm:px-20 py-6 pt-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse m-2 w-[450px] mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl h-96 border border-white/20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-xl text-white/90 text-center p-6"
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
        >
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
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
      <div className="relative z-10 p-6 pt-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex mb-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex border-white/30 text-black hover:border-white/50 transition-colors rounded-lg backdrop-blur-sm"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-2"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Explore Our
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-3">
              Blog
            </span>
          </h1>
          <p
            className="text-lg text-white/90 mt-2 font-medium"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Discover insightful articles, tips, and stories from our community
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
            <Input
              type="text"
              placeholder="Search articles by title..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="pl-10 py-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-400 bg-white/10 backdrop-blur-sm shadow-sm text-white placeholder-white/60"
            />
          </div>
        </motion.div>
        {pagination && !searchValue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm text-white/70 mb-6"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Showing {articles.length} of {pagination.totalArticles} blog posts
          </motion.div>
        )}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white/70 text-lg col-span-1 sm:col-span-2 lg:col-span-3"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            {searchValue ? 'No matching blog posts found.' : 'No blog posts found.'}
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 px-4 sm:px-20 py-6 place-items-center">
              <AnimatePresence>
                {filteredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-[450px]"
                  >
                    <Card
                      className="group cursor-pointer bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden border border-white/20 hover:scale-105"
                      onClick={() => router.push(`/articels/${article.id}`)} // Fixed to /articels
                    >
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      </div>
                      {article.featuredImage && (
                        <div className="relative w-full h-56 bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 overflow-hidden">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getCategoryColor(article.category)}`}></div>
                          <span
                            className="text-sm font-medium text-gray-600 capitalize"
                            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            {article.category}
                          </span>
                        </div>
                        <CardHeader className="p-0">
                          <CardTitle
                            className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-200"
                            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p
                            className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            {article.content}
                          </p>
                        </CardContent>
                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg">
                            {article.author.imageUrl ? (
                              <Image
                                src={article.author.imageUrl}
                                alt={article.author.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <User className={`w-4 h-4 text-white ${article.author.imageUrl ? 'hidden' : ''}`} />
                          </div>
                          <span
                            className="text-sm font-medium text-gray-700"
                            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            {article.author.name}
                          </span>
                        </div>
                      </div>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <div className="w-full space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                {new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                {article.comments?.length || 0} comments
                              </span>
                            </div>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/articels/${article.id}`); // Fixed to /articels
                            }}
                            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            Read More
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {pagination && !searchValue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center items-center mt-8 space-x-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={!pagination.hasPreviousPage}
                  className="flex items-center border-white/30 text-black hover:border-white/50 transition-colors rounded-lg backdrop-blur-sm"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] rounded-lg transition-all duration-200 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                          : 'border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm'
                      }`}
                      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center border-white/30 text-black hover:border-white/50 transition-colors rounded-lg backdrop-blur-sm"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            )}
            {pagination && !searchValue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center text-xs text-white/70 mt-4"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Page {pagination.currentPage} of {pagination.totalPages}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Mainallaticel;