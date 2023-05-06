import { Providers } from "@/providers";
import "./globals.css";

export const metadata = {
  title: "Learning words",
  description: "Improve your typing accuracy by focusing on the words you miss",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
