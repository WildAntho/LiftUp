import {
  AlertCircleIcon,
  TriangleAlert,
  UploadIcon,
  XIcon,
} from "lucide-react";

import {
  FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getVideoThumbnail } from "./GetVideoThumbnail";

type UploadVideoProps = {
  setFile: (file: FileWithPreview) => void;
  setThumbnail: (thumbnail: string | null) => void;
  thumbnail: string | null;
};

export default function UploadVideo({
  setFile,
  setThumbnail,
  thumbnail,
}: UploadVideoProps) {
  const maxSize = 30 * 1024 * 1024;
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
  });

  const file = files[0];

  useEffect(() => {
    let objectUrl: string;
    if (file) {
      if (file?.file instanceof File) {
        objectUrl = URL.createObjectURL(file.file);
        setVideoPreview(objectUrl);
      }
      const generate = async () => {
        const thumbnail = await getVideoThumbnail(file.file as File);
        setThumbnail(thumbnail);
        setFile(file);
      };
      generate();
    }
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, setFile, setThumbnail]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!file && (
        <div className="flex flex-col items-start justify-center gap-2 p-4 bg-yellow-400 bg-opacity-10 rounded-2xl">
          <div className="flex justify-start items-center gap-2">
            <TriangleAlert className="text-orange-400" />
            <p className="text-md font-semibold text-orange-900">Attention !</p>
          </div>
          <p className="text-xs text-orange-900">
            La vidéo doit être au format .mp4 et ne doit pas dépasser 30Mo.
          </p>
          <p className="text-xs text-orange-900">
            Convertir votre fichier:{" "}
            <a
              href="https://cloudconvert.com/mp4-converter"
              target="blank"
              className="hover:underline"
            >
              Cliquer ici
            </a>
          </p>
        </div>
      )}
      {/* Drop area */}
      {!file && (
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-neutral-200 hover:bg-neutral-100/50 data-[dragging=true]:bg-neutral-100/50 has-[input:focus]:border-neutral-950 has-[input:focus]:ring-neutral-950/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] dark:border-neutral-800 dark:hover:bg-neutral-800/50 dark:data-[dragging=true]:bg-neutral-800/50 dark:has-[input:focus]:border-neutral-300 dark:has-[input:focus]:ring-neutral-300/50"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={Boolean(file)}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="bg-white mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border dark:bg-neutral-950"
              aria-hidden="true"
            >
              <UploadIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Importer une vidéo</p>
            <p className="text-neutral-500 text-xs dark:text-neutral-400">
              Déposer ou cliquer pour importer une vidéo (max.{" "}
              {formatBytes(maxSize)})
            </p>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div
          className="text-red-500 flex items-center gap-1 text-xs dark:text-red-900"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 px-4 py-2 dark:border-neutral-800"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                className="w-16 h-16 object-cover object-top rounded-md"
                src={thumbnail ?? ""}
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">
                  {file.file.name}
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-neutral-500/80 hover:text-neutral-950 -me-2 size-8 hover:bg-transparent dark:text-neutral-400/80 dark:hover:text-neutral-50"
              onClick={() => {
                setThumbnail(null);
                removeFile(files[0]?.id);
              }}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <video controls src={videoPreview ?? ""} className="rounded-2xl" />
        </div>
      )}
    </div>
  );
}
