import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";
import ShadowWrapper from "@/components/Wrapper/ShadowWrapper";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoleChoice() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-screen flex flex-col justify-center items-center p-10 gap-24 ">
      <svg
        className="absolute bottom-0 left-0 w-full h-[35vh]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#3B82F6"
          d="M0,160 C360,280 1080,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <div className="relative inline-block">
          <p className="text-5xl font-black font-inter text-gray-700">
            Bienvenue sur <span className="text-primary">LiftUp !</span>
          </p>
          <span className="absolute -bottom-2 left-0 h-1.5 w-32 bg-primary rounded-full" />
        </div>
        <p className="w-full flex justify-center text-2xl">Je suis ?</p>
      </div>
      <AnimatedWrapper className="w-full flex justify-center items-center gap-10 z-10">
        <ShadowWrapper className="h-[400px] w-[450px] rounded-2xl cursor-pointer bg-white hover:bg-gray-100">
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
        <ShadowWrapper className="h-[400px] w-[450px] rounded-2xl cursor-pointer bg-white hover:bg-gray-100">
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
      </AnimatedWrapper>
      <section
        className="absolute bottom-10 w-full flex justify-center items-center z-10"
        onClick={() => navigate("/login")}
      >
        <div className="flex justify-center items-center gap-2 text-sm text-white cursor-pointer transform transition-all duration-200 ease-in-out hover:text-gray-800 hover:translate-x-1">
          <p>Tu as déjà un compte ?</p>
          <p>Se connecter</p>
          <ChevronRight size={16} />
        </div>
      </section>
    </section>
  );
}
