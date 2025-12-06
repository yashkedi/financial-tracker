// Author: Arhan Sheth
// Purpose: Server action that validates and inserts a new transaction into MongoDB,
//          returning a plain TransactionEntry object safe to send to client components

"use server";

import getCollection, {TRANSACTIONS_COLLECTION} from "@/db";
import type {TransactionEntry} from "@/types/transaction";

// Guard against invalid or negative amounts
function isValidAmount(amount: number) {
    return Number.isFinite(amount) && amount > 0;
}

// Basic currency validation
function isValidCurrency(currency: string) {
    return currency.length > 0;
}

// Insert a new transaction document and return a serialized TransactionEntry
export default async function createNewTransaction(data: Omit<TransactionEntry, "id">): Promise<TransactionEntry> {
    // Required-field validation
    if (!data.category) {
        throw new Error("Category is required");
    }
    if (!isValidAmount(data.amount)) {
        throw new Error("Amount must be a positive number");
    }
    if (!isValidCurrency(data.currency)) {
        throw new Error("Currency is required");
    }

    const transactionsCollection = await getCollection(TRANSACTIONS_COLLECTION);

    // Shape of the document as stored in MongoDB
    const entry = {
        category: data.category,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        transactionDate: data.transactionDate ?? new Date(),
        location: data.location ?? {},
    };

    // Insert into MongoDB and ensure the write succeeded
    const res = await transactionsCollection.insertOne(entry);
    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    // Convert MongoDB ObjectId into a string id for client components
    const result: TransactionEntry = {
        id: res.insertedId.toHexString(),
        category: entry.category,
        amount: entry.amount,
        currency: entry.currency,
        description: entry.description,
        transactionDate: entry.transactionDate,
        location: entry.location,
    };

    return result;
}
