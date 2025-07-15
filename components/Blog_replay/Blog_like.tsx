// "use client";

// import { useEffect, useState } from "react";
// import { ThumbsUp, Share2, Bookmark } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Props {
//   articleId: string;
// }

// const Bloglike = ({ articleId }: Props) => {
//   const [liked, setLiked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch current like status
//   useEffect(() => {
//     const fetchLikeStatus = async () => {
//       try {
//         const res = await fetch(`/api/articels/like/status?articleId=${articleId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setLiked(data.liked);
//         }
//       } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : 'Failed to fetch articles';
//         console.error('Failed to fetch articles:', message);
//       }
//     };

//     fetchLikeStatus();
//   }, [articleId]);

//   // Optimistic like handler
//   const handleLike = async () => {
//     if (loading) return;
//     const previousLiked = liked;
//     setLiked(!liked); // Optimistically update UI
//     setLoading(true);

//     try {
//       const res = await fetch("/api/articels/like", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleId }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setLiked(previousLiked); // revert if error
//         throw new Error(data.error || "Failed to toggle like");
//       }

//       // ✅ Server returns correct status, do nothing — UI already updated
//     } catch (err) {
//       console.error("Like toggle failed:", err);
//       alert("❌ Failed to update like. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       alert("🔗 Link copied to clipboard!");
//     } catch {
//       alert("❌ Failed to copy link.");
//     }
//   };

//   return (
//     <div className="flex gap-4 items-center p-4 rounded-xl bg-muted border justify-center sm:justify-start">
//       <Button
//         variant={liked ? "default" : "outline"}
//         onClick={handleLike}
//         disabled={loading}
//         className="flex items-center gap-2"
//       >
//         <ThumbsUp size={18} />
//         {liked ? "Liked" : "Like"}
//       </Button>

//       <Button
//         variant="outline"
//         onClick={handleShare}
//         className="flex items-center gap-2"
//       >
//         <Share2 size={18} />
//         Share
//       </Button>

//       <Button variant="outline" disabled className="flex items-center gap-2">
//         <Bookmark size={18} />
//         Save (Coming Soon)
//       </Button>
//     </div>
//   );
// };

// export default Bloglike;


"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  articleId: string;
}

const Bloglike = ({ articleId }: Props) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch current like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(`/api/articels/like/status?articleId=${articleId}`);
        const data = await res.json();
        if (res.ok) {
          setLiked(data.liked);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch like status';
        console.error('Failed to fetch like status:', message);
      }
    };

    fetchLikeStatus();
  }, [articleId]);

  // Optimistic like handler
  const handleLike = async () => {
    if (loading) return;
    const previousLiked = liked;
    setLiked(!liked); // Optimistically update UI
    setLoading(true);

    try {
      const res = await fetch("/api/articels/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLiked(previousLiked); // revert if error
        throw new Error(data.error || "Failed to toggle like");
      }

      // ✅ Server returns correct status, do nothing — UI already updated
    } catch (err) {
      console.error("Like toggle failed:", err);
      alert("❌ Failed to update like. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("🔗 Link copied to clipboard!");
    } catch {
      alert("❌ Failed to copy link.");
    }
  };

  return (
    <div className="flex gap-4 items-center p-4 rounded-xl bg-muted border justify-center sm:justify-start">
      <Button
        variant={liked ? "default" : "outline"}
        onClick={handleLike}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <ThumbsUp size={18} />
        {liked ? "Liked" : "Like"}
      </Button>

      <Button
        variant="outline"
        onClick={handleShare}
        className="flex items-center gap-2"
      >
        <Share2 size={18} />
        Share
      </Button>

      <Button variant="outline" disabled className="flex items-center gap-2">
        <Bookmark size={18} />
        Save (Coming Soon)
      </Button>
    </div>
  );
};

export default Bloglike;
