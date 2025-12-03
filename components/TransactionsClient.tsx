"use client";

import exportCsv from "@/lib/exportCsv";
import type { Transaction } from "@/lib/transactionUtils";
import Link from "next/link";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";


type Props = {
 initialTransactions: Transaction[];
};


const Page = styled.main`
 background: #f7f8fa;
 padding: 2% 4% 3%;
 color: #111827;
 font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
`;


const Content = styled.section`
 width: 100%;
 max-width: 96%;
 margin: 0 auto;
 display: flex;
 flex-direction: column;
 gap: 2%;
`;


const Title = styled.h1`
 margin: 0 0 2% 0;
 font-size: calc(14px + 2vw);
 font-weight: 700;
`;


const Controls = styled.div`
 display: grid;
 grid-template-columns: 46% 17% 17% 17%;
 gap: 1%;
 align-items: stretch;
 margin-bottom: 3%;


 @media (max-width: 750px) {
   grid-template-columns: 100%;
 }
`;


const buttonStyles = css`
  border: 1px solid #0f5132;
  padding: 2.5% 3%;
  background: #0f5132;
  font-size: calc(12px + 0.7vw);
  color: #fff;
  cursor: pointer;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 750px) {
    padding: 3% 3.5%;
  }
`;

const ButtonBase = styled.button`
  ${buttonStyles}
`;


const ExportButton = styled(ButtonBase)``;

const AddButton = styled(Link)`
  ${buttonStyles}
  background: #14532d;
  border-color: #14532d;
  text-decoration: none;
`;


const Input = styled.input`
 border: 1px solid #d1d5db;
 border-radius: 2%;
 padding: 2.5% 3%;
 font-size: calc(12px + 0.2vw);
 background: #fff;
 width: 100%;


 @media (max-width: 750px) {
   padding: 3% 3.5%;
 }
`;


const Select = styled.select`
 border: 1px solid #d1d5db;
 border-radius: 2%;
 padding: 2.5% 3%;
 font-size: calc(12px + 0.2vw);
 background: #fff;
 width: 100%;


 @media (max-width: 750px) {
   padding: 3% 3.5%;
 }
`;


const TableWrapper = styled.section`
 background: #fff;
 border: 1px solid #e5e7eb;
 box-shadow: 0 2% 6% rgba(0, 0, 0, 0.05);
 overflow: hidden;
`;


const StyledTable = styled.table`
 width: 100%;
 border-collapse: collapse;
 font-size: calc(10px + 0.6vw);
`;


const TableHead = styled.thead`
 background: #f3f4f6;
 color: #4b5563;
 text-transform: uppercase;
 letter-spacing: calc(0px + 0.05vw);
`;


const Th = styled.th`
 text-align: left;
 padding: 2% 2%;
 font-weight: 600;
`;


const Tr = styled.tr`
 &:nth-child(even) {
   background: #fafafa;
 }
`;


const Td = styled.td`
 padding: 2% 2%;
 border-top: 1px solid #edf0f3;
`;


const DateText = styled.span`
 font-family: "Helvetica Neue", Arial, sans-serif;
 font-variant-numeric: tabular-nums;
`;


const Amount = styled.span`
 font-weight: 600;
 color: #0f5132;
 font-family: "Helvetica Neue", Arial, sans-serif;
 font-variant-numeric: tabular-nums;
`;


const formatCurrency = (value: number) => `$${value.toFixed(2)}`;


export default function TransactionsClient({ initialTransactions }: Props) {
 const [search, setSearch] = useState("");
 const [category, setCategory] = useState("all");


 const categories = useMemo(
   () => Array.from(new Set(initialTransactions.map((tx) => tx.category))).filter(Boolean),
   [initialTransactions]
 );


 const filtered = useMemo(() => {
   const term = search.trim().toLowerCase();
   return initialTransactions.filter((tx) => {
     const matchesSearch =
       !term ||
       tx.description.toLowerCase().includes(term) ||
       tx.category.toLowerCase().includes(term) ||
       tx.location.toLowerCase().includes(term);
     const matchesCategory = category === "all" || tx.category === category;
     return matchesSearch && matchesCategory;
   });
 }, [initialTransactions, search, category]);


 const visible = filtered.slice(0, 10);


 return (
   <Page>
     <Content>
       <Title>Transactions</Title>


       <Controls>
         <Input
           type="search"
           placeholder="Search description or category..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
         <Select value={category} onChange={(e) => setCategory(e.target.value)}>
           <option value="all">All categories</option>
           {categories.map((cat) => (
             <option key={cat} value={cat}>
               {cat}
             </option>
           ))}
         </Select>
         <ExportButton onClick={() => exportCsv("transactions.csv", filtered)}>
           Export CSV
         </ExportButton>
         <AddButton href="/add">Add transaction</AddButton>
       </Controls>


       <TableWrapper>
         <StyledTable>
           <TableHead>
             <tr>
               <Th>Date</Th>
               <Th>Description</Th>
               <Th>Category</Th>
               <Th>Location</Th>
               <Th>Amount</Th>
             </tr>
           </TableHead>
           <tbody>
             {visible.map((tx) => (
               <Tr key={tx.id}>
                 <Td>
                   <DateText>{tx.date || "—"}</DateText>
                 </Td>
                 <Td>{tx.description || "—"}</Td>
                 <Td>{tx.category}</Td>
                 <Td>{tx.location || "—"}</Td>
                 <Td>
                   <Amount>{formatCurrency(tx.amount)}</Amount>
                 </Td>
               </Tr>
             ))}
             {!filtered.length && (
               <Tr>
                 <Td colSpan={5}>No transactions match your filters.</Td>
               </Tr>
             )}
           </tbody>
         </StyledTable>
       </TableWrapper>
     </Content>
   </Page>
 );
}
