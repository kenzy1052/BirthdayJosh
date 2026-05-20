// vite.config.ts — Netlify static SPA build
//
// WHY THIS FILE CHANGED:
//
// The original config used `@lovable.dev/vite-tanstack-config` which wraps
// `@tanstack/react-start` (TanStack Start) together with `@cloudflare/vite-plugin`.
// That combo is an SSR / Cloudflare Workers build. Its output goes to
// `.output/public` — a directory Cloudflare Workers expects, not Netlify.
//
// Netlify is a static CDN. It cannot run Cloudflare Workers or any Node SSR.
// When `npm run build` ran on Netlify, the Cloudflare plugin produced no
// `.output/public` folder and Netlify failed with:
//   "Deploy directory '.output/public' does not exist"
//
// FIX — drop the Cloudflare/SSR layer entirely and build a plain Vite SPA:
//   - Use `@vitejs/plugin-react` instead of the tanstack-start wrapper.
//   - Use `@tanstack/router-plugin/vite` for file-based routing (it pre-builds
//     the routeTree so imports still resolve correctly).
//   - Output goes to `dist/` — the standard Vite SPA directory.
//   - Netlify serves `dist/` and rewrites all paths to `index.html` so
//     TanStack Router handles client-side navigation (set in netlify.toml).
//
// NOTE: TanStack Start SSR-specific APIs (`createStart`, `Scripts`,
// `HeadContent`, etc.) are already used in the app.  In SPA mode those APIs
// still work — TanStack Router's SPA mode renders them client-side.
// The one change is that `appCss?url` in __root.tsx is replaced with a
// normal CSS import (see __root.tsx).

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // 1. Generate routeTree.gen.ts from src/routes/** before React sees it.
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    // 2. React fast-refresh + JSX transform.
    react(),
    // 3. Tailwind v4 via Vite plugin (replaces PostCSS).
    tailwindcss(),
    // 4. Resolve the `@/*` alias from tsconfig.json.
    tsconfigPaths(),
  ],
  build: {
    // Standard Vite SPA output — netlify.toml publish = "dist"
    outDir: "dist",
    rollupOptions: {
      external: [],
    },
  },
});
