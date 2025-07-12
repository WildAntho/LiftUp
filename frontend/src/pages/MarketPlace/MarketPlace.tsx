import { Program, useGetProgramsMarketPlaceQuery } from "@/graphql/hooks";
import ProgramCard from "./component/ProgramCard";

export default function MarketPlace() {
  const { data } = useGetProgramsMarketPlaceQuery();
  const allPrograms = data?.getProgramsMarketPlace ?? [];
  return (
    <section className="h-full w-full pb-4 gap-4 flex flex-col justify-start items-center overflow-y-auto bg-gray-100">
      <div className="w-full h-[250px]">
        <img
          src="/marketbanner.webp"
          className="object-cover w-full h-full object-top"
        />
      </div>
      <section className="w-[80%] 2xl:w-[100rem] min-h-full rounded-2xl flex flex-col justify-start items-center gap-7">
        <section className="relative w-[90%] flex flex-col justify-start items-center gap-2">
          {allPrograms.map((p) => (
            <div key={p.id} className="w-full">
              <ProgramCard program={p as Program} />
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}
