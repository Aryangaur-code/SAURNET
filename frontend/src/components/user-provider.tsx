"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  company: string;
  setCompany: (company: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Sujata Patel");
  const [email, setEmail] = useState("sujata@saurnet.com");
  const [company, setCompany] = useState("Saurnet Micro-Grid Operations");

  return (
    <UserContext.Provider value={{ name, setName, email, setEmail, company, setCompany }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
