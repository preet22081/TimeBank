// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">TimeBank</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-200 text-xs text-center p-2 dark:bg-gray-800 dark:text-gray-400">
          &copy; 2025 TimeBank
        </footer>
      </body>
    </html>
  );
}
