// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import Bloglike from "./Blog_replay/Blog_like";
// import Blogcomment from "./Blog_replay/Blog_comment";
// import  he from "he"
// interface Author {
//   name: string;
//   email: string;
//   imageUrl?: string;
// }

// interface Comment {
//   id: string;
//   text: string;
//   createdAt: string;
// }

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   featuredImage?: string;
//   createdAt: string;
//   author: Author;
//   comments: Comment[];
// }

// const Allarticel = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const res = await fetch(`/api/articels/${id}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setError(data.error || "Failed to load article.");
//           return;
//         }

//         setArticle(data);
//       } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : 'Failed to fetch articles';
//         console.error('Failed to fetch articles:', message);
//         setError(message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchArticle();
//   }, [id]);

//   // Enhanced loading spinner
//   if (loading) {
//     return (
//       <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
//         {/* Animated background grid */}
//         <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        
//         {/* Floating orbs */}
//         <div className="absolute inset-0 w-full h-full overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
//         </div>
        
//         <div className="relative z-10 flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-4 border-white/20 border-t-purple-400 shadow-2xl"></div>
//           <p className="mt-4 sm:mt-6 md:mt-8 text-white/90 font-medium tracking-wider text-sm sm:text-base md:text-lg px-4 text-center max-w-xs sm:max-w-sm">Discovering amazing content...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center relative overflow-hidden p-4">
//         {/* Background grid */}
//         <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
//         <div className="text-center p-6 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-sm sm:max-w-md w-full relative z-10">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
//             <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Oops! Something went wrong</h3>
//           <p className="text-red-200 text-sm sm:text-base md:text-lg break-words">{error}</p>
//           <Link href="/" className="inline-block mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 text-sm sm:text-base">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
//         {/* Background grid */}
//         <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
//         <div className="text-center p-6 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-sm sm:max-w-md w-full relative z-10">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
//             <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Article Not Found</h3>
//           <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4">The story you're looking for has wandered off...</p>
//           <Link href="/" className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 text-sm sm:text-base">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Enhanced Background Grid Pattern */}
//       <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      
//       {/* Animated floating orbs */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       {/* Subtle animated particles */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//         <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
//         <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
//         <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="relative z-20 pt-4 md:pt-6 pb-2 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Link 
//             href="/" 
//             className="inline-flex items-center gap-2 md:gap-3 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 text-sm sm:text-base"
//           >
//             <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span className="whitespace-nowrap">Back to Home</span>
//           </Link>
//         </div>
//       </nav>

//       {/* Blog Article Layout - Made Wider */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
//         {/* Category Badge */}
//         <div className="mb-4 md:mb-6 flex justify-center md:justify-start">
//           <span className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold bg-white/20 backdrop-blur-sm text-white shadow-xl border border-white/30 max-w-full">
//             <span className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full mr-2 md:mr-3 animate-pulse flex-shrink-0"></span>
//             <span className="truncate">{article.category}</span>
//           </span>
//         </div>

//         {/* Article Title */}
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 md:mb-6 text-center md:text-left drop-shadow-2xl break-words">
//           {he.encode(article.title)} {/* Encode title to escape special characters */}
//         </h1>

//         {/* Article Meta Information */}
//         <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 mb-6 md:mb-8 w-full">
//           <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
//             <div className="relative">
//               <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-xl">
//                 {article.author.name.charAt(0).toUpperCase()}
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
//             </div>
//             <div className="text-white min-w-0">
//               <p className="font-bold text-base sm:text-lg md:text-xl truncate">{article.author.name}</p>
//               <p className="text-white/70 text-sm md:text-base">Author</p>
//             </div>
//           </div>
          
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-white/80 max-w-full">
//             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
//               <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <time className="text-xs md:text-sm font-medium whitespace-nowrap">
//                 {new Date(article.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </time>
//             </div>
            
//             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
//               <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-xs md:text-sm font-medium whitespace-nowrap">
//                 {Math.ceil(article.content.split(' ').length / 200)} min read
//               </span>
//             </div>
            
//             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
//               <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//               </svg>
//               <span className="text-xs md:text-sm font-medium whitespace-nowrap">
//                 {article.comments.length} {article.comments.length === 1 ? 'comment' : 'comments'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Article Content with Horizontal Layout */}
//         <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-6 md:mb-8">
//           <div className="flex flex-col lg:flex-row">
            
