import { Button } from "@/components/ui/button";
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
        <div
          className="flex flex-col justify-center items-center h-[400px] w-[450px] rounded-2xl shadow-sm cursor-pointer border border-gray-200 transition-all duration-100 hover:shadow-2xl hover:scale-[1.01]"
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
        <div
          className="flex flex-col justify-center items-center h-[400px] w-[450px] rounded-2xl shadow-sm cursor-pointer border border-gray-200 transition-all duration-100 hover:shadow-2xl hover:scale-[1.01]"
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
      </section>
      <p className="absolute bottom-0 text-xs p-4">
        Tu as déjà un compte ? 😁{" "}
        <Button
          variant="link"
          className="text-primary hover:text-blue-600 text-xs"
          onClick={() => navigate("/login")}
        >
          Se connecter
        </Button>
      </p>
    </section>
  );
}
