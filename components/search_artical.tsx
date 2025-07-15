// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export function SearchInput() {
//   const [searchValue, setSearchValue] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const router = useRouter();

//   const clearSearch = () => {
//     setSearchValue("");
//   };

//   const handleSearch = async () => {
//     if (!searchValue.trim()) return;

//     try {
//       setSearching(true);

//       const res = await fetch(`/api/articels/search?query=${encodeURIComponent(searchValue)}`);
//       const data = await res.json();

//       if (res.ok && data?.id) {
//         router.push(`/articels/${data.id}`);
//       } else {
//         alert(data.error || "Article not found.");
//       }
//     } catch (err) {
//       console.error("Search failed:", err);
//       alert("Something went wrong.");
//     } finally {
//       setSearching(false);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <div className={`
//         relative flex items-center rounded-xl transition-all duration-300 backdrop-blur-sm border
//         ${isFocused 
//           ? 'bg-white/90 border-gray-300 shadow-lg ring-1 ring-gray-200' 
//           : 'bg-white/80 border-gray-200 hover:bg-white/90 hover:border-gray-300'
//         }
//       `}>
//         <Search className="absolute left-3 h-4 w-4 text-gray-500 transition-colors duration-200" />
//         <Input
//           type="text"
//           placeholder="Search articles, topics..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//           className="
//             pl-10 pr-10 py-3 border-0 bg-transparent
//             placeholder:text-gray-400
//             focus-visible:ring-0 focus-visible:ring-offset-0
//             text-gray-800
//             transition-all duration-200
//           "
//         />
//         {searchValue && (
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={clearSearch}
//             className="absolute right-1 h-8 w-8 p-0 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-all duration-200"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         )}
//       </div>

//       {/* Search preview */}
//       {isFocused && searchValue && (
//         <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card/95 backdrop-blur-xl rounded-xl border border-primary/20 shadow-elegant animate-slide-down z-50">
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <Search className="h-4 w-4 text-primary" />
//             <span>Press Enter to search for</span>
//             <span className="font-medium text-foreground bg-primary/10 px-2 py-1 rounded">
//               {searchValue}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      setSearching(true);

      const res = await fetch(`/api/articels/search?query=${encodeURIComponent(searchValue)}`);
      const data = await res.json();

      if (res.ok && data?.id) {
        router.push(`/articels/${data.id}`);
      } else {
        alert(data.error || "Article not found.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("Something went wrong.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`
        relative flex items-center rounded-xl transition-all duration-300 backdrop-blur-sm border
        ${isFocused 
          ? 'bg-white/90 border-gray-300 shadow-lg ring-1 ring-gray-200' 
          : 'bg-white/80 border-gray-200 hover:bg-white/90 hover:border-gray-300'
        }
      `}>
        <Search className={`absolute left-3 h-4 w-4 transition-colors duration-200 ${searching ? 'text-primary animate-pulse' : 'text-gray-500'}`} />
        <Input
          type="text"
          placeholder="Search articles, topics..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={searching}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="
            pl-10 pr-10 py-3 border-0 bg-transparent
            placeholder:text-gray-400
            focus-visible:ring-0 focus-visible:ring-offset-0
            text-gray-800
            transition-all duration-200
          "
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 h-8 w-8 p-0 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search preview */}
      {isFocused && searchValue && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card/95 backdrop-blur-xl rounded-xl border border-primary/20 shadow-elegant animate-slide-down z-50">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4 text-primary" />
            <span>{searching ? "Searching..." : "Press Enter to search for"}</span>
            <span className="font-medium text-foreground bg-primary/10 px-2 py-1 rounded">
              {searchValue}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}