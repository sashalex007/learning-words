import { Providers } from "@/providers";
import "./globals.css";
import { Layout } from "@/components/layout";

export const metadata = {
  title: "Words to learn",
  description: "Improve your typing accuracy by focusing on the words you miss",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
