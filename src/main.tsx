// src/main.tsx
//
// SPA entry point for Vite.
//
// WHY THIS FILE WAS ADDED:
//   The original project used `@tanstack/react-start` (TanStack Start) which
//   is an SSR framework. Its entry point is `src/start.ts` and `src/server.ts`
//   (for Cloudflare Workers). Vite SPA builds require a `src/main.tsx` that
//   mounts the React app into the DOM — there was no such file.
//
//   Without this, Vite has no JavaScript entry point and the build either
//   fails or produces an empty bundle.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found in index.html");

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
