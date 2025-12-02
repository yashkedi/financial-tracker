export type Budget = {
    id: string;
    month: string; // e.g. "2025-11"
    totalBudget: number; // total budget allocated for the month. change this to string?
    categories: { // amount allocated per category
        name: string;
        limit: number;   
    }[];
};