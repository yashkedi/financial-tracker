"use server";

import type { Budget } from "@/types/budget";

import getCollection, {BUDGET_COLLECTION} from "@/db";

export default async function createNewBudget(
    month:string, // e.g. "2025-11"
    totalBudget:number, // total budget allocated for the month
    categories: { // amount allocated per category
        name: string;
        limit: number; }[]
): Promise<Budget> {
    console.log("Creating new budget");

    const newBudget = {
        month:month,
        totalBudget:totalBudget,
        categories:categories
    };

    // insert in DB
    const budgetCollection = await getCollection(BUDGET_COLLECTION);
    const res = await budgetCollection.insertOne({...newBudget});

    if (!res.acknowledged) {
        throw new Error("DB budget insert failed...")
    }

    return { ...newBudget, id: res.insertedId.toHexString() };
}
