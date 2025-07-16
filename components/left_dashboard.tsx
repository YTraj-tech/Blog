// "use client";
// import React, { useState } from "react";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "./ui/button";
// import {
//   BarChart,
//   FileText,
//   LayoutDashboard,
//   MessageCircle,
//   Settings,
// } from "lucide-react";
// import Link from "next/link";
// const LeftSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Mobile Sidebar */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetTrigger asChild>
//           <Button variant="outline" className="md:hidden m-4">
//             <LayoutDashboard className="h-5 w-5" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-[250px]">
//             <SheetTitle className="sr-only">side menu</SheetTitle>
//           <DashboardSidebar closeSheet={() => setIsOpen(false)} />
//         </SheetContent>
//       </Sheet>
//       <div className="hidden md:block h-screen w-[250px] border-r bg-background">
//         <DashboardSidebar />
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

// function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
//   return (
//     <div className="h-full px-4 py-6">
//       <div className="flex items-center gap-2 mb-8 px-2">
//         <Link href={"/"}>
//         <span className="text-xl font-bold">YT Blog</span>
//         </Link>
//       </div>
//       <nav className="space-y-1">
//         <Link href={"/dashboard"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start"
//             onClick={closeSheet}
//           >
//             <LayoutDashboard className="mr-2 h-4 w-4" />
//             Overview
//           </Button>
//         </Link>

//         <Link href={"/dashboard/articles/create"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start"
//             onClick={closeSheet}
//           >
//             <FileText className="mr-2 h-4 w-4" />
//             Articles
//           </Button>
//         </Link>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <MessageCircle className="mr-2 h-4 w-4" />
//           Comments
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <BarChart className="mr-2 h-4 w-4" />
//           Analytics
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <Settings className="mr-2 h-4 w-4" />
//           Settings
//         </Button>
//       </nav>
//     </div>
//   );
// }


// "use client";
// import React, { useState } from "react";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "./ui/button";
// import {
//   BarChart,
//   FileText,
//   LayoutDashboard,
//   MessageCircle,
//   Settings,
// } from "lucide-react";
// import Link from "next/link";

// const LeftSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Mobile Sidebar */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             className="md:hidden m-4 rounded-full p-2 bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
//           >
//             <LayoutDashboard className="h-5 w-5 text-primary" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-[250px] bg-gradient-to-b from-background to-muted/50">
//           <SheetTitle className="sr-only">side menu</SheetTitle>
//           <DashboardSidebar closeSheet={() => setIsOpen(false)} />
//         </SheetContent>
//       </Sheet>
//       <div className="hidden md:block h-screen w-[250px] border-r bg-gradient-to-b from-background to-muted/50 shadow-lg">
//         <DashboardSidebar />
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

// function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
//   return (
//     <div className="h-full px-4 py-6">
//       <div className="flex items-center gap-2 mb-8 px-2">
//         <Link href={"/"}>
//           <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
//             YT Blog
//           </span>
//         </Link>
//       </div>
//       <nav className="space-y-1">
//         <Link href={"/dashboard"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg py-6"
//             onClick={closeSheet}
//           >
//             <LayoutDashboard className="mr-3 h-5 w-5 text-primary" />
//             Overview
//           </Button>
//         </Link>
//         <Link href={"/dashboard/articles/create"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg py-6"
//             onClick={closeSheet}
//           >
//             <FileText className="mr-3 h-5 w-5 text-primary" />
//             Articles
//           </Button>
//         </Link>
//         <Button
//           variant="ghost"
//           className="w-full justify-start text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg py-6"
//           onClick={closeSheet}
//         >
//           <MessageCircle className="mr-3 h-5 w-5 text-primary" />
//           Comments
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg py-6"
//           onClick={closeSheet}
//         >
//           <BarChart className="mr-3 h-5 w-5 text-primary" />
//           Analytics
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg py-6"
//           onClick={closeSheet}
//         >
//           <Settings className="mr-3 h-5 w-5 text-primary" />
//           Settings
//         </Button>
//       </nav>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { motion, useAnimation, easeOut } from "framer-motion";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import {
//   BarChart,
//   FileText,
//   LayoutDashboard,
//   MessageCircle,
//   Settings,
// } from "lucide-react";
// import Link from "next/link";

