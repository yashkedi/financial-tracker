// author: Shepherd Currie
// email: sscurrie@bu.edu

"use client";

import Header from "@/components/Header";
import NewBudgetForm from "@/components/NewBudgetForm";
import Footer from "@/components/Footer";

export default function NewBudgetPage() {

    return (
        <>
            <Header/>
            <NewBudgetForm />
            <Footer/>
        </>
    );
}