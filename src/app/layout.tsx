"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProviderAdmin } from "../../VIEW/providers/AuthContextProviderAdmin";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProviderAdmin>
          <ToastContainer />
          {children}
        </AuthContextProviderAdmin>

      </body>
    </html>
  );
}
