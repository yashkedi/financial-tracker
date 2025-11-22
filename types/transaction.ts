export type TransactionEntry = {
    id: string;
    userId: string;             // keep only if we are doing a multi-use model
    budgetId?: string;          // period that this transaction belongs to (if we are tracking that)
    category: string;           // e.g. "groceries"
    amount: number;             // exact transaction amount
    currency: string;           // e.g. "USD", "EUR" just to specify currency
    description?: string;       // if they want to add "Bills" as the category and "Electricity" in the description (can get by without this)
    transactionDate: Date;
    location?: {
        country?: string;
        city?: string;
    };                          // added this because why not but I think we can get by without adding this location thing. User can just add that the 'description'
    createdAt?: Date;           // transaction date and entry log date can be different (can do without this as well)
};
