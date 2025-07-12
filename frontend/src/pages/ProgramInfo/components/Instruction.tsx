import { Separator } from "@/components/ui/separator";
import { FaQuestionCircle } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { BsCalendar2EventFill } from "react-icons/bs";

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
      <div className="flex flex-col items-start justify-center gap-5 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">1</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Choisis la date de début <BsCalendar2EventFill size={14} />
            </p>
            <p className="text-xs text-gray-500">
              Définis la date qui correspond le mieux à ton emploi du temps et
              tes objectifs.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">2</p>
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
            <p className="text-primary font-bold">3</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Tes séances sont créées automatiquement
              <FaCalendarPlus />
            </p>
            <p className="text-xs text-gray-500">
              Reçois un planning sur-mesure adapté à tes objectifs et à ton
              niveau.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex justify-center items-center">
            <p className="text-primary font-bold">4</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold flex items-center gap-2">
              Tout est prêt ! <FaCircleCheck />
            </p>
            <p className="text-xs text-gray-500">
              Retrouves tes séances dans ton calendrier et suis ta progression
              au quotidien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
