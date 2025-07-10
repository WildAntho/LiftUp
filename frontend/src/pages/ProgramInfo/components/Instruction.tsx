import { Separator } from "@/components/ui/separator";
import { FaQuestionCircle } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

export default function Instruction() {
  return (
    <section className="flex flex-col items-start justify-start gap-5 my-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <FaQuestionCircle size={20} />
          Comment ça marche ?
        </p>
        <Separator />
      </div>
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">1</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Adopte le plan ! <IoRocket />
            </p>
            <p className="text-xs text-gray-500">Paiement simple et sécurisé</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">2</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Les entraînements apparaissent sut ton calendrier !{" "}
              <FaCalendarPlus />
            </p>
            <p className="text-xs text-gray-500">
              Choisi la date de début du programme lors du paiement
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">3</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Tout est prêt ! <FaCircleCheck />
            </p>
            <p className="text-xs text-gray-500">
              Tu as la main sur tous tes entraînements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
