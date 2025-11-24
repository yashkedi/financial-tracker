"use client"
import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: white;
    color: white;
    display: flex;
    flex-direction: row;
    height: 10vh;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    width: 100%;
    position: relative;
    z-index: 10;
    padding-bottom: 6%;
`;

const StyledTitle = styled.h1`
    color: black;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 2vw);
    padding: 1% 0 0 1%;
    font-weight: bold;
`;

const StyledNav = styled.nav`
    color: black;
    margin-left: auto;
    font-size: calc(8px + 1vw);
    padding: 1.5% 2% 0 0;
`;

const StyledUl = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

const StyledLi = styled.li`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    position: relative;
    cursor: pointer;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: green;
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }
`;

const GreenTitle = styled.span`
  color: green;
`;

export default function Header() {
    return (
        <StyledHeader>
            <StyledTitle>Financial<GreenTitle>Tracker</GreenTitle> 🏛️</StyledTitle>

            <StyledNav>
                <StyledUl>
                    <StyledLi>Home</StyledLi>
                    <StyledLi>Budget</StyledLi>
                    <StyledLi>Savings & Goals</StyledLi>
                    <StyledLi>Transactions</StyledLi>
                </StyledUl>
            </StyledNav>            
        </StyledHeader>
    )
}