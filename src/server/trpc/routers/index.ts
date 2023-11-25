import { z } from "zod";
import { procedure, router } from "../trpc";
import { transactionRouter } from "./transaction";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query((opts) => {
      return {
        message: `Hello ${opts.input.message}`,
      };
    }),
  transaction: transactionRouter,
});

export type AppRouter = typeof appRouter;
