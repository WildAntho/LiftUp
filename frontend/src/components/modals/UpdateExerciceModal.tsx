import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
} from "@heroui/react";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";
import LexicalEditorComponent from "../LexicalEditor/LexicalEditorComponent";
import MuscleGroupSelect from "../MuscleGroupSelect";
import {
  ExerciceModel,
  MuscleGroup,
  useGenerateUploadUrlMutation,
  useUpdateExerciceModelMutation,
  VideoType,
} from "@/graphql/hooks";
import { Ban, Repeat, Save, SquarePlay, Trash2 } from "lucide-react";
import VideoSourceSelector from "../CreateExercice/VideoSourceSelector";
import UploadVideo from "../CreateExercice/UploadVideo";
import { FileWithPreview } from "@/hooks/use-file-upload";
import {
  getYoutubeId,
  getYoutubeThumbnail,
} from "../CreateExercice/youtubeHandling";
import { toast } from "sonner";
import ConfirmModal from "./ConfirmModal";
import { dataURLtoFile } from "../CreateExercice/dataURLtoFile";
import { uploadFileToAWS } from "@/services/zustand/utils/s3utils";
import { useExerciceURL } from "@/services/hooks/useExerciceUrl";

type UpdateExerciceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  exercice: ExerciceModel;
  allMuscles: MuscleGroup[];
  refetch: () => void;
};

// Custom hooks pour séparer la logique métier
function useExerciceForm(exercice: ExerciceModel) {
  const muscleId = exercice?.muscles?.map((m) => m.id);
  const [content, setContent] = useState<object | null>(
    exercice?.description ? JSON.parse(exercice.description) : null
  );
  const [title, setTitle] = useState<string>(exercice?.title || "");
  const [muscles, setMuscles] = useState<string[]>(muscleId ?? []);

  return {
    content,
    setContent,
    title,
    setTitle,
    muscles,
    setMuscles,
  };
}

function useVideoManagement() {
  const [replaceVideo, setReplaceVideo] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<VideoType>(VideoType.Youtube);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [youtubeURL, setYoutubeURL] = useState<string>("");

  const resetVideoState = () => {
    setReplaceVideo(false);
    setVideoSource(VideoType.Youtube);
    setThumbnail(null);
    setYoutubeURL("");
    setFile(null);
  };

  const handleChangeVideoSource = (source: VideoType) => {
    setYoutubeURL("");
    setThumbnail("");
    setVideoSource(source);
  };

  // Effet pour gérer la thumbnail YouTube
  useEffect(() => {
    if (youtubeURL) {
      const youtubeId = getYoutubeId(youtubeURL) ?? "";
      setThumbnail(getYoutubeThumbnail(youtubeId));
    }
  }, [youtubeURL]);

  return {
    replaceVideo,
    setReplaceVideo,
    videoSource,
    file,
    setFile,
    thumbnail,
    setThumbnail,
    youtubeURL,
    setYoutubeURL,
    resetVideoState,
    handleChangeVideoSource,
  };
}

