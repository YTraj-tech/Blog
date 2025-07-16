// "use client";
// import React from "react";
// import { FileText, MessageCircle, Heart } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PlusCircle } from "lucide-react";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import RecentArticle from "./Recent_articel";

// // No props needed now
// const Dashboard = () => {
//   // Manually set your data here
//   const articleLength = 1234;
//   const totalComments = 56;
//   const totalLikes = 789;

//   return (
//     <>
//    <main className="flex-1 p-4 md:p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
//           <p className="text-muted-foreground">
//             Manage your content and analytics
//           </p>
//         </div>
//         <Link href={"/dashboard/articel/create"}>
//           <Button className="gap-2">
//             New Article
//           </Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-3 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Articles
//             </CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{articleLength}</div> 
//             <p className="text-xs text-muted-foreground mt-1">
//               +5 from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Comments
//             </CardTitle>
//             <MessageCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalComments}</div>
//             <p className="text-xs text-muted-foreground mt-1">
//               12 awaiting moderation
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Avg. Reading Time
//             </CardTitle>
//             <Card className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">4.2m</div>
//             <p className="text-xs text-muted-foreground mt-1">
//               +0.8m from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Articles */}
//       <RecentArticle  />
//     </main>
//     </>
//   );
// };

// export default Dashboard;\




// "use client";

// import React, { useEffect, useState } from "react";
// import { FileText, MessageCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import RecentArticle from "./Recent_articel";

// const Dashboard = () => {
//   const [articleLength, setArticleLength] = useState<number>(0);
//   const [totalComments, setTotalComments] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await fetch("/api/dashboard");
//         const data = await response.json();

//         setArticleLength(data.articleCount);
//         setTotalComments(data.commentCount);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   return (
//     <main className="flex-1 p-4 md:p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
//           <p className="text-muted-foreground">Manage your content and analytics</p>
//         </div>
//         <Link href={"/dashboard/articel/create"}>
//           <Button className="gap-2">New Article</Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-3 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : articleLength}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">+5 from last month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
//             <MessageCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : totalComments}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">12 awaiting moderation</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Avg. Reading Time</CardTitle>
//             <div className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">4.2m</div>
//             <p className="text-xs text-muted-foreground mt-1">+0.8m from last month</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Articles */}
//       <RecentArticle />
//     </main>
//   );
// };

// export default Dashboard;




// "use client";

// import React, { useEffect, useState } from "react";
// import { FileText, MessageCircle } from "lucide-react";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import RecentArticle from "./Recent_articel";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const Dashboard = () => {
//   const [articleLength, setArticleLength] = useState<number>(0);
//   const [totalComments, setTotalComments] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await fetch("/api/dashboard");
//         const data = await response.json();

//         setArticleLength(data.articleCount);
//         setTotalComments(data.commentCount);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   return (
//     <main className="flex-1 p-4 sm:p-6 md:p-8 relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
//       {/* Background Grid Pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

//       {/* Animated floating orbs - Reduced size and blur on smaller screens */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
//         <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       {/* Animated particles - Disabled on mobile to improve performance */}
//       <div className="absolute inset-0 overflow-hidden hidden sm:block">
//         <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//         <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
//         <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
//         <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
//           <div>
//             <h1
//               className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               Blog Dashboard
//             </h1>
//             <p
//               className="text-white/80 text-sm sm:text-base font-medium mt-1"
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               Manage your content and analytics
//             </p>
//           </div>
//           <Link href={"/dashboard/articel/create"}>
//             <Button
//               className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               New Article
//             </Button>
//           </Link>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
//           <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle
//                 className="text-xs sm:text-sm font-medium text-white/90"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 Total Articles
//               </CardTitle>
//               <FileText className="h-4 w-4 text-white/70" />
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="text-xl sm:text-2xl font-bold text-white"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 {isLoading ? "..." : articleLength}
//               </div>
//               <p
//                 className="text-xs text-white/70 mt-1 font-medium"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 +5 from last month
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle
//                 className="text-xs sm:text-sm font-medium text-white/90"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 Total Comments
//               </CardTitle>
//               <MessageCircle className="h-4 w-4 text-white/70" />
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="text-xl sm:text-2xl font-bold text-white"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 {isLoading ? "..." : totalComments}
//               </div>
//               <p
//                 className="text-xs text-white/70 mt-1 font-medium"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 12 awaiting moderation
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle
//                 className="text-xs sm:text-sm font-medium text-white/90"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 Avg. Reading Time
//               </CardTitle>
//               <div className="h-4 w-4 text-white/70" />
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="text-xl sm:text-2xl font-bold text-white"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 4.2m
//               </div>
//               <p
//                 className="text-xs text-white/70 mt-1 font-medium"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 +0.8m from last month
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Articles */}
//         <RecentArticle />
//       </div>
//     </main>
//   );
// };

// export default Dashboard;








"use client";

import React, { useEffect, useState } from "react";
import { FileText, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import RecentArticle from "./Recent_articel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [articleLength, setArticleLength] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        setArticleLength(data.articleCount);
        setTotalComments(data.commentCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

      {/* Animated floating orbs - Reduced size and blur on smaller screens */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Animated particles - Disabled on mobile to improve performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              Blog Dashboard
            </h1>
            <p
              className="text-white/80 text-sm sm:text-base font-medium mt-1"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              Manage your content and analytics
            </p>
          </div>
          <Link href={"/dashboard/articel/create"}>
            <Button
              className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              New Article
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className="text-xs sm:text-sm font-medium text-white/90"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Total Articles
              </CardTitle>
              <FileText className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                {isLoading ? "..." : articleLength}
              </div>
              <p
                className="text-xs text-white/70 mt-1 font-medium"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                +5 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className="text-xs sm:text-sm font-medium text-white/90"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Total Comments
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                {isLoading ? "..." : totalComments}
              </div>
              <p
                className="text-xs text-white/70 mt-1 font-medium"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                12 awaiting moderation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className="text-xs sm:text-sm font-medium text-white/90"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Avg. Reading Time
              </CardTitle>
              <div className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                4.2m
              </div>
              <p
                className="text-xs text-white/70 mt-1 font-medium"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                +0.8m from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Articles */}
        <RecentArticle />
      </div>
    </main>
  );
};

export default Dashboard;