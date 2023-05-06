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
  // TODO: Add tab for settings to change
  // - number of words per exercise
  // - min number of learning words at the beginning of the exercise
  // - repetition of learning words
  // - repetition of failed learning words
  // TODO: Add dark mode toggle
  return (
    <main className="max-w-4xl min-h-full px-4 pt-16 pb-8 mx-auto">
      <LayoutTabs tabs={tabs} />
    </main>
  );
}
