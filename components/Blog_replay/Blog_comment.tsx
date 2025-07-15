"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorEmail: string;
}

interface Props {
  articleId: string;
}

const CommentSection = ({ articleId }: Props) => {
  const { isSignedIn } = useUser();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/articels/comment?articleId=${articleId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load comments");
          return;
        }

        setComments(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch articles';
        console.error('Failed to fetch articles:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  // Handle submit
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/articels/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, articleId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to post comment");
        return;
      }

      // Add new comment to top
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    }  catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch articles';
        console.error('Failed to fetch articles:', message);
        setError(message);
        alert(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form - only for signed-in users */}
      {isSignedIn ? (
        <div className="space-y-2">
          <textarea
            className="w-full border rounded-lg p-2 text-sm"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
          />
          <Button
            onClick={handleSubmit}
            disabled={submitting || !newComment.trim()}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Please sign in to post a comment.
        </p>
      )}

      {/* Comment List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded-lg bg-muted/40"
            >
              <div className="flex items-center justify-between mb-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                    {comment.authorEmail?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs">Commented</span>
                </div>
                <span className="text-xs">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
