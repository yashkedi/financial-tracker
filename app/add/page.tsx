"use client";

import Link from "next/link";
import styled from "styled-components";

const StyledHead = styled.h1`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
`

const StyledDiv = styled.main`
    background-color: white;
    color: black;
    height: 100%;
    size: 
`;

export default function AddNew() {

    return (
        <StyledDiv>
            <StyledHead>Add a New Budget or Transaction!</StyledHead>

            <ul>
                <li> <Link href={`/add/budget`}>New Budget</Link> </li>
                <li> <Link href={`/add/transaction`}>New Transaction</Link> </li>
            </ul>
        </StyledDiv>

    )
}