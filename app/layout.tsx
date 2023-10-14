import { Inter } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Auth from "../providers/auth-provider";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sushi Butik",
  description: "Sushi Butik - The place of joy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Auth>
          <ToastProvider />
          <ModalProvider />
          <Header />
          {children}
          <Footer />
          <Navigation />
        </Auth>
      </body>
    </html>
  );
}
