// "use client"

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence, Variants, Easing } from 'framer-motion'
// import { Menu, X, Home, BookOpen, User } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { SearchInput } from './search_artical'

// // Dynamic imports to avoid module resolution issues
// import dynamic from 'next/dynamic'

// const SignInButton = dynamic(
//   () => import('@clerk/nextjs').then((mod) => ({ default: mod.SignInButton })),
//   { ssr: false }
// )

// const SignUpButton = dynamic(
//   () => import('@clerk/nextjs').then((mod) => ({ default: mod.SignUpButton })),
//   { ssr: false }
// )

// const SignedIn = dynamic(
//   () => import('@clerk/nextjs').then((mod) => ({ default: mod.SignedIn })),
//   { ssr: false }
// )

// const SignedOut = dynamic(
//   () => import('@clerk/nextjs').then((mod) => ({ default: mod.SignedOut })),
//   { ssr: false }
// )

// const UserButton = dynamic(
//   () => import('@clerk/nextjs').then((mod) => ({ default: mod.UserButton })),
//   { ssr: false }
// )

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [scrollY, setScrollY] = useState(0)
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY
//       setScrollY(currentScrollY)
//       setIsScrolled(currentScrollY > 50)
//     }

//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }

//   const navItems = [
//     { name: 'Home', href: '/', icon: Home },
//     { name: 'Articles', href: '/articles', icon: BookOpen },
//     { name: 'Profile', href: '/profile', icon: User },
//   ]

//   // Animation variants
//   const logoVariants: Variants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.05,
//       transition: { duration: 0.3, ease: "easeOut" as Easing }
//     },
//   }

//   const navItemVariants: Variants = {
//     initial: { y: 0, opacity: 1 },
//     hover: { 
//       y: -2,
//       transition: { duration: 0.2, ease: "easeOut" as Easing }
//     },
//   }

//   const mobileMenuVariants: Variants = {
//     initial: { height: 0, opacity: 0 },
//     animate: { 
//       height: 'auto', 
//       opacity: 1,
//       transition: { 
//         duration: 0.3,
//         ease: "easeOut" as Easing,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     },
//     exit: { 
//       height: 0, 
//       opacity: 0,
//       transition: { duration: 0.2, ease: "easeIn" as Easing }
//     }
//   }

//   const mobileItemVariants: Variants = {
//     initial: { x: -20, opacity: 0 },
//     animate: { 
//       x: 0, 
//       opacity: 1,
//       transition: { duration: 0.3, ease: "easeOut" as Easing }
//     },
//   }

//   const navbarVariants: Variants = {
//     initial: { y: 0, scale: 1 },
//     scrolled: {
//       y: 0,
//      transition: { duration: 0.3, ease: "easeOut" as Easing }
//     }
//   }

//   const contentVariants: Variants = {
//     initial: { 
//       backdropFilter: "blur(8px)",
//       backgroundColor: "rgba(255, 255, 255, 0.1)"
//     },
//     scrolled: {
//       backdropFilter: "blur(16px)",
//       backgroundColor: "rgba(255, 255, 255, 0.15)",
//       transition: { duration: 0.3, ease: "easeOut" as Easing }
//     }
//   }

//   return (
//     <motion.div 
//       className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-500 via-purple-700 to-slate-700  max-w-full "
//       initial="initial"
//       animate={isScrolled ? "scrolled" : "initial"}
//       variants={navbarVariants}
//       style={{
//         transform: `translateY(${scrollY * 0.1}px)`,
//       }}
//     >
//       <div className="px-6 sm:px-8 lg:px-12 py-4">
//         <motion.nav 
//           className="max-w-6xl mx-auto  rounded-2xl shadow-lg overflow-hidden"
//           variants={contentVariants}
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             backdropFilter: "blur(12px)",
//           }}
//           whileHover={{
//             backgroundColor: "rgba(255, 255, 255, 0.15)",
//             scale: 1.002,
//             transition: { duration: 0.2 }
//           }}
//         >
//           <div className="px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               {/* Logo */}
//               <motion.div 
//                 className="flex-shrink-0 flex items-center cursor-pointer"
//                 variants={logoVariants}
//                 initial="initial"
//                 whileHover="hover"
//               >
//                 <div className="flex items-center space-x-2">
//                   <motion.div 
//                     className="w-10 h-10 bg-blue-50  rounded-xl flex items-center justify-center shadow-lg"
//                     whileHover={{ 
//                       scale: 1.1, 
//                       rotate: 360,
//                       boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
//                     }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <motion.span 
//                       className="text-black font-bold text-lg"
//                       whileHover={{ scale: 1.2 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       YT
//                     </motion.span>
//                   </motion.div>
//                   <motion.h1 
//                     className="text-xl font-bold text-white tracking-tight"
//                     whileHover={{ 
//                       scale: 1.05,
//                       textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     YT Blog
//                   </motion.h1>
//                 </div>
//               </motion.div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-8">
//                 {navItems.map((item, index) => (
//                   <motion.a
//                     key={item.name}
//                     href={item.href}
//                     className="relative text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
//                     variants={navItemVariants}
//                     initial="initial"
//                     whileHover="hover"
//                     animate={{
//                       y: Math.sin(scrollY * 0.01 + index) * 2,
//                     }}
//                     transition={{ duration: 0.1 }}
//                   >
//                     {item.name}
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
//                       initial={{ scaleX: 0 }}
//                       whileHover={{ scaleX: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-lg"
//                       initial={{ opacity: 0 }}
//                       whileHover={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Search - Desktop */}
//               <motion.div 
//                 className="hidden md:flex flex-1 max-w-md mx-8"
//                 animate={{
//                   scale: 1 + Math.sin(scrollY * 0.005) * 0.01,
//                 }}
//                 transition={{ duration: 0.1 }}
//               >
//                 <SearchInput />
//               </motion.div>

