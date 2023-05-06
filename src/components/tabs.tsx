"use client";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FC } from "react";

interface ILayoutTabs {
  tabs: { tab: string; component: JSX.Element }[];
}

export const LayoutTabs: FC<ILayoutTabs> = ({ tabs }) => {
  return (
    <Tabs size="sm" variant="enclosed">
      <TabList>
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
