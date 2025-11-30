'use client'

import styled from "styled-components";
import Header from "@/components/Header";
import NewTransactionForm from "@/components/NewTransactionForm";

const PageWrapper = styled.div`
    background-color: white;
    min-height: 100vh;
`;

export default function AddTransactionPage() {
    return (
        <PageWrapper>
            <Header/>
            <NewTransactionForm/>
        </PageWrapper>
    );
}
