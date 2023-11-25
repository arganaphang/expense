import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/server/db/prisma";
import { Transaction } from "@prisma/client";
import TransactionType from "@/types/transaction-type";
import dayjs from "dayjs";

export const transactionRouter = router({
  list: procedure
    .input(
      z.object({
        page: z.number().positive().default(1),
        per_page: z.number().positive().default(10),
      })
    )
    .query<Transaction[]>(async ({ input }) => {
      const take = input.per_page;
      const skip = (input.page - 1) * input.per_page;
      return await prisma.transaction.findMany({
        skip,
        take,
      });
    }),
  add: procedure
    .input(
      z.object({
        title: z.string(),
        type: z.enum([TransactionType.In, TransactionType.Out]),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      const today = dayjs().startOf("date").toDate(); // ? Get Today with 00:00 Time
      return await prisma.transaction.create({
        data: {
          title: input.title,
          date: today,
          type: input.type,
          amount: input.amount,
        },
      });
    }),
  updateByID: procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.date(),
        type: z.enum([TransactionType.In, TransactionType.Out]),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.transaction.update({
        where: { id: input.id },
        data: {
          title: input.title,
          date: input.date,
          type: input.type,
          amount: input.amount,
        },
      });
    }),
  deleteByIDs: procedure.input(z.string()).query(async ({ input: id }) => {
    return prisma.transaction.delete({ where: { id } });
  }),
});
