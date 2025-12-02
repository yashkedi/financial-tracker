"use client";

import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    height: 100vh;
    background-color: white;
    padding: 5%;
`

const StyledHead = styled.h1`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(8px + 1vw);
    color: black;
    font-weight: bold;
`

const StyledText = styled.p`
    font-family: "Cormorant Garamond", "Georgia", serif;
    font-size: calc(6px + 1vw);
    color: black;
`

const StyledCredits = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    z-index: 10;
    padding: 5%;
    border-radius: 10px;
`

const StyledUl = styled.ul`
    display: block;
    font-family: "Cormorant Garamond", "Georgia", serif;
    font-size: calc(5px + 1vw);
    color: green;
    text-align: center;
    padding: 10px;
`

const StyledLi = styled.li`
    position: relative;
    cursor: auto;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background-color: green;
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }
`


export default function CreditPage() {
    return (
        <>
            <Header/>

            <StyledContainer>
                <StyledCredits>
                <StyledHead>Credits</StyledHead>
                <StyledText>FinancialTracker was created by</StyledText>
                <StyledUl>
                    <StyledLi>
                        Arhan Sheth
                    </StyledLi>
                    <StyledLi>
                        Shepherd Currie
                    </StyledLi>
                    <StyledLi>
                        Valentina Mora
                    </StyledLi>
                    <StyledLi>
                        Yash Kedia
                    </StyledLi>

                </StyledUl>
                </StyledCredits>
            </StyledContainer>

            <Footer />
        </>
    )
}