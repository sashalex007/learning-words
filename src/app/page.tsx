import { Practice } from "@/components/practice";
import { Header } from "@/components/header";
import { LearningWords } from "@/components/learning-words";
import { LayoutTabs } from "@/components/tabs";
import { Settings } from "@/components/settings";
import { Theme } from "@/components/theme";

export default function Home() {
  const tabs = [
    { tab: "Practice", component: <Practice /> },
    { tab: "Settings", component: <Settings /> },
    { tab: "Learning Words", component: <LearningWords /> },
  ];
  return (
    <Theme>
      <Header />

      <main className="max-w-4xl min-h-full px-4 pt-16 pb-8 mx-auto">
        <LayoutTabs tabs={tabs} />
      </main>
    </Theme>
  );
}
