import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Chip,
  Spinner,
} from "@heroui/react";
import { Separator } from "../ui/separator";
import VideoPlayer from "../VideoPlayer";
import { useGetExerciceInfoQuery } from "@/graphql/hooks";
import { useEffect, useRef } from "react";
import LexicalEditorComponent from "../LexicalEditor/LexicalEditorComponent";

type ExerciceInfoProps = {
  id?: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export default function ExerciceInfo({
  id,
  isOpen,
  setOpen,
}: ExerciceInfoProps) {
  const lastFetchedAt = useRef<number | null>(null);
  const SIGNED_URL_EXPIRATION_MS = 300 * 1000;

  const {
    data: dataInfo,
    loading,
    refetch,
  } = useGetExerciceInfoQuery({
    variables: {
      id: id as string,
    },
    skip: !isOpen,
  });

  const exerciceInfo = dataInfo?.getExerciceInfo;

  useEffect(() => {
    const now = Date.now();
    const shouldRefetch =
      isOpen &&
      id &&
      (!lastFetchedAt.current ||
        now - lastFetchedAt.current > SIGNED_URL_EXPIRATION_MS);

    if (shouldRefetch) {
      refetch();
      lastFetchedAt.current = now;
    }
  }, [isOpen, id, refetch, SIGNED_URL_EXPIRATION_MS]);

  // Configuration commune du drawer
  const drawerProps = {
    isOpen,
    onOpenChange: () => setOpen(false),
    size: "5xl" as const,
    placement: "bottom" as const,
    classNames: {
      base: "w-1/2 2xl:w-1/3 max-h-[95%] mx-auto left-1/4 2xl:left-1/3",
    },
    motionProps: {
      initial: { y: "100%", opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300,
          bounce: 0.25,
          duration: 0.3,
        },
      },
      exit: {
        y: "100%",
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    },
  };

  // Fonction pour rendre le contenu selon l'état
  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (!exerciceInfo?.description && !exerciceInfo?.link) {
      return (
        <>
          <img
            src="/dashboard/noevent.webp"
            alt="no event image"
            className="object-cover w-60 h-60"
          />
          <p className="font-bold text-gray-400 text-lg">
            Aucune information disponible
          </p>
        </>
      );
    }

    return (
      <>
        <DrawerHeader className="w-full flex flex-col items-start justify-center">
          <p className="font-bold text-2xl">DETAILS</p>
          <p className="text-tertiary text-sm">{exerciceInfo?.title}</p>
        </DrawerHeader>
        <Separator />
        <DrawerBody className="w-full h-full flex flex-col items-center justify-start gap-8 pb-8">
          {exerciceInfo?.link ? (
            <VideoPlayer url={exerciceInfo.link} />
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img
                src="/dashboard/noevent.webp"
                alt="no event image"
                className="object-cover w-40 h-40"
              />
              <p className="font-bold text-gray-400 text-md">
                Aucune vidéo disponible
              </p>
            </div>
          )}

          {exerciceInfo?.muscles && exerciceInfo.muscles.length > 0 && (
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <p className="font-bold">MUSCLES</p>
              <div className="w-full py-2 rounded-lg text-gray-700 flex justify-start items-center gap-2">
                {exerciceInfo.muscles.map((m) => (
                  <Chip size="md" key={m.id}>
                    {m.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}
          {exerciceInfo?.description && (
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <p className="font-bold">DESCRIPTION</p>
              <div className="w-full py-2 rounded-lg text-gray-700">
                <LexicalEditorComponent
                  value={JSON.parse(exerciceInfo.description)}
                  readOnly={true}
                />
              </div>
            </div>
          )}
        </DrawerBody>
      </>
    );
  };

  return (
    <Drawer {...drawerProps}>
      <DrawerContent className="h-full flex flex-col justify-center items-center gap-2">
        {renderContent()}
      </DrawerContent>
    </Drawer>
  );
}
