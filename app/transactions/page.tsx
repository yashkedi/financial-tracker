// Created by Yash Kedia
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TransactionsClient from "@/components/TransactionsClient";
import { fetchTransactions } from "@/lib/transactionUtils";


export default async function TransactionsPage() {
 // Server-side fetch so the page renders with data on first paint.
 const transactions = await fetchTransactions().catch((error) => {
   console.error("Failed to load transactions", error);
   return [];
 });


 return (
   <>
     <Header />
     <TransactionsClient initialTransactions={transactions} />
     <Footer/>
   </>
 );
}
