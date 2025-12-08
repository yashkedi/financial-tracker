// author: Shepherd Currie
// email: sscurrie@bu.edu

"use server";

import type { Budget } from "@/types/budget";

import getCollection, {BUDGET_COLLECTION} from "@/db";

export default async function createNewBudget(
    month:string,
    totalBudget:number,
    categories: { // amount allocated per category
        name: string;
        limit: number; }[]
): Promise<Budget> {
    console.log("Creating new budget!");

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

    console.log("Successfully inserted in DB!");
    return { ...newBudget, id: res.insertedId.toHexString() };
}
