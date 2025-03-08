import { Separator } from "@/components/ui/separator";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import SliderPrice from "./SliderPrice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/graphql/hooks";
import { useLocation, useNavigate } from "react-router-dom";

type SearchCoachProps = {
  loading: boolean;
};

export default function SearchCoach({ loading }: SearchCoachProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const allCatagories = dataCategories?.getAllCategories ?? [];
  const [price, setPrice] = useState<number[]>([50, 150]);
  const [name, setName] = useState<string>("");
  const [selectPrice, setSelectPrice] = useState<boolean>(false);
  const [categorie, setCategorie] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setName(params.get("input") || "");
    const priceParam = params.get("price");
    if (priceParam) {
      setSelectPrice(true);
      setPrice(priceParam.split(",").map(Number));
    }
    setCategorie(params.get("categorie") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePriceChange = (value: number | number[]) => {
    setSelectPrice(true);
    if (Array.isArray(value)) {
      setPrice(value);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("input", name);
    if (price[1] !== Number.MAX_VALUE && selectPrice)
      params.set("price", price.join(","));
    if (categorie) params.set("categorie", categorie);
    // Mettre à jour l'URL sans recharger la page
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const resetFilters = () => {
    setSelectPrice(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("price");
    url.searchParams.delete("input");
    url.searchParams.delete("categorie");
    // Mettre à jour l'URL sans recharger la page
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };
  return (
    <section className="w-full flex flex-col justify-center items-end gap-1">
      <section className="w-full h-[50px] flex justify-center items-center rounded-2xl overflow-hidden shadow-md">
        <Input
          radius="none"
          label="Nom du coach"
          className="h-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Separator orientation="vertical" />
        <Select
          className="max-w-xs"
          label="Catégorie d'offre"
          radius="none"
          selectedKeys={[categorie]}
          onChange={(e) => setCategorie(e.target.value)}
        >
          {allCatagories.map((categorie) => (
            <SelectItem key={categorie.id}>{categorie.label}</SelectItem>
          ))}
        </Select>
        <Separator orientation="vertical" />
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              className="h-full w-[40%] bg-gray-100 hover:bg-gray-300 rounded-none"
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
