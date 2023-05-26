import { Settings } from "@/stores/settings";
import { Navigation } from "./navigation";
import { FC, ReactNode } from "react";

export const PracticeFooter: FC<{ input: ReactNode }> = ({ input }) => {
  return (
    <div className="flex gap-3 flex-col mt-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {input}

        <Navigation />
      </div>

      <BackspaceIgnoredWarning />
    </div>
  );
};

const BackspaceIgnoredWarning: FC = () => {
  if (!Settings.get().isSimpleBackspaceIgnored) return null;

  return (
    <div className="text-sm">
      <div> {`Only "alt + backspace" allowed`}</div>
      <div>{`This can be turned off in the settings.`}</div>
    </div>
  );
};
