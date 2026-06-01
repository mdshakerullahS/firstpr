"use client";

import Link from "next/link";
import { Github, Globe, Mail, Code2, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Column 1: Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded text-primary-foreground shadow-sm">
                <Github size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight">FirstPR</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A full-stack portfolio project designed to help developers find
              their first open-source contribution.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">
              <span>Next.js 15</span>
              <span>•</span>
              <span>Tailwind</span>
              <span>•</span>
              <span>TypeScript</span>
            </div>
          </div>

          {/* Column 2: The Project (Code & Specs) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
              Project
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/mdshakerullahS/firstpr"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <Code2 size={14} />
                  Source Code
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/tech-stack"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Technical Case Study
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Developer */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
              Developer
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://shakerullah.vercel.app"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Globe size={14} /> Portfolio Website
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:sourovmdshakerullah@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail size={14} /> Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/mdshakerullahS"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github size={14} /> GitHub Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} FirstPR. Built by{" "}
            <span className="text-foreground font-medium">Shakerullah</span>.
          </p>
          <p className="text-[10px] text-muted-foreground/40 italic">
            This project is for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
