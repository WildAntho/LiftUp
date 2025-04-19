import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useLoginMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const setStore = useUserStore((state) => state.set);
  const [login, { loading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const switchView = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const result = await login({
        variables: {
          data: {
            email: email.current ? email.current.value : "",
            password: password.current ? password.current.value : "",
          },
        },
      });
      if (result.data) {
        const profile = JSON.parse(result.data.login);
        setStore(profile);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message, {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
      }
    }
  };

  return (
    <section className="relative flex items-center justify-center w-screen h-screen bg-white">
      <Toaster />
      <div className="flex justify-center items-center fixed left-0 top-0 w-1/2 h-full z-0">
        <div className="w-full h-full overflow-hidden">
          <img
            src="/login.webp"
            alt="Image Fixe"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <form className="relative flex flex-col justify-center items-center gap-10 shadow-2xl rounded-xl w-[40%] h-[70%] z-10 bg-white">
        <div className="w-[150px]">
          <p className="font-logo text-primary text-7xl">LiftUp</p>
        </div>
        <p className="text-2xl font-bold">Accéder à mon compte</p>
        <section className="flex flex-col gap-2 w-[75%]">
          <Input
            ref={email}
            placeholder="Email"
            className={`${error && "border border-red-500 bg-white"}`}
          />
          <div className="relative">
            <Input
              ref={password}
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Mot de passe"
              className={`${error && "border border-red-500"}`}
            />
            <Eye
              className={`absolute right-5 top-[6px] text-gray-400 hover:text-gray-500 cursor-pointer ${
                showPassword ? "block" : "hidden"
              }`}
              onClick={switchView}
            />
            <EyeOff
              className={`absolute right-5 top-[6px] text-gray-400 hover:text-gray-500 cursor-pointer ${
                !showPassword ? "block" : "hidden"
              }`}
              onClick={switchView}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs">
              Adresse e-mail ou mot de passe incorrect.
            </p>
          )}
          <Button
            type="submit"
            className="bg-primary hover:bg-blue-600"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Se connecter
          </Button>
          <section className="w-full flex justify-end">
            <Button variant="link">
              <p className="text-xs">Mot de passe oublié ?</p>
            </Button>
          </section>
        </section>
        <section className="flex justify-center items-center">
          <p className="text-xs">Tu n'as pas encore de compte ?</p>
          <Button
            variant="link"
            className="text-primary hover:text-blue-600 text-xs"
            onClick={() => navigate("/signup")}
          >
            Créer un compte
          </Button>
        </section>
      </form>
      <Toaster />
    </section>
  );
}