// const LeftSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } });
//   }, [controls]);

//   const sidebarVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
//     },
//   };

//   const navItemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
//   };

//   return (
//     <motion.div initial="hidden" animate="visible" variants={sidebarVariants}>
//       {/* Mobile Sidebar */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             className="md:hidden m-4 rounded-full p-2 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
//           >
//             <LayoutDashboard className="h-5 w-5 text-white" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent
//           side="left"
//           className="w-[250px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20"
//         >
//           <SheetTitle className="sr-only">Side Menu</SheetTitle>
//           <DashboardSidebar closeSheet={() => setIsOpen(false)} />
//         </SheetContent>
//       </Sheet>

//       {/* Desktop Sidebar */}
//       <motion.div
//         className="hidden md:block h-screen w-[250px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 shadow-lg overflow-hidden relative"
//         variants={sidebarVariants}
//       >
//         {/* Background Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

//         {/* Animated Floating Orbs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-2000"></div>
//         </div>

//         {/* Subtle Animated Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//           <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
//           <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
//           <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
//         </div>

//         <DashboardSidebar />
//       </motion.div>
//     </motion.div>
//   );
// };

// function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
//   const navItemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
//   };

//   return (
//     <div className="h-full px-4 py-6 relative z-10">
//       <motion.div
//         className="flex items-center gap-2 mb-8 px-2"
//         variants={navItemVariants}
//       >
//         <Link href={"/"}>
//           <span
//             className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             YT Blog
//           </span>
//         </Link>
//       </motion.div>
//       <nav className="space-y-1">
//         <motion.div variants={navItemVariants}>
//           <Link href={"/dashboard"}>
//             <Button
//               variant="ghost"
//               className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//               onClick={closeSheet}
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               <LayoutDashboard className="mr-3 h-5 w-5 text-blue-400" />
//               Overview
//             </Button>
//           </Link>
//         </motion.div>
//         <motion.div variants={navItemVariants}>
//           <Link href={"/articles"}>
//             <Button
//               variant="ghost"
//               className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//               onClick={closeSheet}
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               <FileText className="mr-3 h-5 w-5 text-blue-400" />
//               Articles
//             </Button>
//           </Link>
//         </motion.div>
//         <motion.div variants={navItemVariants}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//             onClick={closeSheet}
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             <MessageCircle className="mr-3 h-5 w-5 text-blue-400" />
//             Comments
//           </Button>
//         </motion.div>
//         <motion.div variants={navItemVariants}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//             onClick={closeSheet}
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             <BarChart className="mr-3 h-5 w-5 text-blue-400" />
//             Analytics
//           </Button>
//         </motion.div>
//         <motion.div variants={navItemVariants}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//             onClick={closeSheet}
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             <Settings className="mr-3 h-5 w-5 text-blue-400" />
//             Settings
//           </Button>
//         </motion.div>
//       </nav>
//     </div>
//   );
// };

// export default LeftSidebar;




// "use client";

// import { useEffect, useState } from "react";
// import { motion, useAnimation, easeOut } from "framer-motion";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import {
//   BarChart,
//   FileText,
//   LayoutDashboard,

//   Home,

// } from "lucide-react";
// import Link from "next/link";

// // Define type for navigation items
// interface NavItem {
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   href?: string; // Optional for navigation links
//   onClick?: () => void; // Optional for custom actions
// }

// // Dynamic navigation data
// const navItems: NavItem[] = [

//   {
//     label: "Articles",
//     icon: FileText,
//     href: "/articels",
//   },


//   {
//     label: "Home",
//     icon: Home,
//     href: "/",
//   },

//   {
//     label: "create articel",
//     icon: BarChart,
//     href: "/dashboard/articel/create",
//   },

//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//   },

// ];

// const LeftSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } });
//   }, [controls]);

