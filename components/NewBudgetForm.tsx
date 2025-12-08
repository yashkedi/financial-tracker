// author: Shepherd Currie
// email: sscurrie@bu.edu

"use client";

import createNewBudget from "@/lib/createNewBudget";
import { useState } from "react";
import styled from "styled-components";

// styled components
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    height: 100%;

    background-color: white;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 5% auto;
    background-color: #f3f3f3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    z-index: 10;
    padding: 5%;
    border-radius: 10px;
`

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: calc(3px + 1vw);
    color: black;
`

const StyledInput = styled.input`
    padding: 5px;
    border-radius: 4px;
    border: 1px solid black;
    margin: 5px;
    background-color: white;
`

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    color: black;
`

const StyledCategories = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 5%;
    border-radius: 5px;
    margin: 10px auto;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
    z-index: 5;
`

const StyledSpan = styled.span`
    color: black;
    font-weight: bold;
    align-self: center;
    font-size: calc(5px + 1vw);
    
`

const StyledP = styled.p`
    color: grey;
    font-size: calc(1px + 1vw);
    align-self: center;
    padding-bottom: 10px;
`

const StyledError = styled.span`
    color: black;
    align-self: center;
    font-size: calc(3px + 1vw);
    padding: 5px;
`

const StyledButton = styled.button`
    padding: 10px;
    border: 1px solid black;
    background-color: white;
    color: black;
    border-radius: 3px;
    cursor: pointer;
    width: 200px;
    margin: 10px auto;

    &:hover {
        background-color: green;
        color: white;
    }

    &:disabled {
        opacity: 0.5;
        background-color: gray;
        color: black;
    }
`

export default function NewBudgetForm() {

    // current month
    const [month, setMonth] = useState(''); // set month as a string

    // total budget
    const [totalBudget, setTotalBudget] = useState(0); // set current total budget

    // categories + limits
    const [categories, setCategory] = useState(
        [
            {
                name: "Groceries", limit: 0
            },
            {
                name: "Travel", limit: 0
            },
            {
                name: "Personal", limit: 0
            },
            {
                name: "Bills", limit: 0
            },
            {
                name: "Other", limit: 0
            },
        ]
    );

    // error handling
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // helper function to update category limits when input
    function updateLimit(i:number, val:number) {
        setCategory((prevLimits) => {
            const newLimits = [...prevLimits];
            newLimits[i].limit = val;
            return newLimits;
        });
    }

    // helper function to check if month is valid format (YYYY-MM)
    function checkMonth(month:string) {
        // use regexp to check if month string is valid (YYYY-MM: (01-12))
        // regexp: https://www.geeksforgeeks.org/javascript/javascript-regexpregular-expression/ 
        const validMonth = /^\d{4}-(0[1-9]|1[0-2])$/;
        return validMonth.test(month);
    }

    // helper function to check if totalBudget is non-neg
    function checkBudget(budget:number) {
        // check if budget >= 0
        return budget >= 0;
    }

    // helper function to check if category limits sum to exactly total budget 
    function checkLimit( categories:{name: string; limit: number;}[] ):boolean {
        // sum each category limit
        const sum = categories.reduce(
            (accumulator: number, category) =>
                (accumulator + category.limit), 0
        );

        // check if sum is less than or equal to totalBudget
        return (sum === totalBudget);
    }

    async function submitNewBudget() {
        setLoading(true);
        setError('');

        try {

            // check if month is correct format
            if(!checkMonth(month)) {
                // set error message and loading to false
                setError("Invalid month format. Please input a valid month (YYYY-MM)!");
                setLoading(false);
                return;
            }

            // check if totalBudget is >= 0
            if(!checkBudget(totalBudget)) {
                // set error message and loading to false
                setError("Invalid total budget. Please input a valid budget!");
                setLoading(false);
                return;
            }

            // check if the limits input are valid (they sum to the totalBudget)
            if (!checkLimit(categories)) {
                // set error message and loading to false
                setError("Invalid category budget limits. The total sum of your allocated budgets does not equal your total budget!")
                setLoading(false);
                return;
            }

            // submit to database
            await createNewBudget(month, totalBudget, categories);

        } catch (err) {
            console.log(err);
            // catch error
            setError("Failed to create new budget. Please try again.")
        } finally {
            // no longer loading
            setLoading(false);
        }

        // clear form inputs after submission
        setMonth('');
        setTotalBudget(0);
        setCategory([
            {
                name: "Groceries", limit: 0
            },
            {
                name: "Travel", limit: 0
            },
            {
                name: "Personal", limit: 0
            },
            {
                name: "Bills", limit: 0
            },
            {
                name: "Other", limit: 0
            },
        ]);
    }

    return (
        <StyledContainer>
            {/* beginning of form */}
            <StyledForm
                onSubmit={async (e) => {
                    e.preventDefault();
                    await submitNewBudget();
                }}
            >
                {/* input for Month (as a string YYYY-MM) */}
                <StyledLabel>
                    Month (YYYY-MM)
                    <StyledInput
                        type={"string"}
                        value={month}
                        onChange={(e)=>setMonth(e.target.value)}
                    />
                </StyledLabel>

                {/* input for Total Budget (in USD) */}
                <StyledLabel>
                    Total Budget (USD)
                    <StyledInput
                    type="number"
                    value={totalBudget}
                    onChange={(e)=>setTotalBudget(Number(e.target.value))}
                    />
                </StyledLabel>

                {/* inputs for all Category Limits */}
                <StyledCategories>
                    <StyledSpan>Categories</StyledSpan>
                    <StyledP>Please input an allocated budget for each category.</StyledP>
                    {categories.map((category, i) => (
                        <StyledRow key={category.name}>
                            <StyledLabel>{category.name}</StyledLabel>
                            <StyledInput
                                type="number"
                                value={category.limit}
                                onChange={(e)=>updateLimit(i, Number(e.target.value))}
                            />
                        </StyledRow>
                        ))}
                </StyledCategories>

                {/* show error if there was an error filling the form (invalid month, totalBudget, or category limits) */}
                {error &&
                    <StyledError>
                        {error}
                    </StyledError>
                }

                {/* submit button (disabled if month or totalbudget not filled, or if still loading) */}
                <StyledButton
                    type="submit"
                    disabled={!month || !totalBudget || loading}
                >
                    Submit Budget
                </StyledButton>

            </StyledForm>

        </StyledContainer>
    )
}