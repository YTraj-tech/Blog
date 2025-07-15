"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorEmail: string;
}

interface Props {
  articleId: string;
}

const Commentlist = ({ articleId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading comments...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border rounded-lg bg-muted/40"
          >
            <div className="flex items-center justify-between mb-1 text-sm text-muted-foreground">
              <span className="font-semibold">{comment.authorEmail}</span>
              <span className="text-xs">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-800">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Commentlist;
