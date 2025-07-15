"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Sparkles, FileText, Tag, LucideImage, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import "react-quill-new/dist/quill.snow.css";
import { motion } from "framer-motion";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditArticle = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articels/${id}`);
        if (!res.ok) {
          setError("Failed to load article.");
          return;
        }

        const data = await res.json();

        if (data?.author?.clerkId !== user.id) {
          setIsOwner(false);
          return;
        }

        setIsOwner(true);
        setTitle(data.title || "");
        setCategory(data.category || "");
        setContent(data.content || "");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load article";
        console.error("Failed to load article:", message);
        setError(message);
        setIsOwner(false);
      }
    };

    fetchArticle();
  }, [id, user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("category", category.trim());
    formData.append("content", content.trim());
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      const res = await fetch(`/api/articels/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update article.");
      } else {
        router.push(`/articels/${id}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update article";
      console.error("Failed to update article:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (isOwner === false) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-red-300 font-semibold text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      >
        🚫 You are not authorized to edit this article.
      </motion.div>
    );
  }

  if (isOwner === null || !user) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      >
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        Loading...
      </motion.div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center py-4">
        {/* HEADER */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1
            className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Edit Your Story
          </h1>
          <p
            className="text-white/90 text-lg font-medium"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Update your article with the latest insights
          </p>
        </motion.div>

        {/* ERROR MESSAGE */}
        {error && (
          <motion.div
            className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm animate-pulse"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p
              className="text-red-300 font-medium"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              {error}
            </p>
          </motion.div>
        )}

        {/* FORM */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Card className="shadow-2xl border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/95 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01]">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
              <CardTitle
                className="text-xl font-bold flex items-center gap-2"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
              >
                <FileText className="w-6 h-6" />
                Edit Article Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-auto">
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="space-y-1">
                  <Label
                    htmlFor="title"
                    className="flex items-center gap-2 text-base font-semibold text-gray-800"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    Article Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter an engaging title..."
                    className="h-9 text-base border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50/50 focus:border-blue-500 focus:ring-0 hover:border-blue-400 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <Label
                    htmlFor="category"
                    className="flex items-center gap-2 text-base font-semibold text-gray-800"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <Tag className="w-5 h-5 text-purple-600 hover:scale-110 transition-transform duration-300" />
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full h-9 text-base px-3 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-purple-50/50 focus:border-purple-500 focus:ring-0 hover:border-purple-400 transition-all duration-300 disabled:opacity-50"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <option value="">Choose a category</option>
                    <option value="technology">🔧 Technology</option>
                    <option value="programming">💻 Programming</option>
                    <option value="web-development">🌐 Web Development</option>
                    <option value="design">🎨 Design</option>
                    <option value="productivity">⚡ Productivity</option>
                    <option value="tutorial">📚 Tutorial</option>
                  </select>
                </div>

                {/* Image */}
                <div className="space-y-1">
                  <Label
                    className="flex items-center gap-2 text-base font-semibold text-gray-800"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <LucideImage className="w-5 h-5 text-green-600 hover:scale-110 transition-transform duration-300" />
                    Featured Image (optional)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                    disabled={loading}
                    className="file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:bg-gradient-to-r hover:file:from-blue-700 hover:file:to-purple-700 transition-all duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <Label
                    className="flex items-center gap-2 text-base font-semibold text-gray-800"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <FileText className="w-5 h-5 text-indigo-600 hover:scale-110 transition-transform duration-300" />
                    Article Content
                  </Label>
                  <div className={loading ? "opacity-50 pointer-events-none" : ""}>
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      placeholder="Update your article content..."
                      className="min-h-[120px] bg-white rounded-lg border border-gray-200"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["blockquote", "code-block"],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-9 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  disabled={loading}
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  <Sparkles className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
                  {loading ? "Updating..." : "Update Article"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EditArticle;