// Composant principal refactorisé
export default function UpdateExerciceModal({
  isOpen,
  onClose,
  exercice,
  allMuscles,
  refetch,
}: UpdateExerciceModalProps) {
  const [updateExercice, { loading }] = useUpdateExerciceModelMutation();
  const [generateUploadURL] = useGenerateUploadUrlMutation();
  const toastIdRef = useRef<string | number | null>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const exercicesURL = useExerciceURL(exercice?.image ?? "");
  const { content, setContent, title, setTitle, muscles, setMuscles } =
    useExerciceForm(exercice);
  const {
    replaceVideo,
    setReplaceVideo,
    videoSource,
    file,
    setFile,
    thumbnail,
    setThumbnail,
    youtubeURL,
    setYoutubeURL,
    resetVideoState,
    handleChangeVideoSource,
  } = useVideoManagement();

  const showLoadingToast = (message: string) => {
    toastIdRef.current = toast.loading(message);
  };

  const dismissToast = () => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  const showSuccessToast = (message: string) => {
    dismissToast();
    toast.success(message, {
      style: {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      },
    });
  };

  const showErrorToast = (message: string) => {
    dismissToast();
    toast.error(message);
  };

  // Handlers pour les actions principales
  const handleUpdate = async () => {
    try {
      const { data } = await updateExercice({
        variables: {
          data: {
            id: exercice.id,
            title,
            description: content ? JSON.stringify(content) : null,
            muscles,
          },
        },
      });
      showSuccessToast(data?.updateExerciceModel || "Exercice mis à jour");
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      showErrorToast("Une erreur est survenue lors de la mise à jour");
    }
  };

  const handleDeleteVideo = async () => {
    try {
      showLoadingToast("Suppression de la vidéo...");
      const { data } = await updateExercice({
        variables: {
          data: {
            id: exercice.id,
            title: exercice.title,
            videoType: exercice.videoType,
            video: null,
            image: null,
          },
          deleteVideo: true,
        },
      });
      showSuccessToast(data?.updateExerciceModel || "Vidéo supprimée");
      refetch();
    } catch (error) {
      console.error(error);
      showErrorToast(
        "Une erreur est survenue lors de la suppression de la vidéo"
      );
    }
  };

  const handleVideoYoutube = async () => {
    if (!youtubeURL) {
      toast.error("Aucun lien Youtube n'a été renseigné");
      return;
    }
    try {
      showLoadingToast("Enregistrement de la vidéo...");
      const { data } = await updateExercice({
        variables: {
          data: {
            id: exercice.id,
            title: exercice.title,
            video: youtubeURL,
            image: thumbnail,
            videoType: videoSource,
          },
        },
      });
      showSuccessToast(data?.updateExerciceModel || "Vidéo enregistrée");
      refetch();
      resetVideoState();
    } catch (error) {
      console.error(error);
      showErrorToast(
        "Une erreur est survenue lors de l'enregistrement de la vidéo"
      );
    }
  };

  const handleVideoAWS = async (isNew: boolean) => {
    if (!file || !thumbnail) {
      toast.error("Aucun fichier n'a été ajouté");
      return;
    }

    try {
      showLoadingToast("Enregistrement de la vidéo...");
      const thumbnailFile = dataURLtoFile(thumbnail, file.file.name);

      const [videoURLData, thumbnailURLData] = await Promise.all([
        generateUploadURL({
          variables: {
            fileType: file.file.type,
            fileName: isNew ? file.file.name : exercice.video
          },
        }),
        generateUploadURL({
          variables: {
            fileType: "image/jpeg",
            fileName: isNew ? file.file.name : exercice.image
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

      const { data } = await updateExercice({
        variables: {
          data: {
            id: exercice.id,
            title: exercice.title,
            videoType: videoSource,
            video: videoData.fileName,
            image: thumbnailData.fileName,
          },
        },
      });

      showSuccessToast(data?.updateExerciceModel || "Vidéo enregistrée");
      refetch();
      resetVideoState();
    } catch (error) {
      console.error(error);
      showErrorToast(
        "Une erreur est survenue lors de l'enregistrement de la vidéo"
      );
    }
  };

  const handleVideo = async (isNew = false) => {
    switch (videoSource) {
      case VideoType.Youtube:
        return handleVideoYoutube();
      case VideoType.Perso:
        return handleVideoAWS(isNew);
    }
  };

  const handleChangeContent = (newContent: object) => {
    setContent(newContent);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      placement="right"
      className="overflow-hidden"
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
      }}
    >
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes-vous sûr de vouloir supprimer la vidéo ?"
        onConfirm={handleDeleteVideo}
      />

      <DrawerContent>
        <DrawerHeader className="flex flex-col items-start justify-center">
          <p className="font-bold text-2xl">ÉDITER L'EXERCICE</p>
          <p className="text-tertiary text-sm">{exercice?.title}</p>
        </DrawerHeader>

        <Separator />

        <DrawerBody>
          <ExerciceForm
            title={title}
            setTitle={setTitle}
            content={content}
            onContentChange={handleChangeContent}
            muscles={muscles}
            setMuscles={setMuscles}
            allMuscles={allMuscles}
          />

          <VideoSection
            exercice={exercice}
            exercicesURL={exercicesURL}
            replaceVideo={replaceVideo}
            setReplaceVideo={setReplaceVideo}
            videoSource={videoSource}
            onVideoSourceChange={handleChangeVideoSource}
            file={file}
            setFile={setFile}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            youtubeURL={youtubeURL}
            setYoutubeURL={setYoutubeURL}
            onVideoSave={handleVideo}
            onVideoDelete={() => setOpenConfirm(true)}
            loading={loading}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button
            startContent={<Save size={16} />}
            onPress={handleUpdate}
            isDisabled={replaceVideo}
            className="group shadow-none text-white w-full h-[55px] rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
          >
            <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
              Sauvegarder
            </p>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Composants extraits pour une meilleure organisation
function ExerciceForm({
  title,
  setTitle,
  content,
  onContentChange,
  muscles,
  setMuscles,
  allMuscles,
}: {
  title: string;
  setTitle: (title: string) => void;
  content: object | null;
  onContentChange: (content: object) => void;
  muscles: string[];
  setMuscles: (muscles: string[]) => void;
  allMuscles: MuscleGroup[];
}) {
  return (
    <section className="w-full flex flex-col justify-start items-center gap-6 py-4">
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
          onChange={onContentChange}
          value={content}
          readOnly={false}
        />
      </div>

      <div className="w-full">
        <MuscleGroupSelect
          muscles={muscles}
          allMuscles={allMuscles}
          setMuscles={setMuscles}
        />
      </div>
    </section>
  );
}

function VideoSection({
  exercice,
  exercicesURL,
  replaceVideo,
  setReplaceVideo,
  videoSource,
  onVideoSourceChange,
  file,
  setFile,
  thumbnail,
  setThumbnail,
  youtubeURL,
  setYoutubeURL,
  onVideoSave,
  onVideoDelete,
  loading,
}: {
  exercice: ExerciceModel;
  exercicesURL: string;
  replaceVideo: boolean;
  setReplaceVideo: (replace: boolean) => void;
  videoSource: VideoType;
  onVideoSourceChange: (source: VideoType) => void;
  file: FileWithPreview | null;
  setFile: (file: FileWithPreview | null) => void;
  thumbnail: string | null;
  setThumbnail: (thumbnail: string | null) => void;
  youtubeURL: string;
  setYoutubeURL: (url: string) => void;
  onVideoSave: (isNew?: boolean) => void;
  onVideoDelete: () => void;
  loading: boolean;
}) {
  const hasExistingVideo = exercice?.image && !replaceVideo;
  const isAddingVideo = !exercice?.image || replaceVideo;

  if (hasExistingVideo) {
    return (
      <ExistingVideoDisplay
        exercice={exercice}
        exercicesURL={exercicesURL}
        onReplace={() => {
          setReplaceVideo(true);
          onVideoSourceChange(VideoType.Youtube);
        }}
        onDelete={onVideoDelete}
        loading={loading}
      />
    );
  }

  if (isAddingVideo) {
    return (
      <VideoUploadSection
        replaceVideo={replaceVideo}
        setReplaceVideo={setReplaceVideo}
        videoSource={videoSource}
        onVideoSourceChange={onVideoSourceChange}
        file={file}
        setFile={setFile}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        youtubeURL={youtubeURL}
        setYoutubeURL={setYoutubeURL}
        onVideoSave={onVideoSave}
        exercice={exercice}
      />
    );
  }

  return null;
}

function ExistingVideoDisplay({
  exercice,
  exercicesURL,
  onReplace,
  onDelete,
  loading,
}: {
  exercice: ExerciceModel;
  exercicesURL: string;
  onReplace: () => void;
  onDelete: () => void;
  loading: boolean;
}) {
  return (
    <div className="w-full flex justify-between items-center gap-4">
      <img
        src={
          exercice.image ? `${exercicesURL}${exercice.image}` : "/noimage.webp"
        }
        alt="Image Exercice"
        className="w-[65%] hover:border hover:border-dark/50 object-cover object-top rounded-lg"
      />
      <div className="w-[35%] h-full flex flex-col items-center justify-center gap-2">
        <Button
          startContent={<Repeat size={16} />}
          onPress={onReplace}
          className="group shadow-none text-white h-[45px] w-full rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
        >
          <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
            Remplacer
          </p>
        </Button>
        <Button
          startContent={<Trash2 size={16} />}
          isLoading={loading}
          onPress={onDelete}
          className="group shadow-none text-white h-[45px] w-full rounded-xl bg-red-500 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
        >
          <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
            Supprimer
          </p>
        </Button>
      </div>
    </div>
  );
}

function VideoUploadSection({
  replaceVideo,
  setReplaceVideo,
  videoSource,
  onVideoSourceChange,
  setFile,
  thumbnail,
  setThumbnail,
  youtubeURL,
  setYoutubeURL,
  onVideoSave,
  exercice,
}: {
  replaceVideo: boolean;
  setReplaceVideo: (replace: boolean) => void;
  videoSource: VideoType;
  onVideoSourceChange: (source: VideoType) => void;
  file: FileWithPreview | null;
  setFile: (file: FileWithPreview | null) => void;
  thumbnail: string | null;
  setThumbnail: (thumbnail: string | null) => void;
  youtubeURL: string;
  setYoutubeURL: (url: string) => void;
  onVideoSave: (isNew?: boolean) => void;
  exercice: ExerciceModel;
}) {
  const handleSave = () => {
    const hasExistingVideo = exercice.image || exercice.video;
    onVideoSave(!hasExistingVideo);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex justify-center">
        <VideoSourceSelector
          value={videoSource}
          onChange={onVideoSourceChange}
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
          <>
            <Input
              type="text"
              label="Lien de la vidéo"
              value={youtubeURL}
              onChange={(e) => setYoutubeURL(e.target.value)}
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="preview image video"
                className="rounded-2xl"
              />
            )}
          </>
        )}
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        {replaceVideo && (
          <Button
            startContent={<Ban size={16} />}
            onPress={() => setReplaceVideo(false)}
            className="group shadow-none flex-1 text-white rounded-xl bg-red-500 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
          >
            <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
              Annuler
            </p>
          </Button>
        )}

        <Button
          startContent={<SquarePlay size={16} />}
          onPress={handleSave}
          className="group shadow-none flex-1 text-white rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
        >
          <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
            Enregistrer
          </p>
        </Button>
      </div>
    </div>
  );
}
