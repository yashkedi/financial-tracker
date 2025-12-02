"use client"

import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledMain = styled.main`
    background-color: white;
    color: black;
    height: 100%;
`;
const StyledH1 = styled.h1`
    color: #575656;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 3vw);
    font-weight: bold;
    text-align: center;
    padding-top: 2%;
`;

const StyledP = styled.p`
    color: grey;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-variant: small-caps;
    font-size: calc(4px + 1vw);
    font-weight: bold;
    text-align: center;
`;

const StyledH2 = styled.h2`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 2vw);
    font-weight: bold;
    font-variant: small-caps;
    margin: auto;
    padding-top: 3%;
    color: #575656;
    padding-bottom: 1%;
    text-decoration: underline;
`;

const StyledSpan = styled.span`
  padding-left: 100%;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 50vh;
    margin: auto;
    padding-bottom: 30%;


`;

const StyledLeft = styled.div`
    border: 2px solid black;
    width: 70%;
    height: 50vh;

`;

const StyledRight = styled.div`
    border: 2px solid black;
    width: 30%;
    height: 50vh;
`;

const StyledTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%
`;

const StyledContainer2 = styled.div`
    background-color: green;
`;

const StyledH3 = styled.h3`
    color: white;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    padding: 1% 0 0 2%;
    font-size: calc(4px + 2vw);
    font-weight: bold;
`;

const StyledContainer3 = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
`;

const StyledLeft2 = styled.ul`
    width: 50%;
    list-style-type: none;
    padding-left: 0;
    margin: 2% 0 3% 15%;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 1vw);

    li {
        margin-bottom: 1%;
    }

`;

const StyledRight2 = styled.ul`
    width: 50%;
    list-style-type: none;
    padding-left: 0;
    margin: 2% 0 3% 0;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 1vw);

    li {
        margin-bottom: 1%;
    }
`;

const StyledLink = styled.a`
    color: white;
    text-decoration: none;
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;

    &:hover {
        text-decoration: underline;
        opacity: 0.8;
    }

    &:visited {
        color: #d4d4d4;
    }

`;

export default function Dashboard() {
    const [isMounted, setIsMounted] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <StyledMain>
            <StyledH1>Welcome to your Dashboard, "name"!</StyledH1>
            <StyledP>An all encompassing app to meet your financial needs</StyledP>

            <StyledTitleContainer>
                <StyledH2>Monthly View</StyledH2>
                <StyledH2><StyledSpan>Filter</StyledSpan></StyledH2>
            </StyledTitleContainer>
            
            <StyledContainer>
                <StyledLeft></StyledLeft>
                <StyledRight></StyledRight>
            </StyledContainer>

            <StyledContainer2>
                <StyledH3>Tips & Resources</StyledH3>
                <StyledContainer3>
                    <StyledLeft2>
                        <li>
                            <StyledLink href="https://dfr.oregon.gov/financial/manage/pages/budget.aspx" target="_blank">
                            Oregon Budgeting Guide 
                            </StyledLink>
                        </li>

                        <li>
                            <StyledLink href="https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget" target="_blank">
                            Better Money Habits - Creating a Budget
                            </StyledLink>
                        </li>

                        <li>
                            <StyledLink href="https://srfs.upenn.edu/financial-wellness/browse-topics/budgeting/popular-budgeting-strategies" target="_blank">
                            UPenn Budgeting Strategies
                            </StyledLink>
                        </li>
                    </StyledLeft2>
                    <StyledRight2>
                        <li>
                            <StyledLink href="https://www.ramseysolutions.com/budgeting/the-truth-about-budgeting?srsltid=AfmBOorAizREN3AKSYGzRz31RTKQZ4y6QeMRI0pWQdf3CEQvlnD7Q5aE" target="_blank">
                                The Truth About Budgeting
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink href="https://www.mesacc.edu/financial-aid/financial-literacy/budgeting">
                                Mesa Budgeting Guide
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink href="https://www.unfcu.org/financial-wellness/50-30-20-rule/">
                                Budgeting basics: The 50-30-20 rule
                            </StyledLink>
                        </li>
                    </StyledRight2>
                </StyledContainer3>
            </StyledContainer2>
        </StyledMain>
    )
}