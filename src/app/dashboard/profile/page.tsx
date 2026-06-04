"use client";

import { User, Star, GitFork, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfileStore } from "@/features/profile/store";
import { getProfile } from "@/features/profile/fetch";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { isAuthLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const { topLanguages, recentRepos, loading, error } = useProfileStore();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.push("/api/auth/signin");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) getProfile();
  }, [user]);

  if (isAuthLoading || loading) {
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
      <div className="flex items-center gap-4">
        {user?.image ? (
          <Image
            src={user.image}
            width={64}
            height={64}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User size={32} />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Top Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Recent Repositories
        </h2>
        {recentRepos.length === 0 ? (
          <p className="text-muted-foreground">No recent repositories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentRepos.map((repo) => (
              <Link
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold text-lg truncate mb-2 text-foreground">
                  {repo.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
