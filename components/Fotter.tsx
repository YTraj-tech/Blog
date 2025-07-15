"use client";

import { useEffect, ReactNode } from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { Twitter, Instagram, Github } from "lucide-react";

// Define types for Button component props
interface ButtonProps {
  children: ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: "default";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

// Button component with proper TypeScript types
const Button: React.FC<ButtonProps> = ({ 
  children, 
  size = "default", 
  variant = "default", 
  className = "", 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const sizeClasses: Record<"default" | "sm" | "lg", string> = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };
  
  const variantClasses: Record<"default", string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Footer() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } });
  }, [controls]);

  const iconVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3, ease: easeOut } },
    initial: { scale: 1 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3, ease: easeOut } },
    initial: { scale: 1 },
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {/* Enhanced Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      
      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Centered Layout */}
        <div className="max-w-4xl mx-auto">
          
          {/* Footer Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeOut }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: easeOut }}
            >
              Stay Connected
            </motion.h2>
            
            <motion.p
              className="text-base text-white/90 mb-8 max-w-md mx-auto"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
            >
              Reach out to us at support@ytblog.com or follow us for the latest updates.
            </motion.p>

            {/* Social Media Icons */}
            <motion.div
              className="flex justify-center space-x-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
            >
              <motion.a
                href="#"
                className="text-white/80 hover:text-blue-400 rounded-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={iconVariants}
                whileHover="hover"
                initial="initial"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/80 hover:text-pink-400 rounded-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={iconVariants}
                whileHover="hover"
                initial="initial"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/80 hover:text-gray-300 rounded-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={iconVariants}
                whileHover="hover"
                initial="initial"
              >
                <Github className="h-6 w-6" />
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
            >
              <a
                href="#"
                className="hover:text-blue-400 font-medium transition-colors"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-blue-400 font-medium transition-colors"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Blog
              </a>
              <a
                href="#"
                className="hover:text-blue-400 font-medium transition-colors"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Careers
              </a>
              <a
                href="#"
                className="hover:text-blue-400 font-medium transition-colors"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Contact
              </a>
            </motion.div>

            <motion.div
              className="max-w-xs mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
            >
              <p
                className="text-base text-white/90 mb-4"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                Subscribe for the latest updates!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50 shadow-lg"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: easeOut }}
                />
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  initial="initial"
                  className="mt-2 sm:mt-0"
                >
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: easeOut }}
        >
          <p
            className="text-sm text-white/80"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            © 2025 YT Blog. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}