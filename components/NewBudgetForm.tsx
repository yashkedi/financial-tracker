"use client";

import createNewBudget from "@/lib/createNewBudget";
import type { Budget } from "@/types/budget";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

// import {TextInput} from 'react-native'; maybe try react native later


export default function NewBudgetForm( {append} : {append: (budget : Budget) => void;}) {

    const [month, setMonth] = useState(''); // set month as a string
    const [totalBudget, setTotalBudget] = useState(0); // set current total budget

    // TODO
    const [categories, setCategories] = useState([]); // set categories: (name, limit)

    return (
        <form
            className={"flex flex-col gap-2"}
            onSubmit={async (e) => {
                e.preventDefault();
                createNewBudget(month, totalBudget, categories)
                    .then((newBudget):void => append(newBudget))
                    .catch((err) => console.error(err))
        }}
        >

            <TextField
                variant={"filled"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '10px'
                }}
                label={"Month"}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            />

            <TextField
                variant={"filled"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '10px'
                }}
                label={"Total Budget"}
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
            />

            <div className={"flex justify-center"}>
                <Button
                    sx={{
                        width: "100px",
                        borderRadius: '10px'
                    }}
                    variant={"contained"}
                    type={"submit"}
                >
                    Submit
                </Button>
            </div>

        </form>
    )
}