import { FC, ReactNode } from "react";
import { Header } from "./header";
import { Theme } from "./theme";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Theme>
      <Header />
      <main className="max-w-4xl min-h-full px-4 pt-12 pb-8 mx-auto">
        {children}
      </main>
    </Theme>
  );
};
