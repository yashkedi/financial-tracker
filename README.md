# FinancialTracker

FinancialTracker is a full‑stack budgeting web application that helps users set a monthly budget, track expenses by category, and export their transaction history. It is built with Next.js (App Router), TypeScript, MongoDB, and styled‑components.

## Team

FinancialTracker was created by:

- Arhan Sheth
- Shepherd Currie
- Valentina Mora
- Yash Kedia

and for:
BU CAS CS391 Final Project under the guidance of Professor Taymaz Davoodi

## Tech Stack

- **Frontend / Routing**: Next.js (App Router), React, TypeScript
- **Styling**: styled-components
- **Database**: MongoDB (Node.js driver)
- **Data Visualization**: Recharts for pie and bar charts (dashboard)
- **CSV Export**: Server‑side CSV generation from MongoDB transactions

## Project Structure (High Level)

- `app/`
    - `layout.tsx`: Global layout and header
    - `page.tsx`: Home / Dashboard page
    - `budget/page.tsx`: Budget setup page
    - `transactions/page.tsx`: Transactions table and CSV export
    - `add/page.tsx`: Add Transaction form page
    - `credits/page.tsx`: Credits page listing team members
- `components/`
    - `Header.tsx`: Top navigation bar (Home, Budget, Transactions)
    - `Dashboard.tsx`: Dashboard content (charts, summary, tips)
    - `Footer.tsx`: House the credits
    - `BudgetForm.tsx`: Form for entering total monthly budget and category budgets
    - `TransactionsTable.tsx`: Filterable/searchable transactions table with CSV export
    - `NewTransactionForm.tsx`: Client-side form for adding a new transaction
- `lib/`
    - `createNewTransaction.ts`: Server action to insert a transaction into MongoDB
    - `createNewBudget.ts`: Server action to insert a new budget into MongoDB
    - `exportCsv.ts`: Covert transactions table into a csv
    - `transactionUtils.ts`: Normalize, render, trim, and guard data from Mongo onto the transactions table page
- `db.ts`: MongoDB connection helper (DB, typed collections)
- `types/`
  - `transaction.ts`: Shared `TransactionEntry` TypeScript type
  - `budget.ts`: Shared `Budget` TypeScript type

## Environment Variables

Create a `.env.local` file in the project root with the following variable:
- `MONGO_URI`: 

