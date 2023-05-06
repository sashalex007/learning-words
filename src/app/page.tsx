import { Exercise } from "@/components/exercise";
import { LearningWords } from "@/components/learning-words";
import { TextInput } from "@/components/text-input";

export default function Home() {
  // TODO: use tabs
  return (
    <main className="max-w-2xl h-full m-auto p-6 flex flex-col gap-8 justify-center">
      <TextInput />
      <Exercise />
      <LearningWords />
    </main>
  );
}
