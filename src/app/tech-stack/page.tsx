"use client";

import { Code2, Database, ShieldCheck, Zap, Server, Globe } from "lucide-react";

export default function TechStackPage() {
  const stack = [
    {
      name: "Next.js 15",
      icon: <Zap size={20} />,
      detail: "App Router & Server Actions",
    },
    {
      name: "TypeScript",
      icon: <Code2 size={20} />,
      detail: "Type-safe API responses",
    },
    {
      name: "Redis / Prisma",
      icon: <Database size={20} />,
      detail: "Persistent bookmarks & Caching",
    },
    {
      name: "Auth.js",
      icon: <ShieldCheck size={20} />,
      detail: "Secure GitHub OAuth Integration",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-4">Engineering Overview</h2>
      <p className="text-muted-foreground mb-12">
        FirstPR was built to showcase full-stack proficiency in handling
        third-party APIs, complex state management, and responsive UI design.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {stack.map((item) => (
          <div
            key={item.name}
            className="p-4 rounded-xl border border-border bg-card flex items-start gap-4"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" /> API Optimization
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To prevent hitting GitHub's rate limits, the app uses a custom
            caching layer. User tech profiles are analyzed once and stored,
            reducing redundant API calls while keeping the "Recommended" feed
            snappy and responsive.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> Interested in the code?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            This project is fully open-source. You can review the architecture,
            API routes, and component design on GitHub.
          </p>
          <a
            href="https://github.com/shakerullah/oss-match"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
          >
            View Repository
          </a>
        </section>
      </div>
    </div>
  );
}
