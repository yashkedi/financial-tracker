"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import createNewTransaction from "@/lib/createNewTransaction";
import type {TransactionEntry} from "@/types/transaction";


/*  Styled components start here */

const FormContainer = styled.section`
    width: 60%;
    margin: 3% auto 5%;
    padding: 2%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: white;
`;

const FormTitle = styled.h2`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 2vw);
    font-weight: bold;
    font-variant: small-caps;
    color: #575656;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Label = styled.label`
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 1vw);
    color: #575656;
`;

const Input = styled.input`
    margin-top: 0.25rem;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #c4c4c4;
    font-size: 1rem;
`;

const Select = styled.select`
    margin-top: 0.25rem;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #c4c4c4;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    margin-top: 1.5rem;
    align-self: flex-end;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    border: none;
    background-color: green;
    color: white;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 1vw);
    font-weight: bold;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

const ErrorText = styled.div`
    color: red;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 1vw);
`;

/*  Styled components end here */


type Props = {
    append?: (tx: TransactionEntry) => void;
}; /* Add new transaction entry onto the 'all-transactions' table without reloading */

type FormState = {
    category: string;
    amount: string;
    currency: string;
    description: string;
    transactionDate: string;
    country: string;
    city: string;
};

export default function NewTransactionForm({append}: Props) {

    const [isMounted, setIsMounted] = useState(false);

    const [form, setForm] = useState<FormState>({
        category: "",
        amount: "",
        currency: "USD",
        description: "",
        transactionDate: new Date().toISOString().slice(0, 10),
        country: "",
        city: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const payload: Omit<TransactionEntry, "id"> = {
                category: form.category,
                amount: Number(form.amount),
                currency: form.currency,
                description: form.description || undefined,
                transactionDate: new Date(form.transactionDate),
                location: {
                    country: form.country || undefined,
                    city: form.city || undefined,
                },
            };

            const newTx = await createNewTransaction(payload);
            if (append) append(newTx);
            setForm((prev) => ({
                ...prev,
                amount: "",
                description: "",
                country: "",
                city: "",
            }));
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to create transaction";
            setError(message);
        }

        setIsSubmitting(false);
    }

    return (
        <FormContainer>
            <FormTitle>Add Transaction</FormTitle>
            <StyledForm onSubmit={handleSubmit}>
                <FieldRow>
                    {/* Category dropdown starts here*/}
                    <Label>
                        Category
                        <Select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="groceries">Groceries</option>
                            <option value="travel">Travel</option>
                            <option value="personal">Personal</option>
                            <option value="bills">Bills</option>
                            <option value="other">Other</option>
                        </Select>
                    </Label>

                    {/* Amount textbox starts here*/}
                    <Label>
                        Amount
                        <Input
                            type="number"
                            name="amount"
                            min="0" /* Expense only, no income here */
                            step="0.01" /* Can go even smaller if needed */
                            value={form.amount}
                            onChange={handleChange}
                            required
                        />
                    </Label>

                    {/* Currency dropdown starts here*/}
                    <Label>
                        Currency
                        <Select
                            name="currency"
                            value={form.currency}
                            onChange={handleChange}
                        >
                            <option value="USD">USD</option>
                            {/* have to extend this for more currencies */}
                        </Select>
                    </Label>
                </FieldRow>

                {/* Date calendar select starts here*/}
                <FieldRow>
                    <Label>
                        Date
                        <Input
                            type="date"
                            name="transactionDate"
                            value={form.transactionDate}
                            onChange={handleChange}
                            required
                        />
                    </Label>

                    {/* Location: Country starts here*/}
                    <Label>
                        Country
                        <Input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                        />
                    </Label>

                    {/* Location: City starts here*/}
                    <Label>
                        City
                        <Input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />
                    </Label>
                </FieldRow>

                {/* Description starts here*/}
                <Label>
                    Description
                    <Input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder='e.g. "Electricity bill"'
                    />
                </Label>

                {error && <ErrorText>{error}</ErrorText>}

                <SubmitButton
                    type="submit"
                    disabled={isSubmitting || !form.category || !form.amount}
                >
                    {isSubmitting ? "Saving..." : "Add Transaction"}
                </SubmitButton>
            </StyledForm>
        </FormContainer>
    );
}
