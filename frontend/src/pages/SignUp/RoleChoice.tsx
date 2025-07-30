import ShadowWrapper from "@/components/Wrapper/ShadowWrapper";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoleChoice() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-screen flex flex-col justify-center items-center p-10 gap-24">
      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-5xl font-semibold">
          Bienvenue sur{" "}
          <span className="font-logo text-primary text-6xl">LiftUp</span>
        </p>
        <p className="w-full flex justify-center text-2xl">Je suis ?</p>
      </div>
      <section className="w-full flex justify-center items-center gap-10">
        <ShadowWrapper className="h-[400px] w-[450px] rounded-2xl cursor-pointer hover:bg-gray-100">
          <div
            className="w-full h-full flex flex-col justify-center items-center"
            onClick={() => navigate("/signup/coach")}
          >
            <div className="flex justify-center">
              <img
                src="/icon_coach.webp"
                alt="Image Fixe"
                className="object-cover h-[250px]"
              />
            </div>
            <p className="text-2xl font-semibold">Coach</p>
          </div>
        </ShadowWrapper>
        <ShadowWrapper className="h-[400px] w-[450px] rounded-2xl cursor-pointer hover:bg-gray-100">
          <div
            className="w-full h-full flex flex-col justify-center items-center"
            onClick={() => navigate("/signup/student")}
          >
            <div className="flex justify-center">
              <img
                src="/icon_student.webp"
                alt="Image Fixe"
                className="object-cover h-[250px]"
              />
            </div>
            <p className="text-2xl font-semibold">Sportif</p>
          </div>
        </ShadowWrapper>
      </section>
      <section
        className="w-full flex justify-center items-center"
        onClick={() => navigate("/login")}
      >
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400 cursor-pointer transform transition-all duration-200 ease-in-out hover:text-dark hover:translate-x-1">
          <p>Tu as déjà un compte ?</p>
          <p>Se connecter</p>
          <ChevronRight size={16} />
        </div>
      </section>
    </section>
  );
}
