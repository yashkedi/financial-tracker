"use server";

import getCollection, {TRANSACTIONS_COLLECTION} from "@/db";
import {TransactionEntry} from "@/types/transaction";

function isValidAmount(amount: number) {
    return Number.isFinite(amount) && amount > 0;
}

function isValidCurrency(currency: string) {
    return currency.length > 0;
}

export default async function createNewTransaction(data: Omit<TransactionEntry, "id">): Promise<TransactionEntry> {
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

    const entry = {
        category: data.category,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        transactionDate: data.transactionDate ?? new Date(),
        location: data.location ?? {},
    };

    const res = await transactionsCollection.insertOne(entry);
    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return {
        id: res.insertedId.toHexString(),
        ...entry,
    };
}