//               {/* Authentication Section - Desktop */}
//               <div className="hidden md:flex items-center space-x-4">
//                 <SignedOut>
//                   <div className="flex items-center space-x-3">
//                     <SignInButton mode="modal">
//                       <motion.div
//                         whileHover={{ 
//                           scale: 1.05,
//                           rotate: [0, -1, 1, 0],
//                           transition: { duration: 0.3 }
//                         }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button 
//                           variant="ghost"
//                           className="text-white/80 hover:text-white font-medium hover:bg-white/10 rounded-lg px-4 py-2 transition-all duration-300"
//                         >
//                           Sign In
//                         </Button>
//                       </motion.div>
//                     </SignInButton>

//                     <SignUpButton mode="modal">
//                       <motion.div
//                         whileHover={{ 
//                           scale: 1.05, 
//                           y: -2,
//                           boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
//                         }}
//                         whileTap={{ scale: 0.95 }}
//                         animate={{
//                           boxShadow: `0 ${5 + Math.sin(scrollY * 0.01) * 2}px 15px rgba(239, 68, 68, 0.2)`
//                         }}
//                       >
//                         <Button 
//                           className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//                         >
//                           Get full access
//                         </Button>
//                       </motion.div>
//                     </SignUpButton>
//                   </div>
//                 </SignedOut>

//                 <SignedIn>
//                   <div className="flex items-center space-x-3">
//                     <motion.div
//                       whileHover={{ 
//                         scale: 1.1,
//                         rotate: 360,
//                         transition: { duration: 0.6 }
//                       }}
//                       className="ring-2 ring-white/30 hover:ring-white/50 rounded-full transition-all duration-300"
//                       animate={{
//                         boxShadow: `0 0 ${10 + Math.sin(scrollY * 0.01) * 5}px rgba(255, 255, 255, 0.3)`
//                       }}
//                     >
//                       <UserButton 
//                         afterSignOutUrl="/"
//                         appearance={{
//                           elements: {
//                             avatarBox: "w-10 h-10"
//                           }
//                         }}
//                       />
//                     </motion.div>
//                   </div>
//                 </SignedIn>
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden">
//                 <motion.div
//                   whileHover={{ 
//                     scale: 1.1,
//                     rotate: 180,
//                     transition: { duration: 0.3 }
//                   }}
//                   whileTap={{ scale: 0.9 }}
//                   animate={{
//                     y: Math.sin(scrollY * 0.01) * 2,
//                   }}
//                 >
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={toggleMobileMenu}
//                     className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
//                   >
//                     <AnimatePresence mode="wait">
//                       {isMobileMenuOpen ? (
//                         <motion.div
//                           key="x"
//                           initial={{ rotate: -90, opacity: 0 }}
//                           animate={{ rotate: 0, opacity: 1 }}
//                           exit={{ rotate: 90, opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <X className="h-5 w-5" />
//                         </motion.div>
//                       ) : (
//                         <motion.div
//                           key="menu"
//                           initial={{ rotate: 90, opacity: 0 }}
//                           animate={{ rotate: 0, opacity: 1 }}
//                           exit={{ rotate: -90, opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Menu className="h-5 w-5" />
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </Button>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </motion.nav>

//         {/* Mobile menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div 
//               className="md:hidden mt-2 max-w-6xl mx-auto border border-white/20 rounded-2xl shadow-lg overflow-hidden"
//               variants={mobileMenuVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 backdropFilter: "blur(12px)",
//               }}
//             >
//               <div className="px-6 pt-4 pb-6 space-y-4">
//                 {/* Mobile Search */}
//                 <motion.div 
//                   className="mb-4"
//                   variants={mobileItemVariants}
//                 >
//                   <SearchInput />
//                 </motion.div>

