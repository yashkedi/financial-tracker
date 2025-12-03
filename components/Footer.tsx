"use client";

import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    text-align: left;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    padding: 1%;
`

const StyledText = styled.p`
    text-align: left;
    color: black;
    font-size: calc(3px + 1vw);
`

const StyledLink = styled(Link)`
    color:green;
    text-decoration: none;
    font-size: calc(3px + 1vw);
`

export default function Footer() {
    const styledLink = 'text-black'

    return (
        <StyledFooter>
            <StyledText>All rights reserved by FinancialTracker&copy;</StyledText> <StyledLink className={styledLink} href={'/credits'}>Credits</StyledLink>
        </StyledFooter>
    )
}