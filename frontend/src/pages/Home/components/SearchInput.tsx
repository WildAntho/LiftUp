import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type SearchInputProps = {
  open: boolean;
  setInput: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ open, setInput }: SearchInputProps) {
  const [search, setSearch] = useState<string>("");

  return (
    <section className="w-full flex flex-col justify-center items-end">
      <section className="flex justify-center items-center w-full pt-5 pb-2 gap-3 relative">
        <Search />
        <Input
          value={search}
          onChange={(e) => {
            setInput(e.target.value);
            setSearch(e.target.value);
          }}
          placeholder="Rechercher un(e) élève"
          className={`placeholder:text-xs transition duration-150 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <X
          className={`absolute right-[10px] size-4 cursor-pointer text-gray-300 hover:text-gray-500 ${
            open && search.length > 0 ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => {
            setInput("");
            setSearch("");
          }}
        />
      </section>
    </section>
  );
}
