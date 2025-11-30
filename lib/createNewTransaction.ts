"use server";

import type { TransactionEntry } from '@/types/transaction';

import getCollection, {TRANSACTIONS_COLLECTION} from "@/db";

export default async function createNewTransaction(
    category: string,           // e.g. "groceries"
    amount: number,             // exact transaction amount
    currency: string,           // e.g. "USD", "EUR" just to specify currency
    description?: string,       // if they want to add "Bills" as the category and "Electricity" in the description (can get by without this)
    transactionDate?: Date,
    location?: {
        country?: string;
        city?: string;
    }
): Promise<TransactionEntry> {
    console.log("Creating new transaction...");

    const newTransaction = {
        category:category,
        amount: amount,
        currency:currency,
        description:description,
        transactionDate: transactionDate,
        location: location,
    };

    // insert in DB
    const transactionsCollection = await getCollection(TRANSACTIONS_COLLECTION);
    const res = await transactionsCollection.insertOne({...newTransaction});

    if (!res.acknowledged) {
        throw new Error("DB transaction insert failed...")
    }

    return { ...newTransaction, id: res.insertedId.toHexString() } ; // TODO ?
}
