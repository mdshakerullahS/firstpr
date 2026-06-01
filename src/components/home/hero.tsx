"use client";

import { Github, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Glow Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Discover your next contribution
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
          Stop searching. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
            Start contributing.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          FirstPR connects developers with &quot;Good First Issues&quot;
          tailored to their tech stack. Skip the noise and find projects that
          actually need your help.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard/for-you" })
            }
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] w-full sm:w-auto"
          >
            <Github size={20} />
            Sign in with GitHub
          </button>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 bg-card border border-border px-8 py-4 rounded-xl font-bold text-lg hover:bg-muted transition-all w-full sm:w-auto"
          >
            How it works
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};
