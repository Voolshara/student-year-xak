import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Thred",
  description: "Task Tracker | Thred",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
