import {
  ExerciceModel,
  useAddExerciceFavoriteMutation,
  useDeleteExerciceFavoriteMutation,
  useGetAllExercicesModelQuery,
  useGetAllMuscleGroupQuery,
  useGetFavoriteExercicesIdQuery,
} from "@/graphql/hooks";
import ChooseExerciceCard from "./ChooseExerciceCard";
import {
  BicepsFlexed,
  Check,
  CookingPot,
  Handshake,
  Heart,
  LayoutGrid,
  PlusCircle,
  Search,
  UserCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { useDebouncedCallback } from "@/services/useDebouncedCallback";
import SkeletonExerciceCard from "./SkeletonExerciceCard";
import { useUserStore } from "@/services/zustand/userStore";
import { toast } from "sonner";
import FilterCard from "./FilterCard";
import { FilterCardEnum } from "@/services/utils";

type TabExercicesProps = {
  activeExercices: ExerciceModel[] | null;
  setActiveExercices: (exercice: ExerciceModel[] | null) => void;
};

export default function TabExercices({
  activeExercices,
  setActiveExercices,
}: TabExercicesProps) {
  const currentUser = useUserStore((state) => state.user);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [input, setInput] = useState<string>("");
  const [debounceInput, setDebounceInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const { data: dataFavorite, refetch: refetchFavorite } =
    useGetFavoriteExercicesIdQuery();
  const [addFavorite] = useAddExerciceFavoriteMutation();
  const [deleteFavorite] = useDeleteExerciceFavoriteMutation();
  const { data } = useGetAllExercicesModelQuery({
    variables: {
      input: debounceInput,
      id: activeTabId === 2 ? currentUser?.id.toString() : "",
      getFavorite: activeTabId === 3,
      primary,
      secondary,
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: dataMuscleGroup } = useGetAllMuscleGroupQuery();
  const allExercices = data?.getAllExercicesModel ?? [];
  const favoriteExercices = dataFavorite?.getFavoriteExercicesId ?? [];
  const allMuscleGroup = dataMuscleGroup?.getAllMuscleGroup ?? [];

  const handleClick = (e: ExerciceModel) => {
    if (activeExercices === null) {
      setActiveExercices([e]);
    } else {
      const exerciceIndex = activeExercices.findIndex((ex) => ex.id === e.id);
      if (exerciceIndex === -1) {
        setActiveExercices([...activeExercices, e]);
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

  const debouncedSearch = useDebouncedCallback((value?: string) => {
    setDebounceInput(value ?? "");
    setLoading(false);
  }, 300);

  const tabChoice = [
    {
      id: 1,
      icon: <LayoutGrid size={20} />,
      title: "Tous",
      description: "Tous les exercices",
      type: FilterCardEnum.ALL,
      isActive: activeTabId == 1,
    },
    {
      id: 2,
      icon: <UserCircle size={20} />,
      title: "Mes exercices",
      description: "Exercices personnalisés",
      type: FilterCardEnum.MINE,
      isActive: activeTabId === 2,
    },
    {
      id: 3,
      icon: <Heart size={20} />,
      title: "Favoris",
      description: "Exercices favoris",
      type: FilterCardEnum.FAVORITE,
      isActive: activeTabId === 3,
    },
    {
      id: 4,
      icon: <PlusCircle size={20} />,
      title: "Créer",
      description: "Créer un nouvel exercice",
      type: FilterCardEnum.NEW,
      isActive: activeTabId === 4,
    },
  ];

  return (
    <section className="w-full flex flex-col items-start justify-start gap-4">
      <div className="flex w-full justify-start items-center gap-2">
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
      </div>
      <section className="w-full flex items-center gap-2">
        <Input
          placeholder="Rechercher un exercice"
          className="flex-1"
          startContent={<Search size={20} className="text-gray-500" />}
          value={input}
          onChange={(e) => {
            setLoading(true);
            setInput(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
        <div className="flex items-center gap-1 flex-1">
          <Select
            aria-label="Muscle principal"
            placeholder="Muscle principal"
            selectedKeys={primary ? [primary] : []}
            onChange={(e) => setPrimary(e.target.value)}
            startContent={<BicepsFlexed size={20} className="text-gray-500" />}
          >
            {allMuscleGroup.map((m) => (
              <SelectItem key={m.id} value={m.key}>
                {m.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Muscle secondaire"
            placeholder="Muscle secondaire"
            selectedKeys={secondary ? [secondary] : []}
            onChange={(e) => setSecondary(e.target.value)}
            startContent={<Handshake size={20} className="text-gray-500" />}
          >
            {allMuscleGroup.map((m) => (
              <SelectItem key={m.id} value={m.key}>
                {m.label}
              </SelectItem>
            ))}
          </Select>
          <Tooltip
            content="Réinitialiser"
            className="text-xs"
            showArrow={true}
            color="foreground"
          >
            <div
              className="hover:bg-black/5 hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
              onClick={() => {
                setPrimary("");
                setSecondary("");
              }}
            >
              <CookingPot size={20} className="text-gray-500" />
            </div>
          </Tooltip>
        </div>
      </section>
      {allExercices.length > 0 ? (
        !loading ? (
          <section className="flex flex-wrap justify-center w-full gap-4">
            {allExercices.map((e) => {
              const isActive = activeExercices?.find(
                (exercice) => exercice.id === e.id
              );
              return (
                <section
                  key={e.id}
                  className="relative w-[250px] h-[250px] overflow-hidden flex flex-col items-center justify-center shadow-md rounded-2xl border border-gray-300 cursor-pointer hover:border-gray-600"
                  onClick={() => handleClick(e)}
                >
                  <ChooseExerciceCard
                    exercice={e as ExerciceModel}
                    isFavorite={favoriteExercices.includes(e.id)}
                    onFavorite={handleAddFavorite}
                    onDelete={handleDeleteFavorite}
                  />
                  {isActive && (
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
          <SkeletonExerciceCard skeletonLength={allExercices.length} />
        )
      ) : (
        <p className="w-full text-center text-sm mt-10 text-gray-500">
          Aucun exercice n'a été trouvé
        </p>
      )}
    </section>
  );
}
