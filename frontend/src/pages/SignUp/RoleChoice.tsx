import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RoleChoice() {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center p-16">
        <p className="text-5xl font-semibold">
          Bienvenue sur{" "}
          <span className="font-logo text-primary text-6xl">LiftUp</span>
        </p>
      </div>
      <p className="w-full flex justify-center text-2xl">Je suis ?</p>
      <section className="w-full flex justify-center items-center flex-1 gap-10">
        <div
          className="flex flex-col justify-center items-center h-[400px] w-[450px] rounded-2xl shadow-sm cursor-pointer border border-gray-200 transition-all duration-100 hover:shadow-2xl hover:scale-[1.01]"
          onClick={() => navigate("/signup/coach")}
        >
          <div className="flex justify-center">
            <img
              src="../../../public/icon_coach.png"
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
              src="../../../public/icon_student.png"
              alt="Image Fixe"
              className="object-cover h-[250px]"
            />
          </div>
          <p className="text-2xl font-semibold">Sportif</p>
        </div>
      </section>
      <p className="text-xs p-4">
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
