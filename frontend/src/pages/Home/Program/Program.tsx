import Configuration from "./components/Configuration";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Program() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeSection = searchParams.get("section");
  const isConfiguration = activeSection === "configuration";
  return (
    <section className="relative w-full h-full flex flex-col justify-start items-center rounded-2xl px-4 py-8 gap-4">
      {!isConfiguration && (
        <Button
          className="group h-12 w-1/4 my-5 rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
          onClickCapture={() =>
            navigate("/home?tab=program&section=configuration")
          }
        >
          <PlusCircle />
          <p className="transition-all duration-200 group-hover:translate-x-1">
            Créer un nouveau programme
          </p>
        </Button>
      )}
      {isConfiguration && <Configuration />}
    </section>
  );
}
