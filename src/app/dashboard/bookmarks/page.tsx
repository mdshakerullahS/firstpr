"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, AlertCircle, Bookmark } from "lucide-react";
import BookmarkCard from "@/features/bookmark/components/bookmarkCard";
import { useBookmarkStore } from "@/features/bookmark/store";
import { getBookmarks } from "@/features/bookmark/fetch";
import { useAuth } from "@/hooks/useAuth";

export default function BookmarksPage() {
  const { isAuthLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const { bookmarks, isLoading, error } = useBookmarkStore();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.push("/api/auth/signin");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) getBookmarks();
  }, [user]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center text-destructive">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <Bookmark size={24} />
        <h1 className="text-2xl font-bold">Bookmarks</h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-xl">
          <Bookmark className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">No bookmarks saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}
