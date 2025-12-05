"use client"

// Created by Valentina


// imports
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
    PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, 
  } from "recharts";
  // how to create pie charts using recharts: https://www.geeksforgeeks.org/reactjs/create-a-pie-chart-using-recharts-in-reactjs/
  // how to create bar charts using recharts: https://www.geeksforgeeks.org/reactjs/create-a-bar-chart-using-recharts-in-reactjs/

// styled components
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
    padding-bottom: 3%;
`;

const StyledH2 = styled.h2`
    font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
    font-size: calc(4px + 2vw);
    font-weight: bold;
    font-variant: small-caps;
    margin: auto;
    color: #575656;
    padding-bottom: 1%;
    text-align: center;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    height: 50vh;
    margin: auto auto auto 18%;
    padding-bottom: 30%;
`;

const StyledLeft = styled.div`
    width: 70%;
    height: 50vh;

`;

const StyledRight = styled.div`
    width: 30%;
    height: 50vh;
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

// export dashboard
export default function Dashboard() {

    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<any>(null); // initialize data

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // fetch monthly budget
    useEffect(() => {

        //convert month to variable for dynamic purposes
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();
        const ym = `${year}-${month}`;

        fetch(`/api/dashboard/monthly?month=${ym}`) // get from api endpoint
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    }, []);

    if (!isMounted) { // if it is not mounted return null
        return null;
    }

    // main component
    return (
        <StyledMain>
            <StyledH1>Welcome to your Dashboard!</StyledH1>
            <StyledP>An all encompassing app to meet your financial needs</StyledP>
            
            {data && (
                <>
                    <StyledH2>
                    {data.currentMonth}
                    </StyledH2>
                    <StyledH2>
                        Monthly Budget: ${data.totalBudget}
                    </StyledH2>

                    <StyledContainer>
                <StyledLeft>
                    {data && (
                        <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Spent", value: data.totalSpent },
                              { name: "Remaining", value: data.remaining }
                            ]}
                            dataKey="value"
                            outerRadius="60%"
                            label
                          >
                            <Cell fill="#ff4444" />
                            <Cell fill="#44aa44" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                </StyledLeft>

                <StyledRight>
                    {data && (
                        <ResponsiveContainer  width="100%" height="90%">
                            <BarChart width={400} height={400} data={data.categories}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="spent" fill="#ff4444" />
                                <Bar dataKey="limit" fill="#4444ff" />
                            </BarChart>
                        </ResponsiveContainer>
                        
                    )}
                </StyledRight>
            </StyledContainer>
                </>
            )}

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