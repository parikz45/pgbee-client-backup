import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PgBee",
  description: "A PG management tool",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
