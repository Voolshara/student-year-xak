import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Registration Page",
  description: "Task Tracker | Registration Page",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
