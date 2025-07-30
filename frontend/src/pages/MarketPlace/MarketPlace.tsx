import {
  Program,
  ProgramLevel,
  useGetProgramsMarketPlaceQuery,
} from "@/graphql/hooks";
import ProgramCard from "./component/ProgramCard";
import SearchBar from "@/components/MarketPlace/SearchBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkeletonMarketplace from "../../components/SkeletonMarketPlace";
import IllustrationProgram from "./component/IllustrationProgram";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";

type FormSearch = {
  price: number[];
  categorie: string;
  level: ProgramLevel | null;
};

export default function MarketPlace() {
  const location = useLocation();
  const [loadingMarket, setLoadingMarket] = useState<boolean>(true);
  const [formSearch, setFormSearch] = useState<FormSearch>({
    price: [10, Number.MAX_VALUE],
    categorie: "",
    level: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const priceParam = params.get("price");
    const price = priceParam
      ? priceParam.split(",").map(Number)
      : [10, Number.MAX_VALUE];
    const categorie = params.get("categorie") || "";
    const level = params.get("level") || null;

    const time = setTimeout(() => {
      setLoadingMarket(false);
    }, 300);
    setFormSearch({
      price,
      categorie,
      level: level as ProgramLevel,
    });
    return () => clearTimeout(time);
  }, [location]);

  const { data, loading: loadingProgram } = useGetProgramsMarketPlaceQuery({
    variables: {
      price: formSearch.price[1] !== Number.MAX_VALUE ? formSearch.price : [],
      categorie: formSearch.categorie,
      level: formSearch.level,
    },
    fetchPolicy: "cache-and-network",
  });

  const allPrograms = data?.getProgramsMarketPlace ?? [];

  const loading = loadingMarket || loadingProgram;

  const handleSearch = () => {
    setLoadingMarket(true);
    setTimeout(() => setLoadingMarket(false), 300);
  };

  return (
    <AnimatedWrapper className="h-full w-full pb-4 gap-4 flex flex-col justify-start items-center overflow-y-auto bg-gray-100">
      <div className="w-full">
        <IllustrationProgram />
      </div>

      <section className="w-[80%] 2xl:w-[100rem] min-h-full rounded-2xl flex flex-col justify-start items-center gap-7">
        <section className="relative w-[90%] flex flex-col justify-start items-center gap-2">
          {loading ? (
            <SkeletonMarketplace />
          ) : (
            <>
              <div className="w-full flex flex-col justify-center items-end mb-2 gap-1">
                <SearchBar
                  loading={false}
                  withName={false}
                  onSearch={handleSearch}
                />
              </div>
              {allPrograms.length > 0 ? (
                allPrograms.map((p) => (
                  <div key={p.id} className="w-full">
                    <ProgramCard program={p as Program} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucun programme trouvé.</p>
              )}
            </>
          )}
        </section>
      </section>
    </AnimatedWrapper>
  );
}