//                 {/* Navigation Items */}
//                 {navItems.map((item, index) => (
//                   <motion.a
//                     key={item.name}
//                     href={item.href}
//                     className="block px-4 py-3 text-white/80 hover:text-white font-medium transition-colors duration-200 hover:bg-white/10 rounded-lg"
//                     variants={mobileItemVariants}
//                     whileHover={{ 
//                       x: 5,
//                       backgroundColor: "rgba(255, 255, 255, 0.15)",
//                       transition: { duration: 0.2 }
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     animate={{
//                       x: Math.sin(scrollY * 0.01 + index) * 1,
//                     }}
//                   >
//                     {item.name}
//                   </motion.a>
//                 ))}

//                 {/* Mobile Authentication */}
//                 <motion.div 
//                   className="pt-4 border-t border-white/20"
//                   variants={mobileItemVariants}
//                 >
//                   <SignedOut>
//                     <div className="flex flex-col space-y-3">
//                       <SignInButton mode="modal">
//                         <Button 
//                           variant="ghost"
//                           className="w-full justify-start text-white/80 hover:text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-300"
//                         >
//                           Sign In
//                         </Button>
//                       </SignInButton>

//                       <SignUpButton mode="modal">
//                         <Button 
//                           className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
//                         >
//                           Get full access
//                         </Button>
//                       </SignUpButton>
//                     </div>
//                   </SignedOut>

//                   <SignedIn>
//                     <div className="flex items-center space-x-3 px-4 py-3 rounded-lg"
//                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
//                       <UserButton 
//                         afterSignOutUrl="/"
//                         appearance={{
//                           elements: {
//                             avatarBox: "w-10 h-10"
//                           }
//                         }}
//                       />
//                       <span className="text-white font-medium">Welcome back!</span>
//                     </div>
//                   </SignedIn>
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   )
// }


"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import { Menu, X, Home, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search_artical";
import dynamic from "next/dynamic";

const SignInButton = dynamic(() => import("@clerk/nextjs").then((mod) => ({ default: mod.SignInButton })), { ssr: false });
const SignUpButton = dynamic(() => import("@clerk/nextjs").then((mod) => ({ default: mod.SignUpButton })), { ssr: false });
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => ({ default: mod.SignedIn })), { ssr: false });
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => ({ default: mod.SignedOut })), { ssr: false });
const UserButton = dynamic(() => import("@clerk/nextjs").then((mod) => ({ default: mod.UserButton })), { ssr: false });

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Articles", href: "/articels", icon: BookOpen },
    { name: "Dashboard", href: "/dashboard", icon: User },
  ];

  const logoVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 3, transition: { duration: 0.4, ease: "easeOut" as Easing } },
  };

  const navItemVariants: Variants = {
    initial: { y: 15, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as Easing } },
    hover: { scale: 1.05, y: -3, transition: { duration: 0.3, ease: "easeOut" as Easing } },
  };

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.06, transition: { duration: 0.3, ease: "easeOut" as Easing } },
    tap: { scale: 0.94, transition: { duration: 0.2, ease: "easeOut" as Easing } },
  };

  return (
    <>
      {/* Hero Section Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(147,51,234,0.15),transparent_50%)]" />
      </div>

      {/* Transparent Centered Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center group cursor-pointer" 
              variants={logoVariants} 
              initial="initial" 
              whileHover="hover"
            >
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as Easing, repeatDelay: 1.5 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  YT Blog
                </span>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10"
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    <span>{item.name}</span>
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "80%" }}
                    transition={{ duration: 0.4, ease: "easeOut" as Easing }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex-grow mx-6 max-w-md">
              <SearchInput />
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <SignedOut>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <SignInButton mode="modal">
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] border-0 px-4 py-2 rounded-xl"
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 px-4 py-2 rounded-xl backdrop-blur-sm"
                      >
                        Sign Up
                      </Button>
                    </motion.div>
                  </SignUpButton>
                </motion.div>
              </SignedOut>

              <SignedIn>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="hidden lg:block text-sm text-white/80 font-medium">
                    Welcome back!
                  </div>
                  <div className="ring-2 ring-purple-400/50 rounded-full hover:ring-purple-300/70 transition-all duration-300">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 ring-2 ring-purple-400/50 hover:ring-purple-300/70 transition-all duration-300",
                          userButtonPopoverCard:
                            "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl",
                          userButtonPopoverActionButton:
                            "text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300",
                          userButtonPopoverActionButtonText: "text-white/90 font-medium",
                          userButtonPopoverActionButtonIcon: "text-purple-400",
                        },
                      }}
                    />
                  </div>
                </motion.div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                <Button
                  size="icon"
                  onClick={toggleMobileMenu}
                  className="relative bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="x"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" as Easing }}
                      >
                        <X className="h-5 w-5 text-white/80" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -180, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" as Easing }}
                      >
                        <Menu className="h-5 w-5 text-white/80" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" as Easing }}
              className="mt-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-purple-400" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
                
                <div className="border-t border-white/10 pt-4 mt-4">
                  <SignedOut>
                    <div className="flex flex-col space-y-3">
                      <SignInButton mode="modal">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium transition-all duration-300 rounded-xl">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button variant="outline" className="w-full border-white/20 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 rounded-xl backdrop-blur-sm">
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  
                  <SignedIn>
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 ring-2 ring-purple-400/50",
                            userButtonPopoverCard:
                              "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl",
                            userButtonPopoverActionButton:
                              "text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300",
                            userButtonPopoverActionButtonText: "text-white/90 font-medium",
                            userButtonPopoverActionButtonIcon: "text-purple-400",
                          },
                        }}
                      />
                      <span className="text-white/80 font-medium">Welcome back!</span>
                    </div>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}