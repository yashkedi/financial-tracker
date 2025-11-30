"use client";

import type { TransactionEntry } from "@/types/transaction";

import { useState } from "react";
import NewTransactionForm from "@/components/NewTransactionForm";

export default function AddTransaction({ prevTransactions }: { prevTransactions: TransactionEntry[]; }) {

    // TODO: Show all previous transactions ?

    const [transactions, setTransactions] = useState(prevTransactions);

    return (
        <div className={"flex flex-col items-center"}>
             <NewTransactionForm
                 append={
                    (transaction: TransactionEntry) => {
                        setTransactions([...transactions, transaction]);
                    }
                 }
             />
        </div>
    )
}