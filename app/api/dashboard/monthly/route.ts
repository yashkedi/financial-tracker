import getCollection, { TRANSACTIONS_COLLECTION, BUDGET_COLLECTION } from "@/db";
import type { Budget } from "@/types/budget";
import type { TransactionEntry } from "@/types/transaction";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const month = url.searchParams.get("month"); // e.g. "2025-11"

  if (!month) {
    return Response.json({ error: "month param missing" }, { status: 400 });
  }

  const budgets = await getCollection(BUDGET_COLLECTION);
  const transactions = await getCollection(TRANSACTIONS_COLLECTION);

  const budget = await budgets.findOne<Budget>({ month });

  if (!budget) {
    return Response.json({ error: "no budget found" }, { status: 404 });
  }

  const monthTransactions = await transactions
    .find<TransactionEntry>({
      transactionDate: {
        $gte: new Date(`${month}-01`),
        $lte: new Date(`${month}-31`),
      },
    })
    .toArray();

  const totalSpent = monthTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

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

  return Response.json({
    currentMonth: budget.month,
    totalBudget: budget.totalBudget,
    totalSpent,
    remaining: budget.totalBudget - totalSpent,
    categories: categoryTotals,
  });
}
