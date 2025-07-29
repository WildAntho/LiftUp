import { Separator } from "@/components/ui/separator";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ProgramLevel, useGetAllCategoriesQuery } from "@/graphql/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import SliderPrice from "@/pages/MyCoach/components/SliderPrice";
import { allLevel } from "@/services/utils";

type SearchbarProps = {
  loading: boolean;
  withName?: boolean;
  withLevel?: boolean;
  onSearch: () => void;
};

export default function SearchBar({
  loading,
  withName = true,
  withLevel = true,
  onSearch,
}: SearchbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const allCatagories = dataCategories?.getAllCategories ?? [];
  const [price, setPrice] = useState<number[]>([50, 150]);
  const [name, setName] = useState<string>("");
  const [selectPrice, setSelectPrice] = useState<boolean>(false);
  const [categorie, setCategorie] = useState<string>("");
  const [level, setLevel] = useState<ProgramLevel | "">("");

  const handleResetState = () => {
    setPrice([50, 150]);
    setName("");
    setCategorie("");
    setLevel("");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setName(params.get("input") || "");
    const priceParam = params.get("price");
    if (priceParam) {
      setSelectPrice(true);
      setPrice(priceParam.split(",").map(Number));
    }
    setCategorie(params.get("categorie") || "");
    setLevel((params.get("level") as ProgramLevel) || "");
  }, [location.search]);

  const handlePriceChange = (value: number | number[]) => {
    setSelectPrice(true);
    if (Array.isArray(value)) {
      setPrice(value);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (withName && name) params.set("input", name);
    if (price[1] !== Number.MAX_VALUE && selectPrice)
      params.set("price", price.join(","));
    if (categorie) params.set("categorie", categorie);
    if (level && withLevel) params.set("level", level);
    // Mettre à jour l'URL sans recharger la page
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    if (params.size > 0) onSearch();
  };

  const resetFilters = () => {
    handleResetState();
    setSelectPrice(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("price");
    url.searchParams.delete("input");
    url.searchParams.delete("categorie");
    url.searchParams.delete("level");
    // Mettre à jour l'URL sans recharger la page
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };
  return (
    <section className="w-full flex flex-col justify-center items-end gap-1">
      <section className="w-full h-[50px] flex justify-center items-center rounded-2xl overflow-hidden shadow-sm">
        {withName && (
          <Input
            radius="none"
            label="Nom du coach"
            className="h-full "
            classNames={{
              inputWrapper: "bg-white",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Separator orientation="vertical" />
        <Select
          className="max-w-xs"
          label="Catégorie d'offre"
          radius="none"
          classNames={{
            trigger: "bg-white hover:bg-gray-100",
          }}
          selectedKeys={[categorie]}
          onChange={(e) => setCategorie(e.target.value)}
        >
          {allCatagories.map((categorie) => (
            <SelectItem key={categorie.id}>{categorie.label}</SelectItem>
          ))}
        </Select>
        <Separator orientation="vertical" />
        {withLevel && (
          <Select
            className="max-w-xs"
            label="Niveau"
            radius="none"
            classNames={{
              trigger: "bg-white hover:bg-gray-100",
            }}
            selectedKeys={[level]}
            onChange={(e) => setLevel(e.target.value as ProgramLevel)}
          >
            {allLevel.map((level) => (
              <SelectItem key={level.key}>{level.label}</SelectItem>
            ))}
          </Select>
        )}
        <Separator orientation="vertical" />
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              className="h-full w-[40%] bg-white hover:bg-gray-100 rounded-none"
              onClick={() => setSelectPrice(true)}
            >
              {!selectPrice ? (
                <p className="text-gray-500">Prix €</p>
              ) : (
                <p className="font-semibold text-black">
                  {price.join(" - ")} €
                </p>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <SliderPrice price={price} setPrice={handlePriceChange} />
          </PopoverContent>
        </Popover>
        <Button
          color="primary"
          className="h-full w-[40%] rounded-none bg-primary hover:bg-blue-600"
          disabled={loading}
          onClick={handleSearch}
        >
          {loading && <Loader2 className="animate-spin" />}
          Rechercher
        </Button>
      </section>
      <p
        className="text-xs text-primary hover:underline cursor-pointer mr-2"
        onClick={resetFilters}
      >
        Réinitialiser les filtres
      </p>
    </section>
  );
}