//             {/* Featured Image Section */}
//             {article.featuredImage && (
//               <div className="relative w-full lg:w-2/5 h-64 sm:h-80 lg:h-96 overflow-hidden">
//                 <Image
//                   src={article.featuredImage}
//                   alt={he.encode(article.title)} // Encode alt text
//                   fill
//                   className="object-cover transition-transform duration-700 hover:scale-105"
//                   sizes="(max-width: 1024px) 100vw, 40vw"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-black/30"></div>
                
//                 {/* Floating decorative elements */}
//                 <div className="absolute top-6 right-6 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse"></div>
//                 <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse delay-500"></div>
//                 <div className="absolute top-1/2 left-6 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
//               </div>
//             )}

//             {/* Content Section */}
//             <div className={`flex-1 ${article.featuredImage ? 'lg:w-3/5' : 'w-full'} relative`}>
//               {/* Background pattern for content area */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-50"></div>
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
              
//               <div className="relative z-10 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 h-full">
                
//                 {/* Content Header */}
//                 <div className="mb-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
//                     <span className="text-purple-200 font-bold text-sm uppercase tracking-widest">Featured Article</span>
//                   </div>
                  
//                   <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight mb-3">
//                     Dive Into The Story
//                   </h2>
                  
//                   <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mb-4"></div>
//                 </div>

//                 {/* Article Text Content - Smaller spacing */}
//                 <div className="flex-1">
//                   <div className="prose prose-sm sm:prose-base max-w-none">
//                     <div className="text-white/90 leading-relaxed text-sm sm:text-base font-light tracking-wide">
//                       {article.content.split('\n').map((paragraph, index) => (
//                         paragraph.trim() && (
//                           <p
//                             key={index}
//                             className={`mb-2 sm:mb-3 first:mt-0 last:mb-0 break-words transition-all duration-300 hover:text-white/100 ${
//                               index === 0 
//                                 ? 'first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-black first-letter:bg-gradient-to-r first-letter:from-purple-400 first-letter:to-blue-400 first-letter:bg-clip-text first-letter:text-transparent first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:drop-shadow-lg' 
//                                 : ''
//                             }`}
//                           >
//                             {he.encode(paragraph)} {/* Encode paragraph to escape special characters */}
//                           </p>
//                         )
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content Footer */}
//                 <div className="mt-6 pt-4 border-t border-white/20">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                       <span className="text-white/60 text-sm font-medium">Reading Experience</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-white/60 text-sm">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       <span className="font-medium">Enhanced View</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </div>

//         {/* Enhanced Interactive Components */}
//         <div className="space-y-4 md:space-y-6 w-full">
//           <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 hover:shadow-purple-500/20 transition-all duration-300 hover:bg-white/15 overflow-hidden">
//             <Bloglike articleId={article.id} />
//           </div>
          
//           <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 hover:shadow-purple-500/20 transition-all duration-300 hover:bg-white/15 overflow-hidden">
//             <Blogcomment articleId={article.id} />
//           </div>
//         </div>

//         {/* Author Bio Section */}
//         <div className="mt-8 md:mt-12 w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 overflow-hidden">
//           <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
//             <div className="relative flex-shrink-0">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl shadow-xl">
//                 {article.author.name.charAt(0).toUpperCase()}
//               </div>
//               <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-400 rounded-full border-2 sm:border-3 border-white shadow-lg"></div>
//             </div>
//             <div className="text-center md:text-left min-w-0 flex-1">
//               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 break-words">Written by {article.author.name}</h3>
//               <p className="text-white/70 text-sm sm:text-base md:text-lg mb-2 break-words">{article.author.email}</p>
//               <p className="text-white/60 text-xs sm:text-sm md:text-base break-words">Passionate writer sharing insights and stories that inspire and inform readers worldwide.</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Allarticel;




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Bloglike from "./Blog_replay/Blog_like";
import Blogcomment from "./Blog_replay/Blog_comment";
import he from "he";

interface Author {
  name: string;
  email: string;
  imageUrl?: string;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
  createdAt: string;
  author: Author;
  comments: Comment[];
}

