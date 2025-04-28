import { Toaster } from "@/components/ui/sonner";
import { useLoginMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Button, Input } from "@heroui/react";
import {
  ArrowRightToLine,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
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
        navigate("/home");
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
      <form className="relative flex flex-col justify-center items-center gap-10 shadow-2xl rounded-xl min-w-[600px] py-28 z-10 bg-white">
        <div className="w-[150px]">
          <p className="font-logo text-primary text-7xl">LiftUp</p>
        </div>
        <p className="text-2xl font-bold">Accéder à mon compte</p>
        <section className="flex flex-col gap-2 w-[75%]">
          <Input
            ref={email}
            label="Email"
            isRequired
            isInvalid={error !== undefined}
            startContent={<Mail size={20} className="text-gray-500" />}
          />
          <div className="relative">
            <Input
              ref={password}
              type={`${showPassword ? "text" : "password"}`}
              isRequired
              isInvalid={error !== undefined}
              label="Mot de passe"
              startContent={<Lock size={20} className="text-gray-500" />}
              endContent={
                <>
                  <Eye
                    className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                      showPassword ? "block" : "hidden"
                    }`}
                    onClick={switchView}
                  />
                  <EyeOff
                    className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                      !showPassword ? "block" : "hidden"
                    }`}
                    onClick={switchView}
                  />
                </>
              }
            />
          </div>
          <Button
            type="submit"
            className="group shadow-none text-white h-[45px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {!loading && <ArrowRightToLine size={16} />}
            <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
              Se connecter
            </p>
          </Button>
          {/* <section className="w-full flex justify-end">
            <Button variant="link">
              <p className="text-xs">Mot de passe oublié ?</p>
            </Button>
          </section> */}
        </section>
        <section className="flex justify-center items-center gap-2">
          <p className="text-xs">Tu n'as pas encore de compte ?</p>
          <div
            className="text-primary cursor-pointer hover:text-blue-600 text-xs hover:underline"
            onClick={() => navigate("/signup")}
          >
            Créer un compte
          </div>
        </section>
      </form>
      <Toaster />
    </section>
  );
}
