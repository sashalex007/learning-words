import { Exercise } from "@/components/exercise";
import { TextInput } from "@/components/text-input";

export default function Home() {
  return (
    <main className="max-w-5xl m-auto p-6">
      <TextInput />
      <Exercise />
    </main>
  );
}
