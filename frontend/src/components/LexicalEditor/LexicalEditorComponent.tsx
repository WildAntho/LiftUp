import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./Toolbar";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface LexicalEditorProps {
  value: object | null;
  onChange?: (content: object) => void;
  readOnly?: boolean;
}

const LoadEditorState: React.FC<{ value: object | null }> = ({ value }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) {
      editor.getEditorState().read(() => {
        const currentState = editor.getEditorState().toJSON();
        const newState = value;
        if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
          editor.update(() => {
            const editorState = editor.parseEditorState(JSON.stringify(value));
            editor.setEditorState(editorState);
          });
        }
      });
    }
  }, [editor, value]);

  return null;
};

const HandleReadOnly: React.FC<{ readOnly: boolean }> = ({ readOnly }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  return null;
};

const LexicalEditorComponent: React.FC<LexicalEditorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const config = {
    namespace: "MyEditor",
    editable: !readOnly,
    theme: {
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
      },
    },
    onError: (error: Error) => console.error("Lexical Error:", error),
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      if (onChange) onChange(json);
    });
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div
        className={`py-3 bg-white min-h-[100px] w-full ${
          !readOnly ? "border rounded p-3" : ""
        }`}
      >
        <LoadEditorState value={value} />
        <HandleReadOnly readOnly={readOnly} />
        {!readOnly && <Toolbar />}{" "}
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[100px] w-full outline-none text-sm" />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {!readOnly && <OnChangePlugin onChange={handleChange} />}
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditorComponent;
