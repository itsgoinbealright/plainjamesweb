import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Plain James - Custom Millwork & Cabinetry",
  description: "Premium custom cabinetry and millwork in Winnipeg, Manitoba.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
