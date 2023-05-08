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
import { Settings } from "./settings";
import { LearningWords } from "./learning-words";

const tabs: Tab[] = [
  { tab: "Practice", href: "/" },
  { tab: "Settings", href: "/settings" },
  {
    tab: "Learning Words",
    href: "/learning-words",
  },
];

export interface Tab {
  tab: string;
  href: string;
}

const TabsComponent = [Practice, Settings, LearningWords];

export const Main: FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const index = tabs.findIndex(({ href }) => href === pathname);

  const handleChange = (index: number) => {
    push(tabs[index].href);
  };
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Tabs isLazy variant="enclosed" index={index} onChange={handleChange}>
      <TabList borderColor={borderColor}>
        {tabs.map(({ tab }) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ tab }, index) => {
          const Component = TabsComponent[index];
          return (
            <TabPanel className="mt-8" key={tab}>
              <Component />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};
