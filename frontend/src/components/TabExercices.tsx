import {
  ExerciceModel,
  useAddExerciceFavoriteMutation,
  useDeleteExerciceFavoriteMutation,
  useDeleteExerciceModelMutation,
  useGetAllExercicesModelQuery,
  useGetAllMuscleGroupQuery,
  useGetExerciceCategoriesQuery,
  useGetFavoriteExercicesIdQuery,
} from "@/graphql/hooks";
import { Check, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button, Input, Tooltip } from "@heroui/react";
import { useDebouncedCallback } from "@/services/hooks/useDebouncedCallback";
import { useUserStore } from "@/services/zustand/userStore";
import { toast } from "sonner";
import { FilterCardEnum } from "@/services/utils";
import FilterCard from "@/pages/Home/Program/components/Configuration/components/FilterCard";
import ChooseExerciceCard from "@/pages/Home/Program/components/Configuration/components/ChooseExerciceCard";
import SkeletonExerciceCard from "@/pages/Home/Program/components/Configuration/components/SkeletonExerciceCard";
import CreateExercice from "./CreateExercice/CreateExercice";
import MuscleGroupSelect from "./Select/MuscleGroupSelect";
import UpdateExerciceModal from "./modals/UpdateExerciceModal";
import ExerciceInfo from "./modals/ExerciceModelInfo";
import { FaHeart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { useHasPermission } from "@/services/hooks/hasPermission";
import { PERMISSIONS } from "@/services/constants";
import AnimatedWrapper from "./Wrapper/AnimatedWrapper";
import ExerciceCategorySelect from "./Select/ExerciceCategorySelect";

type TabExercicesProps = {
  activeExercices: ExerciceModel[] | null;
  setActiveExercices: (exercice: ExerciceModel[] | null) => void;
  disableSelection?: boolean;
};

export default function TabExercices({
  activeExercices,
  setActiveExercices,
  disableSelection = false,
}: TabExercicesProps) {
  const currentUser = useUserStore((state) => state.user);
  const canManageExercice = useHasPermission(PERMISSIONS.MANAGE_EXERCICE);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [input, setInput] = useState<string>("");
  const [debounceInput, setDebounceInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [muscles, setMuscles] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { data: dataFavorite, refetch: refetchFavorite } =
    useGetFavoriteExercicesIdQuery();
  const [addFavorite] = useAddExerciceFavoriteMutation();
  const [deleteFavorite] = useDeleteExerciceFavoriteMutation();
  const [deleteExercice] = useDeleteExerciceModelMutation();
  const {
    data,
    refetch,
    loading: loadingExercice,
  } = useGetAllExercicesModelQuery({
    variables: {
      input: debounceInput,
      id: activeTabId === 2 ? currentUser?.id.toString() : "",
      getFavorite: activeTabId === 3,
      muscles,
      category,
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: dataMuscleGroup } = useGetAllMuscleGroupQuery();
  const { data: dataExerciceCategory } = useGetExerciceCategoriesQuery();
  const toastIdRef = useRef<string | number | null>(null);
  const allExercices = data?.getAllExercicesModel ?? [];
  const favoriteExercices = dataFavorite?.getFavoriteExercicesId ?? [];
  const allMuscleGroup = dataMuscleGroup?.getAllMuscleGroup ?? [];
  const allCategories = dataExerciceCategory?.getExerciceCategories ?? [];

  const lengthExercice = allExercices.length;

  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const getCountFilter = () => {
    const countCategory = category ? 1 : 0;
    const countMuscles = muscles.length;
    return countCategory + countMuscles;
  };

  const handleClick = (e: ExerciceModel) => {
    const newExercice = { ...e };
    if (disableSelection) return;
    if (activeExercices === null) {
      setActiveExercices([newExercice]);
    } else {
      const exerciceIndex = activeExercices.findIndex(
        (ex) => ex.id === newExercice.id
      );
      if (exerciceIndex === -1) {
        setActiveExercices([...activeExercices, newExercice]);
      } else {
        setActiveExercices(
          activeExercices.filter((_, index) => index !== exerciceIndex)
        );
      }
    }
  };

  const handleAddFavorite = async (id: string) => {
    try {
      const { data } = await addFavorite({ variables: { id } });
      toast.success(data?.addExerciceFavorite, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetchFavorite();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de l'ajout en favoris de l'exercice"
      );
    }
  };

  const handleDeleteFavorite = async (id: string) => {
    try {
      const { data } = await deleteFavorite({ variables: { id } });
      toast.success(data?.deleteExerciceFavorite, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetchFavorite();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la suppression de l'exercice des favoris"
      );
    }
  };

  const handleDeleteExercice = async (id: string) => {
    try {
      toastIdRef.current = toast.loading("Suppression en cours...");
      const { data } = await deleteExercice({
        variables: { id },
      });
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
      toast.success(data?.deleteExerciceModel, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la suppression du modèle d'exercice"
      );
    }
  };

  const handleNavigate = (tab: number) => {
    setActiveTabId(tab);
  };

  const debouncedSearch = useDebouncedCallback((value?: string) => {
    setDebounceInput(value ?? "");
    setLoading(false);
  }, 300);

  const tabChoice = [
    {
      id: 1,
      icon: <RiLayoutGridFill size={20} />,
      title: "Tous",
      description: "Tous les exercices",
      type: FilterCardEnum.ALL,
      isActive: activeTabId === 1,
    },
    ...(canManageExercice
      ? [
          {
            id: 2,
            icon: <FaCircleUser size={20} />,
            title: "Mes exercices",
            description: "Exercices personnalisés",
            type: FilterCardEnum.MINE,
            isActive: activeTabId === 2,
          },
        ]
      : []),
    {
      id: 3,
      icon: <FaHeart size={20} />,
      title: "Favoris",
      description: "Exercices favoris",
      type: FilterCardEnum.FAVORITE,
      isActive: activeTabId === 3,
    },
    ...(canManageExercice
      ? [
          {
            id: 4,
            icon: <FaCirclePlus size={20} />,
            title: "Créer",
            description: "Créer un nouvel exercice",
            type: FilterCardEnum.NEW,
            isActive: activeTabId === 4,
          },
        ]
      : []),
  ];

  return (
    <section className="w-full flex flex-col items-start justify-start gap-4">
      <UpdateExerciceModal
        key={selectedId}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        exercice={
          allExercices.find((e) => selectedId === e.id) as ExerciceModel
        }
        allMuscles={allMuscleGroup}
        allCategories={allCategories}
        refetch={refetch}
      />
      <ExerciceInfo id={selectedId} isOpen={openInfo} setOpen={setOpenInfo} />
      <AnimatedWrapper
        animation="slideUp"
        className="flex w-full justify-start items-center gap-2"
      >
        {tabChoice.map((t) => (
          <div key={t.id} onClick={() => setActiveTabId(t.id)}>
            <FilterCard
              icon={t.icon}
              type={t.type}
              title={t.title}
              description={t.description}
              isActive={t.isActive}
            />
          </div>
        ))}
      </AnimatedWrapper>
      {activeTabId !== 4 ? (
        <section className="w-full flex flex-col justify-start items-center gap-4">
          <section className="w-full flex flex-col items-center justify-center gap-2">
            <section className="w-full h-full flex justify-center items-center gap-2">
              <Input
                placeholder="Rechercher un exercice ..."
                label="Recherche"
                startContent={<Search size={20} className="text-gray-500" />}
                value={input}
                onChange={(e) => {
                  setLoading(true);
                  setInput(e.target.value);
                  debouncedSearch(e.target.value);
                }}
              />
              <Button
                endContent={<FaFilter size={24} />}
                radius="sm"
                variant="light"
                className="w-[120px] h-12 relative"
                onPress={() => setShowFilter(!showFilter)}
              >
                {getCountFilter() > 0 && (
                  <AnimatedWrapper
                    animation="scale"
                    className="absolute top-0 right-[5px] bg-red-500 text-white text-sm px-2 py-0.5 rounded-full"
                  >
                    {getCountFilter()}
                  </AnimatedWrapper>
                )}
                <p className="text-xs text-gray-500">FILTRES</p>
              </Button>
            </section>
            {showFilter && (
              <AnimatedWrapper className="flex justify-center items-center gap-2 w-full">
                <div className="flex items-center gap-1 w-full h-full">
                  <ExerciceCategorySelect
                    category={category}
                    allCategories={allCategories}
                    setCategory={setCategory}
                  />
                </div>
                <div className="flex items-center gap-1 w-full h-full">
                  <MuscleGroupSelect
                    muscles={muscles}
                    allMuscles={allMuscleGroup}
                    setMuscles={setMuscles}
                  />
                </div>
                {getCountFilter() > 0 && (
                  <Tooltip
                    content="Réinitialiser"
                    showArrow={true}
                    color="foreground"
                    className="text-xs"
                    placement="bottom"
                  >
                    <div
                      className="p-3 rounded-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setCategory("");
                        setMuscles([]);
                      }}
                    >
                      <X size={20} />
                    </div>
                  </Tooltip>
                )}
              </AnimatedWrapper>
            )}
          </section>
          {loading || loadingExercice ? (
            <SkeletonExerciceCard
              skeletonLength={lengthExercice > 0 ? lengthExercice : 20}
            />
          ) : lengthExercice > 0 ? (
            <section className="grid grid-cols-4 2xl:grid-cols-5 w-full gap-1">
              {allExercices.map((e) => {
                const isActive = activeExercices?.find(
                  (exercice) => exercice.id === e.id
                );
                return (
                  <section
                    key={e.id}
                    className="relative h-[250px] overflow-hidden flex flex-col items-center justify-center shadow-md rounded-2xl border border-gray-300 cursor-pointer hover:border-gray-600"
                    onClick={() => handleClick(e as ExerciceModel)}
                  >
                    <ChooseExerciceCard
                      exercice={e as ExerciceModel}
                      isFavorite={favoriteExercices.includes(e.id)}
                      onFavorite={handleAddFavorite}
                      onDeleteFavorite={handleDeleteFavorite}
                      onDelete={handleDeleteExercice}
                      onEdit={(id: string) => {
                        setSelectedId(id);
                        setOpenEdit(true);
                      }}
                      onInfo={(id: string) => {
                        setSelectedId(id);
                        setOpenInfo(true);
                      }}
                    />
                    {isActive && !disableSelection && (
                      <div className="w-full h-full flex justify-center items-center absolute top-0 bg-green-400/20 rounded-2xl">
                        <motion.div
                          className="w-10 h-10 flex justify-center items-center rounded-full bg-green-400"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.5,
                          }}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white flex justify-center items-center rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.2 }}
                            >
                              <Check className="text-tertiary font-semibold w-3 h-3" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    )}
                  </section>
                );
              })}
            </section>
          ) : (
            <p className="w-full text-center text-sm mt-10 text-gray-500">
              Aucun exercice n'a été trouvé
            </p>
          )}
        </section>
      ) : (
        <CreateExercice
          allMuscleGroup={allMuscleGroup}
          allCategories={allCategories}
          onCreate={() => handleNavigate(2)}
        />
      )}
    </section>
  );
}
