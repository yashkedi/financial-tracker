// Author: Arhan Sheth
// Purpose: Create and initialize a single MongoDB connection and return typed collections

import {MongoClient, Db, Collection, Document} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

// Ensure the database connection string is configured before starting the app.
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "cs391-budgeting-app";
export const TRANSACTIONS_COLLECTION = "transactions-collection";
export const BUDGET_COLLECTION = "budget-collection";

// Cached MongoDB client and db instances shared across requests.
let client: MongoClient | null = null;
let db: Db | null = null;

// Lazily connects to MongoDB the first time this is called, then reuses the same client
async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

// Return a typed MongoDB collection for the given collection name.
export default async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
    if (!db) {
        db = await connect();
    }
    return db.collection<T>(collectionName);
}
