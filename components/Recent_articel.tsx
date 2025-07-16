


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
import he from 'he';

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

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setError(null);
        const res = await fetch("/api/articels/recent");
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
      className="relative min-h-[400px] sm:min-h-[500px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden rounded-3xl flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mb-4"
          >
            <Alert className="border-red-200 bg-red-50 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium text-xs sm:text-sm">
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
            className="mb-4"
          >
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="font-medium text-xs sm:text-sm">
                {success}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div variants={cardVariants} className="flex-1">
          <Card className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="h-4  sm:h-5 w-5 text-white" />
                  </div>
                  <CardTitle
                    className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    My Articles
                  </CardTitle>
                </div>
                <Button
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm"
                  size="sm"
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                  aria-label="View all articles"
                >
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-4 flex-1 overflow-auto">
              <div className="h-full">
                <Table className="w-full hidden sm:table">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-200">
                      <TableHead
                        className="font-bold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <Edit3 className="h-3  sm:h-4 w-4 text-blue-600" />
                          <span>Title</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        Status
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-3  sm:h-4 w-4 text-purple-600" />
                          <span>Comments</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3  sm:h-4 w-4 text-indigo-600" />
                          <span>Date</span>
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-bold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm"
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
                            <div className="w-10  sm:w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span
                              className="text-sm sm:text-lg font-semibold text-gray-600"
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
                            <div className="w-12  sm:w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <Edit3 className="h-6  sm:h-8 w-8 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                              <h3
                                className="text-base sm:text-lg font-bold text-gray-700"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                No articles found
                              </h3>
                              <p
                                className="text-sm sm:text-base text-gray-500 font-medium"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                You have not created any articles yet Start writing your first article
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
                          <TableCell className="py-3 sm:py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-6  sm:w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xs">{index + 1}</span>
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-xs sm:text-sm"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                >
                                  {he.encode(article.title)}
                                </span>
                                {article.author && (
                                  <span
                                    className="text-xs text-gray-500 font-medium"
                                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                  >
                                    by {he.encode(article.author.name)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 sm:py-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8 sm:h-9 px-2 sm:px-3 whitespace-nowrap font-bold border-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-300"
                              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              aria-label={`Status: ${article.status}`}
                            >
                              {article.status}
                            </Button>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell py-3 sm:py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-5  sm:w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-xs">{article.comments}</span>
                              </div>
                              <span
                                className="text-gray-600 font-medium text-xs sm:text-sm"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                Comments
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 sm:py-4">
                            <span
                              className="text-gray-600 font-medium text-xs sm:text-sm"
                              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                            >
                              {article.date}
                            </span>
                          </TableCell>
                          <TableCell className="py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/articel/${article.id}/edit`}>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs h-8 sm:h-9 px-2 sm:px-3 whitespace-nowrap font-bold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                  aria-label={`Edit article: ${article.title}`}
                                >
                                  <Edit3 className="h-3  sm:h-4 w-4 mr-1" />
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
                <div className="sm:hidden flex flex-col gap-4 p-4">
                  {loading ? (
                    <div className="flex flex-col items-center space-y-4 bg-white/95 rounded-xl p-6 shadow-lg border border-white/20">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span
                        className="text-sm font-semibold text-gray-600"
                        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                      >
                        Loading your articles...
                      </span>
                    </div>
                  ) : articles.length === 0 ? (
                    <div className="flex flex-col items-center space-y-4 bg-white/95 rounded-xl p-6 shadow-lg border border-white/20">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <Edit3 className="h-7 w-7 text-gray-400" />
                      </div>
                      <div className="space-y-2 text-center">
                        <h3
                          className="text-base font-bold text-gray-700"
                          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                        >
                          No articles found
                        </h3>
                        <p
                          className="text-sm text-gray-500 font-medium"
                          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                        >
                          You have not created any articles yet Start writing your first article
                        </p>
                      </div>
                    </div>
                  ) : (
                    articles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        className="bg-white/95 rounded-xl p-4 shadow-lg border border-white/20 hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-purple-50/50 hover:to-pink-50/50 transition-all duration-300 transform hover:scale-[1.02]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: easeOut, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-xs">{index + 1}</span>
                            </div>
                            <div className="flex flex-col flex-1">
                              <span
                                className="font-semibold text-gray-800 text-sm line-clamp-2"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                {he.encode(article.title)}
                              </span>
                              {article.author && (
                                <span
                                  className="text-xs text-gray-500 font-medium"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                >
                                  by {he.encode(article.author.name)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600">Status:</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-8 px-2 font-bold border-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-300"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                aria-label={`Status: ${article.status}`}
                              >
                                {article.status}
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600">Comments:</span>
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                                  <span className="text-white font-bold text-xs">{article.comments}</span>
                                </div>
                                <span
                                  className="text-gray-600 font-medium"
                                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                >
                                  Comments
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600">Date:</span>
                              <span
                                className="text-gray-600 font-medium"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                              >
                                {article.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/dashboard/articel/${article.id}/edit`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-8 px-3 font-bold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 w-full"
                                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                                aria-label={`Edit article: ${article.title}`}
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
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
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
      const res = await fetch(`/api/articels/${articleId}`, {
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
      className="text-xs h-8 px-3 font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      aria-label={`Delete article: ${articleTitle}`}
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