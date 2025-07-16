// "use client";
// import { FormEvent, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";
// import {
//   FileText,
//   Tag,
//   Image as LucideImage,
//   Sparkles,
//   Save,
//   Eye,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const CreateArticle = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [featuredImage, setFeaturedImage] = useState<File | null>(null);
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate required fields before submission
//     if (!title.trim()) {
//       setError("Title is required");
//       setLoading(false);
//       return;
//     }

//     if (!category.trim()) {
//       setError("Category is required");
//       setLoading(false);
//       return;
//     }

//     if (!content.trim()) {
//       setError("Content is required");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("category", category.trim());
//     formData.append("content", content.trim());
//     if (featuredImage) {
//       formData.append("featuredImage", featuredImage);
//     }

//     try {
//       console.log("🚀 Submitting to:", "/api/articles");
//       console.log("📝 Form data:", {
//         title: title.trim(),
//         category: category.trim(),
//         content: content.trim().substring(0, 100) + "...",
//         hasImage: !!featuredImage,
//       });

//       // Fixed the typo in the API endpoint
//       const res = await fetch("/api/articels", {
//         method: "POST",
//         body: formData,
//       });

//       console.log("📡 Response status:", res.status);
//       console.log("📡 Response headers:", Object.fromEntries(res.headers.entries()));

//       // Check if the response is successful
//       if (!res.ok) {
//         // Handle different error status codes
//         if (res.status === 404) {
//           setError("API endpoint not found. Please check your API route configuration.");
//           console.error("❌ 404 Error: API route not found at /api/articles");
//           return;
//         }

//         if (res.status === 401) {
//           setError("You must be logged in to create an article.");
//           return;
//         }

//         if (res.status === 403) {
//           setError("You don't have permission to create articles.");
//           return;
//         }

//         if (res.status === 500) {
//           setError("Server error occurred. Please try again later.");
//           return;
//         }
//       }

//       const contentType = res.headers.get("content-type");
//       console.log("📄 Content type:", contentType);

//       if (contentType?.includes("application/json")) {
//         const data = await res.json();
//         console.log("📦 Response data:", data);

//         if (!res.ok) {
//           console.error("❌ Server error:", data);
//           if (data.issues) {
//             // Handle validation errors
//             const validationErrors = Object.entries(data.issues)
//               .map(([field, errors]) => `${field}: ${(errors as string[]).join(", ")}`)
//               .join("; ");
//             setError(`Validation errors: ${validationErrors}`);
//           } else {
//             setError(data.error || "Failed to create article");
//           }
//           return;
//         }

//         console.log("✅ Article created successfully:", data);

//         // Reset form
//         setTitle("");
//         setCategory("");
//         setContent("");
//         setFeaturedImage(null);

//         // Reset file input
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//         if (fileInput) {
//           fileInput.value = "";
//         }

//         // Redirect to article or articles list
//         if (data.article?.id) {
//           router.push(`/articles/${data.article.id}`);
//         } else {
//           router.push("/articles");
//         }
//       } else {
//         // Handle non-JSON responses (like HTML error pages)
//         const text = await res.text();
//         console.error("❌ Non-JSON response:", text.substring(0, 200) + "...");

//         if (text.includes("404")) {
//           setError("API endpoint not found. Please check if your API route file exists at app/api/articles/route.ts");
//         } else if (text.includes("500")) {
//           setError("Server error occurred. Please try again later.");
//         } else {
//           setError("An unexpected error occurred. Please check the console for details.");
//         }
//       }
//     } catch (error) {
//       console.error("❌ Network error:", error);
//       if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
//         setError("Network error: Unable to connect to the server. Please check your internet connection.");
//       } else {
//         setError("Network error. Please check your connection and try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async () => {
//     // Implement save draft functionality
//     console.log("Save draft functionality to be implemented");
//     setError("Save draft feature is not implemented yet.");
//   };

//   const handlePreview = () => {
//     // Implement preview functionality
//     console.log("Preview functionality to be implemented");
//     setError("Preview feature is not implemented yet.");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="w-full max-w-5xl mx-auto px-4">
//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
//             Create Your Story
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Share your thoughts and ideas with the world
//           </p>
//         </div>

//         {/* ERROR MESSAGE */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 font-medium">{error}</p>
//           </div>
//         )}

//         {/* FORM */}
//         <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden backdrop-blur-sm bg-white/95">
//           <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3">
//               <FileText className="w-7 h-7" />
//               Article Details
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="p-8 space-y-8">
//             <form className="space-y-8" onSubmit={handleSubmit}>
//               {/* TITLE */}
//               <div className="space-y-3">
//                 <Label htmlFor="title" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//                   Article Title
//                 </Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Enter an engaging title..."
//                   className="h-12 text-lg border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               {/* CATEGORY */}
//               <div className="space-y-3">
//                 <Label htmlFor="category" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//                   <Tag className="w-5 h-5 text-purple-600" />
//                   Category
//                 </Label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                   disabled={loading}
//                   className="w-full h-12 text-lg px-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-purple-500 disabled:opacity-50"
//                 >
//                   <option value="">Choose a category</option>
//                   <option value="technology">🔧 Technology</option>
//                   <option value="programming">💻 Programming</option>
//                   <option value="web-development">🌐 Web Development</option>
//                   <option value="design">🎨 Design</option>
//                   <option value="productivity">⚡ Productivity</option>
//                   <option value="tutorial">📚 Tutorial</option>
//                 </select>
//               </div>

