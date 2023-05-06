"use client";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";

interface ILayoutTabs {
  tabs: { tab: string; component: JSX.Element }[];
}

export const LayoutTabs: FC<ILayoutTabs> = ({ tabs }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Tabs variant="enclosed">
      <TabList borderColor={borderColor}>
        {tabs.map(({ tab }) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ tab, component }) => (
          <TabPanel className="mt-8" key={tab}>
            {component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
