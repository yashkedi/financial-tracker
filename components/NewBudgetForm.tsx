"use client";

import createNewBudget from "@/lib/createNewBudget";
import type { Budget } from "@/types/budget";
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
                name: "groceries", limit: 0
            },
            {
                name: "travel", limit: 0
            },
            {
                name: "personal", limit: 0
            },
            {
                name: "bills", limit: 0
            },
            {
                name: "other", limit: 0
            },
        ]
    );

    // error handling
    // const [error, setError] = useState('');

    // helper function to update category limits when input
    function updateLimit(i:number, val:number) {
        setCategory((prevLimits) => {
            const newLimits = [...prevLimits];
            newLimits[i].limit = val;
            return newLimits;
        });
    }

    return (
        <StyledContainer>
            {/* beginning of form */}
            <StyledForm
                onSubmit={async (e) => {
                    e.preventDefault();
                    createNewBudget(month, totalBudget, categories)
                        .then((newBudget):void => {
                            console.log("created new budget", newBudget);
                        })
                        .catch((err) => console.error(err))
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

                {/* submit button */}
                <StyledButton
                    type="submit"
                    disabled={!month || !totalBudget}
                >
                    Submit Budget
                </StyledButton>

            </StyledForm>
        </StyledContainer>
    )
}