// src/router.tsx
//
// WHY THIS FILE CHANGED:
//   `scrollRestoration: true` is a TanStack Start (SSR) option. It tells the
//   server to embed scroll position into streamed HTML. In SPA mode with plain
//   @tanstack/react-router it is not a recognised option and will cause a
//   TypeScript error (and may throw at runtime). Removed.
//
//   Everything else is unchanged.

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
