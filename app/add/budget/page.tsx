"use client";

import type { Budget } from "@/types/budget";

import { useState } from "react";
import NewBudgetForm from "@/components/NewBudgetForm";


export default function AddBudget() {

    const [newBudget, setNewBudget] = useState(0);

    return (
        <div className={"flex flex-col items-center"}>
            <NewBudgetForm
                append={
                    (budget: Budget) => {
                        setNewBudget(Number(budget))}
                }
            />
        </div>
    )
}