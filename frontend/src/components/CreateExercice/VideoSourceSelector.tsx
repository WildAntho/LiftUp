import { FileVideo2 } from "lucide-react";
import { TfiYoutube } from "react-icons/tfi";
import clsx from "clsx";
import { VideoType } from "@/graphql/hooks";

type VideoSourceProps = {
  value: VideoType;
  onChange: (source: VideoType) => void;
};

export default function VideoSourceSelector({
  value,
  onChange,
}: VideoSourceProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(VideoType.Youtube)}
        className={clsx(
          "w-72 h-44 rounded-xl text-sm border transition text-center p-6 flex flex-col items-center justify-center gap-2",
          value === VideoType.Youtube
            ? "bg-gray-100 border-gray-300"
            : "bg-white border-transparent hover:bg-gray-100"
        )}
      >
        <div className="bg-red-600 rounded-md p-2">
          <TfiYoutube className="text-white w-14 h-14" />
        </div>
        <span className="font-medium text-gray-800">Lien YouTube</span>
      </button>
      <button
        type="button"
        onClick={() => onChange(VideoType.Perso)}
        className={clsx(
          "rounded-xl text-sm border transition text-center p-6 flex flex-col items-center justify-center gap-2",
          value === VideoType.Perso
            ? "bg-gray-100 border-gray-300"
            : "bg-white border-transparent hover:bg-gray-100"
        )}
      >
        <FileVideo2 className="w-14 h-14 text-black" />
        <span className="font-medium text-gray-800 text-center">
          Importer depuis
          <br />
          mon appareil
        </span>
      </button>
    </div>
  );
}
