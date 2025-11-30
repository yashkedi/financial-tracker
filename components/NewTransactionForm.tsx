"use client";

import createNewTransaction from "@/lib/createNewTransaction";
import type { TransactionEntry } from "@/types/transaction";
import { Button, TextField, Input } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";

export default function NewTransactionForm( {append} : {append: (transaction : TransactionEntry) => void;}) {

    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [currency, setCurrency] = useState('');
    const [description, setDescription] = useState('');
    const [transactionDate, setTransactionDate] = useState(Date);

    // TODO location
    const [location, setLocation] = useState([]);

    return (
        <form
            className={"flex flex-col gap-2"}
            onSubmit={async (e) => {
                e.preventDefault();
                createNewTransaction(category, amount, currency, description, transactionDate, location)
                    .then((newTransaction):void => append(newTransaction))
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
                label={"Category"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <TextField
                variant={"filled"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '5px'
                }}
                label={"Amount of transaction"}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <TextField
                variant={"filled"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '5px'
                }}
                label={"Currency"}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />

            <Textarea
                variant={"soft"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '5px',
                    font: "Georgia"
                }}
                placeholder={"Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Input
                type={"date"}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: '5px'
                }}
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
            />

            <div className={"flex justify-center"}>
                <Button
                    sx={{
                        width: "100px",
                        borderRadius: '5px'
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