//               {/* IMAGE */}
//               <div className="space-y-3">
//                 <Label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//                   <LucideImage className="w-5 h-5 text-green-600" />
//                   Featured Image (optional)
//                 </Label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
//                   disabled={loading}
//                   className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="space-y-3">
//                 <Label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//                   <FileText className="w-5 h-5 text-indigo-600" />
//                   Article Content
//                 </Label>
//                 <div className={loading ? "opacity-50 pointer-events-none" : ""}>
//                   <ReactQuill
//                     theme="snow"
//                     value={content}
//                     onChange={setContent}
//                     placeholder="Start writing your amazing article here..."
//                     className="min-h-[250px]"
//                     modules={{
//                       toolbar: [
//                         [{ header: [1, 2, 3, false] }],
//                         ["bold", "italic", "underline", "strike"],
//                         [{ list: "ordered" }, { list: "bullet" }],
//                         ["blockquote", "code-block"],
//                         ["link", "image"],
//                         ["clean"],
//                       ],
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   className="flex-1 h-12"
//                   onClick={handlePreview}
//                   disabled={loading}
//                 >
//                   <Eye className="w-5 h-5 mr-2" />
//                   Preview
//                 </Button>
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   className="flex-1 h-12 text-blue-700 border-blue-300 hover:bg-blue-50"
//                   onClick={handleSaveDraft}
//                   disabled={loading}
//                 >
//                   <Save className="w-5 h-5 mr-2" />
//                   Save Draft
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   className="flex-1 h-12 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   <Sparkles className="w-5 h-5 mr-2" />
//                   {loading ? "Publishing..." : "Publish Article"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreateArticle;



// "use client";
// import { FormEvent, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";
// import { FileText, Tag, Image as LucideImage, Sparkles, Save, Eye } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const CreateArticle = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [featuredImage, setFeaturedImage] = useState<File | null>(null);
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("category", category.trim());
//     formData.append("content", content.trim());
//     if (featuredImage) {
//       formData.append("featuredImage", featuredImage);
//     }

//     try {
//       const res = await fetch("/api/articels", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.issues) {
//           const validationErrors = Object.entries(data.issues)
//             .map(([field, errors]) => `${field}: ${(errors as string[]).join(", ")}`)
//             .join("; ");
//           setError(`Validation errors: ${validationErrors}`);
//         } else {
//           setError(data.error || "Failed to create article");
//         }
//         return;
//       }

//       setTitle("");
//       setCategory("");
//       setContent("");
//       setFeaturedImage(null);

//       const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//       if (fileInput) {
//         fileInput.value = "";
//       }

