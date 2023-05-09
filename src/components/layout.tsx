import { FC, ReactNode } from "react";
import { Header } from "./header";
import { Theme } from "./theme";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Theme>
      <Header />
      <main className="flex-1 w-full max-w-4xl min-h-full p-4 flex flex-col">
        {children}
      </main>
    </Theme>
  );
};
