"use client";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Practice } from "./practice";
import { SettingsTab } from "./settings";
import { LearningWords } from "./learning-words";
import { Analytics } from "./analytics";

const tabs: Tab[] = [
  { tab: "Practice", href: "/" },
  { tab: "Settings", href: "/settings" },
  { tab: "Words to learn", href: "/words" },
  { tab: "Analytics", href: "/analytics" },
];

export interface Tab {
  tab: string;
  href: string;
}

const TabsComponent = [Practice, SettingsTab, LearningWords, Analytics];

export const Main: FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const index = tabs.findIndex(({ href }) => href === pathname);

  const handleChange = (index: number) => {
    push(tabs[index].href);
  };
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Tabs
      className="flex-1 flex flex-col"
      isLazy
      variant="enclosed"
      index={index}
      onChange={handleChange}
    >
      <TabList borderColor={borderColor}>
        {tabs.map(({ tab }) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>

      <TabPanels className="flex-1 flex flex-col justify-center pb-52">
        {tabs.map(({ tab }, index) => {
          const Component = TabsComponent[index];
          return (
            <TabPanel key={tab}>
              <Component />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};
