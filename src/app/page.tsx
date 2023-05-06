import { Exercise } from "@/components/exercise";
import { LearningWords } from "@/components/learning-words";
import { LayoutTabs } from "@/components/tabs";
import { TextInput } from "@/components/text-input";

export default function Home() {
  const tabs = [
    { tab: "Exercise", component: <Exercise /> },
    { tab: "Text Input", component: <TextInput /> },
    { tab: "Learning Words", component: <LearningWords /> },
  ];
  return (
    <main className="max-w-2xl min-h-full p-10 mx-auto">
      <LayoutTabs tabs={tabs} />
    </main>
  );
}
