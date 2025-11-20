"use client"
import styled from "styled-components";

const StyledMain = styled.main`
    background-color: white;
    color: black;
    height: 80vh;
`;

const StyledP = styled.p`
    color: black;
`;

export default function Dashboard() {
    return (
        <StyledMain>
            <StyledP>dashboard will go here.</StyledP>
        </StyledMain>
    )
}