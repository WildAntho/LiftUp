import { Toaster } from "@/components/ui/sonner";
import { useLoginMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Button, Input } from "@heroui/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import ShadowWrapper from "@/components/Wrapper/ShadowWrapper";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";

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
    <section className="relative flex items-center justify-center w-screen h-screen bg-primary/10">
      <Toaster position="top-right" />
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
      <AnimatedWrapper className="w-[600px] relative flex items-center justify-center">
        <ShadowWrapper className="w-full flex flex-col justify-center items-center gap-10 px-8 py-[60px] bg-white rounded-xl">
          <section className="w-full flex flex-col items-center justify-center gap-6">
            <div className="relative inline-block">
              <p className="text-4xl font-black font-inter text-gray-700">
                Ravi de te revoir sur{" "}
                <span className="text-primary">LiftUp !</span>
              </p>
              <span className="absolute -bottom-2 left-0 h-1.5 w-32 bg-primary rounded-full" />
            </div>
            <p className="text-medium text-gray-500 w-[550px] text-center px-2">
              <span className="font-semibold">
                Simplifiez votre expérience du coaching sportif
              </span>{" "}
              avec une plateforme claire et conçue pour coachs et élèves.
            </p>
          </section>
          <section className="flex flex-col gap-2 w-full">
            <p className="text-2xl font-bold pb-2 font-inter text-gray-700 pl-2">
              Se connecter
            </p>
            <Input
              data-testid="email-input"
              ref={email}
              label="Email"
              isRequired
              isInvalid={error !== undefined}
              startContent={<IoMail size={20} className="text-gray-500" />}
            />
            <div className="relative">
              <Input
                data-testid="password-input"
                ref={password}
                type={`${showPassword ? "text" : "password"}`}
                isRequired
                isInvalid={error !== undefined}
                label="Mot de passe"
                startContent={<FaLock size={18} className="text-gray-500" />}
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
              data-testid="connection-button"
              type="submit"
              className="group shadow-none text-white h-[45px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                Se connecter
              </p>
            </Button>
            <section className="w-full flex justify-center items-center">
              <div className="w-full flex justify-end gap-2 text-sm text-gray-400 cursor-pointer transform transition-all duration-200 ease-in-out hover:text-dark hover:translate-x-1">
                <p>Mot de passe oublié ?</p>
              </div>
            </section>
          </section>
          <section
            className="w-full flex justify-center items-center"
            onClick={() => navigate("/signup")}
          >
            <div className="flex justify-center items-center gap-2 text-sm text-gray-400 cursor-pointer transform transition-all duration-200 ease-in-out hover:text-dark hover:translate-x-1">
              <p>Tu n'as pas encore de compte ?</p>
              <p className="font-bold">Créer un compte</p>
            </div>
          </section>
        </ShadowWrapper>
      </AnimatedWrapper>
      {/* <div className="flex justify-center items-center w-1/2 h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src="/login.webp"
            alt="Image Fixe"
            className="object-cover w-full h-full"
          />
        </div>
      </div> */}
    </section>
  );
}
