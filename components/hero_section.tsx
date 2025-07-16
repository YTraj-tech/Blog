// 'use client'

// import { useState } from 'react'
// import { BookOpen, Users, TrendingUp, Star, Play, Sparkles, PenTool, Globe, Zap } from 'lucide-react'

// export default function Herosection() {
  
//   const featuredTopics = [
//     { name: 'Technology', icon: Zap, count: '2.5k articles' },
//     { name: 'Design', icon: PenTool, count: '1.8k articles' },
//     { name: 'Business', icon: TrendingUp, count: '3.2k articles' },
//     { name: 'Lifestyle', icon: Globe, count: '1.5k articles' }
//   ]

//   const stats = [
//     { value: '10M+', label: 'Monthly Readers' },
//     { value: '50k+', label: 'Published Articles' },
//     { value: '25k+', label: 'Expert Writers' },
//     { value: '4.9', label: 'Average Rating' }
//   ]

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-slate-500 via-purple-700 to-slate-700 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-60 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>
      
//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 opacity-50">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//         }}></div>
//       </div>
      
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="text-center">
//           {/* Hero Badge */}
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm mb-8">
//             <Star className="h-4 w-4 text-yellow-400 mr-2" />
//             <span className="text-sm font-medium text-purple-200">Featured in top tech publications</span>
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//             <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
//               Discover Stories That
//             </span>
//             <br />
//             <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
//               Inspire & Inform
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
//             Join millions of readers exploring cutting-edge insights, expert opinions, and transformative ideas from the world's leading voices.
//           </p>



//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
//             <button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 group">
//               <span className="relative z-10 flex items-center justify-center">
//                 <BookOpen className="h-5 w-5 mr-2" />
//                 Start Reading
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//             </button>
            
//             <button className="relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center group">
//               <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
//               Watch Demo
//             </button>
//           </div>

//           {/* Featured Topics */}
//           <div className="mb-16">
//             <h3 className="text-lg font-semibold text-purple-200 mb-6">Popular Topics</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {featuredTopics.map((topic, index) => (
//                 <div key={index} className="group cursor-pointer">
//                   <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:bg-slate-800/50">
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 rounded-xl transition-all duration-300"></div>
//                     <div className="relative text-center">
//                       <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg mb-3 group-hover:scale-110 transition-transform">
//                         <topic.icon className="h-6 w-6 text-purple-400" />
//                       </div>
//                       <h4 className="text-white font-semibold mb-1">{topic.name}</h4>
//                       <p className="text-sm text-gray-400">{topic.count}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <div className="fixed bottom-8 right-8 z-50">
//         <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 group">
//           <PenTool className="h-6 w-6 group-hover:scale-110 transition-transform" />
//         </button>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client";

import { Play, ArrowRight, CheckCircle, Edit3, BookOpen, TrendingUp, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Herosection() {
  const features = [
    { icon: Edit3, title: "Easy Editor", description: "Intuitive writing experience" },
    { icon: BookOpen, title: "Rich Templates", description: "Professional blog layouts" },
    { icon: TrendingUp, title: "SEO Optimized", description: "Boost your visibility" },
    { icon: Palette, title: "Customizable", description: "Match your brand style" },
  ];

  const benefits = [
    "Drag-and-drop blog builder",
    "Manual content creation",
    "Built-in SEO optimization",
    "Mobile-responsive designs",
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Enhanced Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      
      {/* Animated floating orbs - Reduced size on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle animated particles - Disabled on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Main Heading */}
            <div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                <span className="text-white">Create Stunning</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                  Blogs Manually
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-medium"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              YT Blog empowers you to craft professional blogs manually with beautiful templates and intuitive tools—no coding required.
            </p>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span
                    className="text-white/90 font-medium text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard/articel/create">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  <span>Start Creating</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Templates
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced Visual */}
          <div className="relative hidden lg:flex justify-center">
            {/* Background glow for the mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl transform scale-110"></div>
            
            {/* Main Dashboard Mockup - Enhanced visibility */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform rotate-1 hover:rotate-0 transition-all duration-500 w-full max-w-md hover:scale-105 hover:shadow-purple-500/25">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">YT</span>
                  </div>
                  <span
                    className="font-bold text-gray-900 text-sm"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    YT Blog Editor
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-5">
                {/* Blog Title */}
                <div>
                  <h3
                    className="text-xs font-semibold text-gray-600 mb-2"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    Blog Title
                  </h3>
                  <div className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg p-3 border-2 border-blue-200 shadow-sm">
                    <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-3/4 mb-1 shadow-sm"></div>
                    <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Content Blocks */}
                <div>
                  <h3
                    className="text-xs font-semibold text-gray-600 mb-2"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    Content Blocks
                  </h3>
                  <div className="space-y-3">
                    {/* Text Block */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded mr-2 shadow-sm"></div>
                        <span className="text-xs text-gray-600 font-medium">Text Block</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-gray-400 rounded w-full"></div>
                        <div className="h-1.5 bg-gray-400 rounded w-4/5"></div>
                        <div className="h-1.5 bg-gray-400 rounded w-3/5"></div>
                      </div>
                    </div>

                    {/* Image Block */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2 shadow-sm"></div>
                        <span className="text-xs text-gray-600 font-medium">Image Block</span>
                      </div>
                      <div className="h-12 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded shadow-sm"></div>
                    </div>

                    {/* Video Block */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded mr-2 shadow-sm"></div>
                        <span className="text-xs text-gray-600 font-medium">Video Block</span>
                      </div>
                      <div className="h-10 bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200 rounded shadow-sm flex items-center justify-center">
                        <Play className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Publish Button */}
                <div className="flex justify-center pt-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    Publish Blog
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20 group-hover:shadow-purple-500/25">
                <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-white group-hover:text-purple-300 transition-colors" />
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-white mb-2"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-white/80 font-medium text-sm sm:text-base"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}