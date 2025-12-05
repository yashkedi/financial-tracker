// Created by Valentina

// imports

import getCollection, { TRANSACTIONS_COLLECTION, BUDGET_COLLECTION } from "@/db";
import type { Budget } from "@/types/budget";
import type { TransactionEntry } from "@/types/transaction";

// GET endpoint
export async function GET(req: Request) {
  const url = new URL(req.url);
  const month = url.searchParams.get("month"); // e.g. "2025-11"

  if (!month) { // if we do not have a month for the budget
    return Response.json({ error: "month param missing" }, { status: 400 });
  }

  const budgets = await getCollection(BUDGET_COLLECTION); // get budget collection
  const transactions = await getCollection(TRANSACTIONS_COLLECTION); // get transactions collection

  const budget = await budgets.findOne<Budget>({ month }); //get the specific budget for the month

  if (!budget) { // if we couldn't find the budget
    return Response.json({ error: "no budget found" }, { status: 404 });
  }

  // get all the transactions within month timeframe and convert to array
  const monthTransactions = await transactions
    .find<TransactionEntry>({
      transactionDate: {
        $gte: new Date(`${month}-01`),
        $lte: new Date(`${month}-31`),
      },
    })
    .toArray();

  // calculate the total spent
  const totalSpent = monthTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  // for each category calculate how much has been spent
  const categoryTotals = budget.categories.map((cat) => {
    const spent = monthTransactions
      .filter((t) => t.category === cat.name)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: cat.name,
      limit: cat.limit,
      spent,
    };
  });

  // return info for display purposes
  return Response.json({
    currentMonth: budget.month,
    totalBudget: budget.totalBudget,
    totalSpent,
    remaining: budget.totalBudget - totalSpent,
    categories: categoryTotals,
  });
}
