
import type { Metadata } from 'next'
import { Inter, Poppins } from "next/font/google";
import '@/app/globals.css';
import ClientLayout from '@/components/ClientLayout'; // Import the new client-side wrapper

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Metadata is now correctly exported from a Server Component.
export const metadata: Metadata = {
  title: "Preventify - Evidence-Based Healthcare in Kerala",
  description: "Preventify offers modern, evidence-based healthcare across Kerala, focusing on prevention, diabetes care, and lifestyle medicine for better health outcomes.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        {/* The ClientLayout component now wraps the children and contains all 'use client' logic */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
