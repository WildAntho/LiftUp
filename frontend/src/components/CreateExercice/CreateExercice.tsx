import { Input } from "@heroui/react";
import { Notebook, Settings, Video } from "lucide-react";
import UploadVideo from "./UploadVideo";
import { useEffect, useRef, useState } from "react";
import {
  MuscleGroup,
  useCreateExerciceModelMutation,
  useGenerateUploadUrlMutation,
  VideoType,
} from "@/graphql/hooks";
import Saving from "../Saving";
import VideoSourceSelector from "./VideoSourceSelector";
import LexicalEditorComponent from "../LexicalEditor/LexicalEditorComponent";
import { toast } from "sonner";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { dataURLtoFile } from "./dataURLtoFile";
import { getYoutubeId, getYoutubeThumbnail } from "./youtubeHandling";
import MuscleGroupSelect from "../MuscleGroupSelect";
import { uploadFileToAWS } from "@/services/zustand/utils/s3utils";
import { useHasPermission } from "@/services/hooks/hasPermission";
import { PERMISSIONS } from "@/services/constants";

type CreateExerciceProps = {
  allMuscleGroup: MuscleGroup[];
  onCreate: () => void;
};

export default function CreateExercice({
  allMuscleGroup,
  onCreate,
}: CreateExerciceProps) {
  const [muscles, setMuscles] = useState<string[]>([]);
  const [videoSource, setVideoSource] = useState<VideoType>(VideoType.Youtube);
  const [content, setContent] = useState<object | null>(null);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [youtubeURL, setYoutubeURL] = useState<string>("");

  const [createExerciceModel, { loading }] = useCreateExerciceModelMutation();
  const [generateUploadURL] = useGenerateUploadUrlMutation();
  const toastIdRef = useRef<string | number | null>(null);

  const canManageVideo = useHasPermission(PERMISSIONS.MANAGE_VIDEO);

  const handleChangeVideoSource = (source: VideoType) => {
    setYoutubeURL("");
    setThumbnail("");
    setVideoSource(source);
  };

  const handleChangeContent = (content: object) => {
    setContent(content);
  };

  const handleUploadAWS = async () => {
    if (file && thumbnail) {
      toastIdRef.current = toast.loading("Enregistrement de l'exercice...");
      const thumbnailFile = dataURLtoFile(thumbnail, file.file.name);
      const [videoURLData, thumbnailURLData] = await Promise.all([
        generateUploadURL({
          variables: {
            fileType: file.file.type,
            fileName: file.file.name,
            isNew: true,
          },
        }),
        generateUploadURL({
          variables: {
            fileType: "image/jpeg",
            fileName: file.file.name,
            isNew: true,
          },
        }),
      ]);
      const videoData = videoURLData.data?.generateUploadUrl;
      const thumbnailData = thumbnailURLData.data?.generateUploadUrl;
      if (!videoData || !thumbnailData) {
        throw new Error("Une URL signée est manquante.");
      }
      await Promise.all([
        uploadFileToAWS(videoData.uploadUrl, file.file as File, file.file.type),
        uploadFileToAWS(
          thumbnailData.uploadUrl,
          thumbnailFile,
          thumbnailFile.type
        ),
      ]);
      try {
        const { data } = await createExerciceModel({
          variables: {
            data: {
              title,
              description: content ? JSON.stringify(content) : null,
              muscles,
              videoType: !file && !youtubeURL ? null : videoSource,
              video: `${videoData.fileName}`,
              image: `${thumbnailData.fileName}`,
            },
          },
        });
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
        onCreate();
        toast.success(data?.createExerciceModel, {
          style: {
            backgroundColor: "#dcfce7",
            color: "#15803d",
          },
        });
      } catch (error) {
        console.error(error);
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
        toast.error(
          "Une erreur est survenue lors de la création de l'exercice"
        );
      }
    } else {
      toast.error("Aucun fichier n'a été ajouté");
    }
  };

  const handleUploadYoutube = async () => {
    try {
      const { data } = await createExerciceModel({
        variables: {
          data: {
            title,
            description: content ? JSON.stringify(content) : null,
            muscles,
            videoType: !file && !youtubeURL ? null : videoSource,
            video: youtubeURL,
            image: thumbnail ? `${thumbnail}` : null,
          },
        },
      });
      onCreate();
      toast.success(data?.createExerciceModel, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la création de l'exercice");
    }
  };

  const handleCreateExerciceModel = async () => {
    switch (videoSource) {
      case VideoType.Youtube:
        handleUploadYoutube();
        break;
      case VideoType.Perso:
        handleUploadAWS();
        break;
    }
  };

  useEffect(() => {
    if (youtubeURL) {
      const youtubeId = getYoutubeId(youtubeURL) ?? "";
      setThumbnail(getYoutubeThumbnail(youtubeId));
    }
  }, [youtubeURL]);

  return (
    <section className="w-full h-full flex flex-col items-center justify-start gap-6">
      <section className="w-[70%] flex flex-col items-start justify-start gap-4 rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 text-gray-700 my-2">
          <Notebook size={20} />
          <p className="font-semibold">Information générales</p>
        </div>
        <Input
          isRequired
          type="text"
          label="Nom de l'exercice"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex flex-col items-start justify-center gap-2">
          <p className="text-sm">Description de l'exercice</p>
          <LexicalEditorComponent
            onChange={handleChangeContent}
            value={content}
            readOnly={false}
          />
        </div>
      </section>
      <section className="w-[70%] flex flex-col items-start justify-start gap-4 rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 text-gray-700 my-2">
          <Settings size={20} />
          <p className="font-semibold">Information détaillées</p>
        </div>
        <MuscleGroupSelect
          muscles={muscles}
          allMuscles={allMuscleGroup}
          setMuscles={setMuscles}
        />
      </section>
      {canManageVideo && (
        <section className="w-[70%] flex flex-col items-start justify-start gap-4 rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-700 my-2">
            <Video size={20} />
            <p className="font-semibold">Vidéo</p>
          </div>
          <div className="w-full flex justify-center">
            <VideoSourceSelector
              value={videoSource}
              onChange={handleChangeVideoSource}
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            {videoSource === VideoType.Perso && (
              <UploadVideo
                setFile={setFile}
                setThumbnail={setThumbnail}
                thumbnail={thumbnail}
              />
            )}
            {videoSource === VideoType.Youtube && (
              <Input
                type="text"
                label="Lien de la vidéo"
                value={youtubeURL}
                onChange={(e) => setYoutubeURL(e.target.value)}
              />
            )}
            {videoSource === VideoType.Youtube && thumbnail && (
              <img
                src={thumbnail}
                alt="preview image video"
                className="rounded-2xl"
              />
            )}
          </div>
        </section>
      )}
      <div className="w-[70%] flex justify-end items-center">
        <Saving onClick={handleCreateExerciceModel} loading={loading} />
      </div>
    </section>
  );
}
