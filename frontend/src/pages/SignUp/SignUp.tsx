import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Tooltip } from "@heroui/tooltip";
import { Eye, EyeOff, Info, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function SignUp() {
  const { role } = useParams();
  const setStore = useUserStore((state) => state.set);
  const [signup, { loading }] = useSignupMutation();
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const confirmedPassword = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const switchView = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    try {
      const result = await signup({
        variables: {
          data: {
            email: email?.current?.value as string,
            firstname: firstname?.current?.value as string,
            lastname: lastname?.current?.value as string,
            password: password?.current?.value as string,
            confirmedPassword: confirmedPassword?.current?.value as string,
            roles: role?.toLocaleUpperCase() as string,
          },
        },
      });
      if (result.data) {
        const profile = JSON.parse(result.data.signUp);
        setStore(profile);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <Toaster />
      <div className="flex justify-center items-center fixed right-0 top-0 w-1/2 h-full z-0">
        <div className="w-full h-full overflow-hidden">
          <img
            src="../../../public/imagesignup.webp"
            alt="Image Fixe"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <form className="relative flex flex-col justify-center items-center gap-10 shadow-2xl rounded-xl w-[40%] h-auto py-4 z-10 bg-white">
        <div className="w-[150px]">
          <p className="font-logo text-primary text-7xl">LiftUp</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl font-bold">Rejoins l'équipe LiftUp</p>
          <p className="text-xs">Défie la gravité !</p>
        </div>
        <section className="flex flex-col gap-2 w-[75%]">
          <div className="flex justify-center items-center gap-2">
            <Input ref={firstname} placeholder="Prénom" />
            <Input ref={lastname} placeholder="Nom" />
          </div>
          <Input
            ref={email}
            placeholder="Email"
            //className={`${error && "border border-red-500 bg-white"}`}
          />
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="w-full relative">
              <Input
                ref={password}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Mot de passe"
                //className={`${error && "border border-red-500"}`}
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
            <div className="w-full relative">
              <Input
                ref={confirmedPassword}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Confirmer le mot de passe"
                //className={`${error && "border border-red-500"}`}
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
          </div>
          {/* {error && (
            <p className="text-red-500 text-xs">
              Adresse e-mail ou mot de passe incorrect.
            </p>
          )} */}
          <section className="w-full flex justify-end pr-3">
            <Tooltip
              className="text-xs"
              content={
                <div className="flex flex-col items-start justify-center p-2">
                  <p>Le mot de passe doit contenir :</p>
                  <p>- Une majuscule</p>
                  <p>- Une minuscule</p>
                  <p>- Un chiffre</p>
                  <p>- Un caractère spécial</p>
                </div>
              }
              showArrow={true}
              color="foreground"
              placement="bottom"
            >
              <Info
                size={18}
                className="text-gray-400 cursor-pointer hover:text-black"
              />
            </Tooltip>
          </section>
          <Button
            type="submit"
            className="bg-primary hover:bg-blue-600"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            S'inscrire
          </Button>
        </section>
        <section className="flex justify-center items-center">
          <p className="text-xs">
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
      </form>
    </section>
  );
}
