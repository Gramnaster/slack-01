/* eslint-disable react/prop-types */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import DataProvider from "@/context/DataProvider";
// import Navigation from "@/components/Navigation/Navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Miscord",
  description: "Where you belong",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DataProvider>
          <div className="App">
            {children}
          </div>
        </DataProvider>
      </body>
    </html>
  );
}


