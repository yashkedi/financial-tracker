// Created by Yash Kedia
import getCollection, { TRANSACTIONS_COLLECTION } from "@/db";
import { ObjectId } from "mongodb";
import { cache } from "react";


export type Transaction = {
 id: string;
 category: string;
 description: string;
 amount: number;
 date: string;
 location: string;
};


type TransactionDocument = {
 _id?: ObjectId;
 category?: string;
 amount?: number | string;
 description?: string;
 transactionDate?: Date | string;
 location?: {
   country?: string;
   city?: string;
 };
};


// Normalize a date-ish input into YYYY-MM-DD or empty string if invalid.
const formatDate = (value?: Date | string): string => {
 if (!value) return "";
 const date = value instanceof Date ? value : new Date(value);
 return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};


// Render city/country in a single string, trimming missing parts gracefully.
const formatLocation = (loc?: TransactionDocument["location"]): string => {
 if (!loc) return "";
 const city = loc.city?.trim();
 const country = loc.country?.trim();
 if (city && country) return `${city}, ${country}`;
 return city ?? country ?? "";
};


// Convert a raw Mongo document to the app's Transaction shape, guarding bad data.
const toTransaction = (doc: TransactionDocument): Transaction | null => {
 const id = doc._id?.toString();
 if (!id) return null;
 const amount = typeof doc.amount === "number" ? doc.amount : Number(doc.amount ?? 0);


 return {
   id,
   category: doc.category ?? "Uncategorized",
   description: doc.description ?? "",
   amount: Number.isFinite(amount) ? amount : 0,
   date: formatDate(doc.transactionDate),
   location: formatLocation(doc.location),
 };
};


// Cached server fetch; pulls from Mongo, sorts newest first, and strips invalid docs.
export const fetchTransactions = cache(async (): Promise<Transaction[]> => {
 const collection = await getCollection<TransactionDocument>(TRANSACTIONS_COLLECTION);
 const records = await collection.find({}).sort({ transactionDate: -1 }).toArray();


 return records
   .map(toTransaction)
   .filter((tx): tx is Transaction => Boolean(tx && tx.id));
});