const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`); // Fixed typo from 'articels' to 'articles'
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load article.");
          return;
        }

        setArticle(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch articles';
        console.error('Failed to fetch articles:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // Enhanced loading spinner
  if (loading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-4 border-white/20 border-t-purple-400 shadow-2xl"></div>
          <p className="mt-4 sm:mt-6 md:mt-8 text-white/90 font-medium tracking-wider text-sm sm:text-base md:text-lg px-4 text-center max-w-xs sm:max-w-sm">Discovering amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center relative overflow-hidden p-4">
        {/* Background grid */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="text-center p-6 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-sm sm:max-w-md w-full relative z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Oops! Something went wrong</h3>
          <p className="text-red-200 text-sm sm:text-base md:text-lg break-words">{error}</p>
          <Link href="/" className="inline-block mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 text-sm sm:text-base">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
        {/* Background grid */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="text-center p-6 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-sm sm:max-w-md w-full relative z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Article Not Found</h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4">The story you are looking for has wandered off</p>
          <Link href="/" className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 text-sm sm:text-base">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Grid Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      
      {/* Animated floating orbs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 pt-4 md:pt-6 pb-2 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 md:gap-3 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="whitespace-nowrap">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Blog Article Layout - Made Wider */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Category Badge */}
        <div className="mb-4 md:mb-6 flex justify-center md:justify-start">
          <span className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold bg-white/20 backdrop-blur-sm text-white shadow-xl border border-white/30 max-w-full">
            <span className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full mr-2 md:mr-3 animate-pulse flex-shrink-0"></span>
            <span className="truncate">{he.encode(article.category)}</span> {/* Encode category */}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 md:mb-6 text-center md:text-left drop-shadow-2xl break-words">
          {he.encode(article.title)} {/* Encode title to escape special characters */}
        </h1>

        {/* Article Meta Information */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 mb-6 md:mb-8 w-full">
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-xl">
                {he.encode(article.author.name).charAt(0).toUpperCase()} {/* Encode author name */}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <div className="text-white min-w-0">
              <p className="font-bold text-base sm:text-lg md:text-xl truncate">{he.encode(article.author.name)}</p> {/* Encode author name */}
              <p className="text-white/70 text-sm md:text-base">Author</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-white/80 max-w-full">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time className="text-xs md:text-sm font-medium whitespace-nowrap">
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {Math.ceil(article.content.split(' ').length / 200)} min read
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex-shrink-0">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {article.comments.length} {article.comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content with Horizontal Layout */}
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row">
            
            {/* Featured Image Section */}
            {article.featuredImage && (
              <div className="relative w-full lg:w-2/5 h-64 sm:h-80 lg:h-96 overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={he.encode(article.title)} // Encode alt text
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  onError={() => console.error("Failed to load featured image")} // Added error handling
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-black/30"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-6 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
              </div>
            )}

            {/* Content Section */}
            <div className={`flex-1 ${article.featuredImage ? 'lg:w-3/5' : 'w-full'} relative`}>
              {/* Background pattern for content area */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
              
              <div className="relative z-10 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 h-full">
                
                {/* Content Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                    <span className="text-purple-200 font-bold text-sm uppercase tracking-widest">Featured Article</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight mb-3">
                    Dive Into The Story
                  </h2>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mb-4"></div>
                </div>

                {/* Article Text Content - Smaller spacing */}
                <div className="flex-1">
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <div className="text-white/90 leading-relaxed text-sm sm:text-base font-light tracking-wide">
                      {article.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p
                            key={index}
                            className={`mb-2 sm:mb-3 first:mt-0 last:mb-0 break-words transition-all duration-300 hover:text-white/100 ${
                              index === 0 
                                ? 'first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-black first-letter:bg-gradient-to-r first-letter:from-purple-400 first-letter:to-blue-400 first-letter:bg-clip-text first-letter:text-transparent first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:drop-shadow-lg' 
                                : ''
                            }`}
                          >
                            {he.encode(paragraph)} {/* Encode paragraph to escape special characters */}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Footer */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="text-white/60 text-sm font-medium">Reading Experience</div>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="font-medium">Enhanced View</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Enhanced Interactive Components */}
        <div className="space-y-4 md:space-y-6 w-full">
          <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 hover:shadow-purple-500/20 transition-all duration-300 hover:bg-white/15 overflow-hidden">
            <Bloglike articleId={article.id} />
          </div>
          
          <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 hover:shadow-purple-500/20 transition-all duration-300 hover:bg-white/15 overflow-hidden">
            <Blogcomment articleId={article.id} />
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="mt-8 md:mt-12 w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/20 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl shadow-xl">
                {he.encode(article.author.name).charAt(0).toUpperCase()} {/* Encode author name */}
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-400 rounded-full border-2 sm:border-3 border-white shadow-lg"></div>
            </div>
            <div className="text-center md:text-left min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 break-words">Written by {he.encode(article.author.name)}</h3> {/* Encode author name */}
              <p className="text-white/70 text-sm sm:text-base md:text-lg mb-2 break-words">{he.encode(article.author.email)}</p> {/* Encode author email */}
              <p className="text-white/60 text-xs sm:text-sm md:text-base break-words">Passionate writer sharing insights and stories that inspire and inform readers worldwide.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleArticle;