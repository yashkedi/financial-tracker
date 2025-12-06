// Author: Arhan Sheth
// Purpose: Next.js client page that renders the global header and the Add Transaction form at /add

"use client";

import Header from "@/components/Header";
import NewTransactionForm from "@/components/NewTransactionForm";

export default function AddTransactionPage() {
    return (
        <>
            <Header/>
            <NewTransactionForm/>
        </>
    );
}
