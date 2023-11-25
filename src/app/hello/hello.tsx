"use client";

import { trpcClient } from "@/lib/trpc-client";

export default function Hello() {
  const hello = trpcClient.hello.useQuery({ message: "Expense Tracker" });
  const { data: transactions } = trpcClient.transaction.list.useQuery({});
  return (
    <>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </>
  );
}
