import Header from "@/components/Header";
import TransactionsClient from "@/components/TransactionsClient";
import { fetchTransactions } from "@/lib/transactionUtils";

export default async function TransactionsPage() {
  const transactions = await fetchTransactions().catch((error) => {
    console.error("Failed to load transactions", error);
    return [];
  });

  return (
    <>
      <Header />
      <TransactionsClient initialTransactions={transactions} />
    </>
  );
}
