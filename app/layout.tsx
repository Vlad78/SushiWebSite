import { Inter } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kapibara Sushi",
  description: "Kapibara Sushi - The place of joy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <Header />
        {children}
        <Footer />
        <Navigation />
      </body>
    </html>
  );
}