//       if (data.article?.id) {
//         router.push(`/dashboard`);
//       } else {
//         router.push("/articels");
//       }
//     } catch (err: unknown) {
//       const message = err instanceof Error ? err.message : "Failed to create article";
//       console.error("Failed to create article:", message);
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async () => {
//     setError("Save draft feature is not implemented yet.");
//   };

//   const handlePreview = () => {
//     setError("Preview feature is not implemented yet.");
//   };

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex flex-col">
//       {/* Background Grid Pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

//       {/* Animated Floating Orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       {/* Subtle Animated Particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//         <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
//         <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
//         <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center py-4">
//         {/* HEADER */}
//         <motion.div
//           className="text-center mb-4"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-2 shadow-lg hover:shadow-xl transition-all duration-300">
//             <Sparkles className="w-7 h-7 text-white" />
//           </div>
//           <h1
//             className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1"
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             Craft Your Story
//           </h1>
//           <p
//             className="text-white/90 text-lg font-medium"
//             style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//           >
//             Unleash your creativity and share with the world
//           </p>
//         </motion.div>

//         {/* ERROR MESSAGE */}
//         {error && (
//           <motion.div
//             className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm animate-pulse"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//           >
//             <p
//               className="text-red-300 font-medium"
//               style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//             >
//               {error}
//             </p>
//           </motion.div>
//         )}

//         {/* FORM */}
//         <motion.div
//           className="flex-1"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
//         >
//           <Card className="shadow-2xl border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/95 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01]">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
//               <CardTitle
//                 className="text-xl font-bold flex items-center gap-2"
//                 style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//               >
//                 <FileText className="w-6 h-6" />
//                 Article Details
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-auto">
//               <form className="space-y-3" onSubmit={handleSubmit}>
//                 {/* TITLE */}
//                 <div className="space-y-1">
//                   <Label
//                     htmlFor="title"
//                     className="flex items-center gap-2 text-base font-semibold text-gray-800"
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     Article Title
//                   </Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="Enter an engaging title..."
//                     className="h-9 text-base border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50/50 focus:border-blue-500 focus:ring-0 hover:border-blue-400 transition-all duration-300"
//                     required
//                     disabled={loading}
//                   />
//                 </div>

//                 {/* CATEGORY */}
//                 <div className="space-y-1">
//                   <Label
//                     htmlFor="category"
//                     className="flex items-center gap-2 text-base font-semibold text-gray-800"
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <Tag className="w-5 h-5 text-purple-600 hover:scale-110 transition-transform duration-300" />
//                     Category
//                   </Label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                     disabled={loading}
//                     className="w-full h-9 text-base px-3 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-purple-50/50 focus:border-purple-500 focus:ring-0 hover:border-purple-400 transition-all duration-300 disabled:opacity-50"
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <option value="">Choose a category</option>
//                     <option value="technology">🔧 Technology</option>
//                     <option value="programming">💻 Programming</option>
//                     <option value="web-development">🌐 Web Development</option>
//                     <option value="design">🎨 Design</option>
//                     <option value="productivity">⚡ Productivity</option>
//                     <option value="tutorial">📚 Tutorial</option>
//                   </select>
//                 </div>

//                 {/* IMAGE */}
//                 <div className="space-y-1">
//                   <Label
//                     className="flex items-center gap-2 text-base font-semibold text-gray-800"
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <LucideImage className="w-5 h-5 text-green-600 hover:scale-110 transition-transform duration-300" />
//                     Featured Image (optional)
//                   </Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
//                     disabled={loading}
//                     className="file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:bg-gradient-to-r hover:file:from-blue-700 hover:file:to-purple-700 transition-all duration-300"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="space-y-1">
//                   <Label
//                     className="flex items-center gap-2 text-base font-semibold text-gray-800"
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <FileText className="w-5 h-5 text-indigo-600 hover:scale-110 transition-transform duration-300" />
//                     Article Content
//                   </Label>
//                   <div className={loading ? "opacity-50 pointer-events-none" : ""}>
//                     <ReactQuill
//                       theme="snow"
//                       value={content}
//                       onChange={setContent}
//                       placeholder="Start writing your amazing article here..."
//                       className="min-h-[120px] bg-white rounded-lg border border-gray-200"
//                       modules={{
//                         toolbar: [
//                           [{ header: [1, 2, 3, false] }],
//                           ["bold", "italic", "underline", "strike"],
//                           [{ list: "ordered" }, { list: "bullet" }],
//                           ["blockquote", "code-block"],
//                           ["link", "image"],
//                           ["clean"],
//                         ],
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="flex flex-col sm:flex-row gap-2 pt-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 h-9 border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 rounded-lg text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
//                     onClick={handlePreview}
//                     disabled={loading}
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <Eye className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
//                     Preview
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 h-9 border-2 border-blue-400 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500 rounded-lg text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
//                     onClick={handleSaveDraft}
//                     disabled={loading}
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <Save className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
//                     Save Draft
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="flex-1 h-9 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:transform-none"
//                     disabled={loading}
//                     style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
//                   >
//                     <Sparkles className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
//                     {loading ? "Publishing..." : "Publish Article"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CreateArticle;





"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FileText, Tag, Image as LucideImage, Sparkles, Save, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      const res = await fetch("/api/articels", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues) {
          const validationErrors = Object.entries(data.issues)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(", ")}`)
            .join("; ");
          setError(`Validation errors: ${validationErrors}`);
        } else {
          setError(data.error || "Failed to create article");
        }
        return;
      }

      setTitle("");
      setCategory("");
      setContent("");
      setFeaturedImage(null);

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      if (data.article?.id) {
        router.push(`/dashboard`);
      } else {
        router.push("/articels");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create article";
      console.error("Failed to create article:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setError("Save draft feature is not implemented yet.");
  };

  const handlePreview = () => {
    setError("Preview feature is not implemented yet.");
  };

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
            Craft Your Story
          </h1>
          <p
            className="text-white/90 text-lg font-medium"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
          >
            Unleash your creativity and share with the world
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
                Article Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-auto">
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* TITLE */}
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

                {/* CATEGORY */}
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

                {/* IMAGE */}
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

                {/* CONTENT */}
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
                      placeholder="Start writing your amazing article here..."
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

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-9 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 rounded-lg text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    onClick={handlePreview}
                    disabled={loading}
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <Eye className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
                    Preview
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-9 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-500 rounded-lg text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    onClick={handleSaveDraft}
                    disabled={loading}
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <Save className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-9 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    disabled={loading}
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    <Sparkles className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-300" />
                    {loading ? "Publishing..." : "Publish Article"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CreateArticle;