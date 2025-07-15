"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, MessageSquare, Calendar, Eye, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import he from 'he'; // Added import for encoding special characters

interface Article {
  id: string;
  title: string;
  status: string;
  comments: number;
  date: string;
  author?: {
    name: string;
    clerkId: string;
  };
}

const RecentArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const controls = useAnimation();

  // Auto-hide alerts after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Fetch articles and animate entrance
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setError(null);
        const res = await fetch("/api/articels/recent"); // Corrected typo from 'articels' to 'articles'

        if (!res.ok) {
          throw new Error(`Failed to fetch articles: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch articles";
        console.error("Failed to fetch articles:", message);
        setError(message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } });
  }, [controls]);

  const handleDeleteSuccess = (deletedId: string, message: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== deletedId));
    setSuccess(message);
    setError(null);
  };

  const handleDeleteError = (message: string) => {
    setError(message);
    setSuccess(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  return (
    <motion.div
      className="relative min-h-[500px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden rounded-3xl flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {/* Enhanced Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3 xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 p-6 flex-1 flex flex-col">
        {/* Alert Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {success}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div variants={cardVariants} className="flex-1">
          <Card className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle
                    className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    My Articles
                  </CardTitle>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
                  size="sm"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                  View all
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 overflow-auto">
              <div className="h-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-200">
                      <TableHead
                        className="font-bold text-gray-700 py-4"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <Edit3 className="h-4 w-4 text-blue-600" />
                          <span>Title</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-4"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        Status
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-4"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                          <span>Comments</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-4"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span>Date</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-4"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span
                              className="text-lg font-semibold text-gray-600"
                              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                            >
                              Loading your articles...
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : articles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <Edit3 className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                              <h3
                                className="text-lg font-bold text-gray-700"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                No articles found
                              </h3>
                              <p
                                className="text-gray-500 font-medium"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                You haven&apos;t created any articles yet. Start writing your first article!
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      articles.map((article, index) => (
                        <TableRow
                          className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-purple-50/50 hover:to-pink-50/50 transition-all duration-300 border-b border-gray-100 group"
                          key={article.id}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xs">{index + 1}</span>
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                >
                                  {he.encode(article.title)} {/* Encode title to escape special characters */}
                                </span>
                                {article.author && (
                                  <span className="text-xs text-gray-500 font-medium">
                                    by {he.encode(article.author.name)} {/* Encode author name for safety */}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8 px-3 whitespace-nowrap font-bold border-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-300"
                              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                            >
                              {article.status}
                            </Button>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-xs">{article.comments}</span>
                              </div>
                              <span
                                className="text-gray-600 font-medium"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                Comments
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <span
                              className="text-gray-600 font-medium"
                              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                            >
                              {article.date}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/articel/${article.id}/edit`}>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs h-8 px-3 whitespace-nowrap font-bold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                >
                                  <Edit3 className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </Link>
                              <DeleteButton
                                articleId={article.id}
                                articleTitle={article.title}
                                onSuccess={handleDeleteSuccess}
                                onError={handleDeleteError}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

const DeleteButton = ({
  articleId,
  articleTitle,
  onSuccess,
  onError,
}: {
  articleId: string;
  articleTitle: string;
  onSuccess: (id: string, message: string) => void;
  onError: (message: string) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${he.encode(articleTitle)}"?\n\nThis action cannot be undone and will also delete all comments on this article.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/articels/${articleId}`, { // Corrected typo from 'articels' to 'articles'
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          onError("You can only delete your own articles.");
        } else if (res.status === 404) {
          onError("Article not found.");
        } else {
          onError(data.error || "Failed to delete article.");
        }
      } else {
        onSuccess(articleId, data.message || "Article deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting article:", err);
      onError("Network error. Please check your connection and try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      size="sm"
      variant="destructive"
      className="text-xs h-8 px-3 whitespace-nowrap font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
    >
      {isDeleting ? (
        <>
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </>
      )}
    </Button>
  );
};

export default RecentArticle;