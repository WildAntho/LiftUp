import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import { Separator } from "@/components/ui/separator";
import { Program } from "@/graphql/hooks";
import { MdStickyNote2 } from "react-icons/md";
import CoachLink from "./CoachLink";

type AboutProgramProps = {
  program: Program;
};

export default function AboutProgram({ program }: AboutProgramProps) {
  const content = program.description ? JSON.parse(program.description) : null;
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <MdStickyNote2 size={24} />
          Description
        </p>
        <Separator />
      </div>
      {program.description ? (
        <div className="w-[85%]">
          <LexicalEditorComponent value={content} readOnly={true} />
        </div>
      ) : (
        <p className="w-[80%] text-xs pl-4">
          Aucune description n'a été fournie
        </p>
      )}
      <CoachLink program={program as Program} />
    </section>
  );
}
