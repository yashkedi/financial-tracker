"use client";

import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    align-content: center;
    text-align: center;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    padding: 1%;
`

const StyledText = styled.p`
    text-align: center;
    color: black;
`

export default function Footer() {
    const styledLink = 'text-black'

    return (
        <StyledFooter>
            <StyledText>All rights reserved by ... &copy;</StyledText> <Link className={styledLink} href={'/'}>Credits</Link>
        </StyledFooter>
    )
}