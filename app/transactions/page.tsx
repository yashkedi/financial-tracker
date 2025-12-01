"use client";

import Header from "@/components/Header";
import exportCsv from "@/lib/exportCsv";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
};

const mockTransactions: Transaction[] = [
  { id: "1", date: "2024-11-20", description: "Groceries - Market", category: "Food", amount: 82.45 },
  { id: "2", date: "2024-11-18", description: "Rent", category: "Housing", amount: 1200 },
  { id: "3", date: "2024-11-16", description: "Gym Membership", category: "Health", amount: 45 },
  { id: "4", date: "2024-11-15", description: "Coffee with friends", category: "Dining", amount: 18.75 },
  { id: "5", date: "2024-11-14", description: "Monthly Metro", category: "Transport", amount: 96 },
  { id: "6", date: "2024-11-13", description: "Utilities - Electric", category: "Bills", amount: 110.5 },
  { id: "7", date: "2024-11-12", description: "Streaming Subscription", category: "Entertainment", amount: 14.99 },
  { id: "8", date: "2024-11-11", description: "Dinner Out", category: "Dining", amount: 56.2 },
  { id: "9", date: "2024-11-10", description: "Pharmacy", category: "Health", amount: 23.4 },
  { id: "10", date: "2024-11-09", description: "Fuel", category: "Transport", amount: 64.3 },
  { id: "11", date: "2024-11-08", description: "Books", category: "Education", amount: 32.0 },
  { id: "12", date: "2024-11-07", description: "Coffee Beans", category: "Food", amount: 15.75 },
];

const Page = styled.main`
  background: #f7f8fa;
  padding: 2% 4% 3%;
  color: #111827;
  font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
`;

const Title = styled.h1`
  margin: 0 0 2% 0;
  font-size: calc(14px + 2vw);
  font-weight: 700;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 58% 22% 14%;
  gap: 2%;
  margin-bottom: 2%;

  @media (max-width: 750px) {
    grid-template-columns: 100%;
  }
`;

const ExportButton = styled.button`
  border: 1px solid #0f5132;
  padding: 1% 2.5%;
  background: #0f5132;
  font-size: calc(9px + 0.2vw);
  color: #fff;
  cursor: pointer;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 2%;
  padding: 2% 3%;
  font-size: calc(10px + 0.5vw);
  background: #fff;
  width: 100%;
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 2%;
  padding: 2% 3%;
  font-size: calc(10px + 0.5vw);
  background: #fff;
  width: 100%;
`;

const TableWrapper = styled.section`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 3%;
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

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setTransactions(mockTransactions);
    setCategories(Array.from(new Set(mockTransactions.map((tx) => tx.category))));
    setFiltered(mockTransactions);
  }, []);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    const next = transactions.filter((tx) => {
      const matchesSearch =
        !term ||
        tx.description.toLowerCase().includes(term) ||
        tx.category.toLowerCase().includes(term);
      const matchesCategory = category === "all" || tx.category === category;
      return matchesSearch && matchesCategory;
    });
    setFiltered(next);
  }, [transactions, search, category]);

  const visible = filtered.slice(0, 10);

  return (
    <>
      <Header />
      <Page>
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
        </Controls>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Amount</Th>
              </tr>
            </TableHead>
            <tbody>
              {visible.map((tx) => (
                <Tr key={tx.id}>
                  <Td>
                    <DateText>{tx.date}</DateText>
                  </Td>
                  <Td>{tx.description}</Td>
                  <Td>{tx.category}</Td>
                  <Td>
                    <Amount>{formatCurrency(tx.amount)}</Amount>
                  </Td>
                </Tr>
              ))}
              {!filtered.length && (
                <Tr>
                  <Td colSpan={4}>No transactions match your filters.</Td>
                </Tr>
              )}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Page>
    </>
  );
}
