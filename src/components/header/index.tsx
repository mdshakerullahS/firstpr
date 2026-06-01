"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import ThemeSwitcher from "./themeSwitcher";
import UserMenu from "./userMenu";
import MobileMenu from "./mobileMenu";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded text-primary-foreground shadow-md">
            <Github size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden lg:block">
            FirstPR
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <UserMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
