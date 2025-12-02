import { MongoClient, Db, Collection, Document } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "cs391-budgeting-app";
export const TRANSACTIONS_COLLECTION = "transactions-collection";
export const BUDGET_COLLECTION = "budget-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection<TSchema extends Document = Document>(collectionName: string): Promise<Collection<TSchema>> {
    if (!db) {
        db = await connect();
    }
    return db.collection<TSchema>(collectionName);
}
