"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import IssueCard from "@/features/issue/components/issueCard";
import { useRecommendationStore } from "@/features/recommendation/store";
import { getRecommendations } from "@/features/recommendation/fetch";
import { useAuth } from "@/hooks/useAuth";

export default function ForYouPage() {
  const { isAuthLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const { recommendations, isLoading, error } = useRecommendationStore();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.push("/api/auth/signin");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      getRecommendations();
    }
  }, [user]);

  if (isAuthLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Checking...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">
          Generating personalized recommendations...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center text-destructive p-4 text-center">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Recommended for You</h1>
      </div>

      <p className="text-muted-foreground mb-8">
        These issues are curated based on your most used programming languages
        from your GitHub profile.
      </p>

      {recommendations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-xl">
          <Sparkles className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">
            No recommendations found at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
