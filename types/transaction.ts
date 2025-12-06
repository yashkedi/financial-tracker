// Author: Arhan Sheth
// Purpose: Shared TypeScript type describing a single transaction record stored in MongoDB

export type TransactionEntry = {
    id: string;                 // Application-level string id (MongoDB ObjectId as hex string)
    category: string;           // High-level category e.g. "groceries", "travel", etc.
    amount: number;             // exact transaction amount as a positive number
    currency: string;           // e.g. "USD", "EUR" just to specify currency
    description?: string;       // if they want to add "Bills" as the category and "Electricity" in the description
    transactionDate: Date;      // date of transaction occurrence
    location?: {                // optional object for transaction location
        country?: string;
        city?: string;
    };
};
