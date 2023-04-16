"use client";

import { UserTableContainer } from "@/components/user-table/UserTableContainer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-primary text-black">
      <UserTableContainer />
    </main>
  );
}
