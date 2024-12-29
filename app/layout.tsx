import type { Metadata } from "next";
import "./globals.css";
import SideBar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fdfdfd]">
        <div className="flex h-screen">
          <div className="w-auto">
            <SideBar />
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
