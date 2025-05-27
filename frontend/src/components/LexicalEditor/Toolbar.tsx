import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useCallback } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
} from "lexical";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // adapte selon ton projet
import { mergeRegister } from "@lexical/utils";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const LowPriority = 1;

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const toggleFormat = (
    format: "bold" | "italic" | "underline" | "strikethrough"
  ) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const buttonClass = (active: boolean) =>
    active ? "bg-gray-300 text-black" : "hover:bg-gray-100";

  return (
    <div className="flex items-center gap-2 mb-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleFormat("bold")}
        className={buttonClass(isBold)}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleFormat("italic")}
        className={buttonClass(isItalic)}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleFormat("underline")}
        className={buttonClass(isUnderline)}
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleFormat("strikethrough")}
        className={buttonClass(isStrikethrough)}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Toolbar;
