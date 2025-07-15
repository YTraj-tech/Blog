"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Added import for Next.js Image component
import he from "he"; // Added import for encoding special characters

// Define FAQ data type
interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const controls = useAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } });
  }, [controls]);

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: "0.75rem", transition: { duration: 0.3, ease: easeOut } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut, delay: 0.3 } },
  };

  // Sample FAQ data
  const faqs: FAQ[] = [
    {
      question: "What is the YT Blog about?",
      answer: "YT Blog is dedicated to providing insights, tutorials, and updates on technology, programming, and digital trends to empower creators and developers.",
    },
    {
      question: "How often is new content published?",
      answer: "We publish new articles weekly, covering the latest in tech, coding tips, and industry news to keep you informed.",
    },
    {
      question: "Can I contribute to the blog?",
      answer: "Yes! We welcome guest posts from passionate writers. Reach out to us at contribute@ytblog.com for submission guidelines.",
    },
    {
      question: "How can I stay updated with the blog?",
      answer: "Subscribe to our newsletter or follow us on social media for the latest articles and updates.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
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
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: easeOut }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: FAQs */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={faqVariants}
                className="bg-white/10 backdrop-blur-xl rounded-lg shadow-md border border-white/20"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    {he.encode(faq.question)} {/* Encode question to escape special characters */}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white/80" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/80" />
                  )}
                </button>
                <motion.div
                  variants={answerVariants}
                  initial="hidden"
                  animate={openIndex === index ? "visible" : "hidden"}
                  className="px-6 pb-6 overflow-hidden"
                >
                  <p
                    className="text-base text-white/90"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    {he.encode(faq.answer)} {/* Encode answer to escape special characters */}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            className="flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl transform scale-110"></div>
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Blog illustration"
                width={800} // Specify width for optimization
                height={400} // Specify height based on maxHeight style
                className="relative rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxHeight: "400px", objectFit: "cover" }}
                priority // Optional: prioritize loading for LCP
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Learn More About YT Blog
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}