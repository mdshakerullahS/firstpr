"use client";

import Sidebar from "@/features/issue/components/sidebar";
import { Loader2, Filter, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SearchIssues = dynamic(
  () => import("@/features/issue/components/searchIssues"),
);

export default function Home() {
  const { isAuthLoading, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.push("api/auth/signin");
  }, [isAuthLoading, isAuthenticated, router]);

  return (
    <div className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border"
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Sidebar Drawer Logic */}
        <aside
          className={`
              fixed inset-0 z-60 lg:z-0 lg:sticky lg:top-24 lg:self-start lg:block lg:h-[calc(100vh-6rem)]
              ${isSidebarOpen ? "block" : "hidden"}
            `}
        >
          {/* Dark Overlay for Mobile */}
          <div
            className="absolute inset-0 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar wrapper / Drawer */}
          <div
            className={`fixed inset-0 z-100 transition-opacity duration-300 lg:static lg:z-auto lg:block ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible lg:visible lg:opacity-100"}`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            <div
              className={`absolute lg:static inset-y-0 left-0 w-[85%] sm:w-100 lg:w-full bg-background lg:bg-transparent border-r border-border lg:border-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} h-full`}
            >
              {/* Sidebar Content */}
              <div className="flex flex-col h-full lg:h-auto">
                {/* Mobile Header - High visibility */}
                <div className="flex items-center justify-between p-6 lg:hidden border-b border-border bg-muted/30">
                  <div>
                    <h2 className="font-bold text-xl">Filters</h2>
                    <p className="text-xs text-muted-foreground">
                      Refine your issue search
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-accent rounded-full transition-colors border border-border"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto lg:overflow-visible">
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Issues Area */}
        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-sm font-medium animate-pulse">
                  Scanning GitHub for issues...
                </p>
              </div>
            }
          >
            <SearchIssues />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
