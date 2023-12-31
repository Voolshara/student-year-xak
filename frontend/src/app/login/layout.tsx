import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Task Tracker | Login Page",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
