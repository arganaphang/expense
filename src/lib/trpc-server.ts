import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server/trpc/routers";

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