//   const sidebarVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
//     },
//   };


//   return (
//     <motion.div initial="hidden" animate="visible" variants={sidebarVariants}>
//       {/* Mobile Sidebar */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             className="md:hidden m-4 rounded-full p-2 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
//           >
//             <LayoutDashboard className="h-5 w-5 text-white" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent
//           side="left"
//           className="w-[250px] h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 flex flex-col"
//         >
//           <SheetTitle className="sr-only">Side Menu</SheetTitle>
//           <DashboardSidebar closeSheet={() => setIsOpen(false)} />
//         </SheetContent>
//       </Sheet>

//       {/* Desktop Sidebar */}
//       <motion.div
//         className="hidden md:block h-screen w-[250px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 shadow-lg overflow-hidden relative"
//         variants={sidebarVariants}
//       >
//         {/* Background Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

//         {/* Animated Floating Orbs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-2000"></div>
//         </div>

//         {/* Subtle Animated Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//           <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
//           <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
//           <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
//         </div>

//         <DashboardSidebar />
//       </motion.div>
//     </motion.div>
//   );
// };

// function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
//   const navItemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
//   };

//   return (
//     <div className="h-screen px-4 py-6 relative z-10 flex flex-col">
//       <motion.div
//         className="flex items-center gap-2 mb-8 px-2"
//         variants={navItemVariants}
//       >
//         <Link href="/">
//           <span
//             className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             YT Blog
//           </span>
//         </Link>
//       </motion.div>
//       <nav className="space-y-1 flex-1">
//         {navItems.map((item, index) => (
//           <motion.div key={index} variants={navItemVariants}>
//             {item.href ? (
//               <Link href={item.href}>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//                   onClick={closeSheet}
//                   style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                 >
//                   <item.icon className="mr-3 h-5 w-5 text-blue-400" />
//                   {item.label}
//                 </Button>
//               </Link>
//             ) : (
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
//                 onClick={() => {
//                   if (item.onClick) item.onClick();
//                   if (closeSheet) closeSheet();
//                 }}
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 <item.icon className="mr-3 h-5 w-5 text-blue-400" />
//                 {item.label}
//               </Button>
//             )}
//           </motion.div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default LeftSidebar;










"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  Home,
} from "lucide-react";
import Link from "next/link";

// Define type for navigation items
interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string; // Optional for navigation links
  onClick?: () => void; // Optional for custom actions
}

// Dynamic navigation data
const navItems: NavItem[] = [
  {
    label: "Articles",
    icon: FileText,
    href: "/articels",
  },
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "create articel",
    icon: BarChart,
    href: "/dashboard/articel/create",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
];

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } });
  }, [controls]);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={sidebarVariants}>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden fixed top-4 left-4 z-50 rounded-full p-2 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <LayoutDashboard className="h-5 w-5 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[250px] h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 flex flex-col p-0"
        >
          <SheetTitle className="sr-only">Side Menu</SheetTitle>
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:block h-screen w-[250px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 shadow-lg overflow-hidden relative"
        variants={sidebarVariants}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

        {/* Animated Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-2000"></div>
        </div>

        {/* Subtle Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
        </div>

        <DashboardSidebar />
      </motion.div>
    </motion.div>
  );
};

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return (
    <div className="h-screen px-4 py-6 relative z-10 flex flex-col">
      <motion.div
        className="flex items-center gap-2 mb-8 px-2"
        variants={navItemVariants}
      >
        <Link href="/">
          <span
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            YT Blog
          </span>
        </Link>
      </motion.div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item, index) => (
          <motion.div key={index} variants={navItemVariants}>
            {item.href ? (
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={closeSheet}
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  <item.icon className="mr-3 h-5 w-5 text-blue-400" />
                  {item.label}
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg py-6 transition-all duration-300 shadow-sm hover:shadow-md"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  if (closeSheet) closeSheet();
                }}
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                <item.icon className="mr-3 h-5 w-5 text-blue-400" />
                {item.label}
              </Button>
            )}
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;