import { Exercise } from "@/components/exercise";
import { TextInput } from "@/components/text-input";

export default function Home() {
  return (
    <main className="max-w-2xl h-full m-auto p-6 flex flex-col gap-8 justify-center">
      <div className="flex flex-col gap-4 items-end">
        <TextInput />
      </div>
      <div className="flex flex-col gap-4">
        <Exercise />
      </div>
    </main>
  );
}
