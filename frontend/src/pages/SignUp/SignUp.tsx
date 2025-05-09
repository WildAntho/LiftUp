import { useSignupMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";
import {
  ArrowRightToLine,
  BadgeHelp,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
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
  const [sex, setSex] = useState("");
  const allSex = [
    { key: "female", label: "Femme" },
    { key: "male", label: "Homme" },
  ];
  const confirmedPassword = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const switchView = () => {
    setShowPassword(!showPassword);
  };
  const switchViewConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            sex: sex,
            roles: role?.toLocaleUpperCase() as string,
          },
        },
      });
      if (result.data) {
        const profile = JSON.parse(result.data.signUp);
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
    <section className="flex items-center justify-center w-screen h-screen">
      <Toaster />
      <div className="flex justify-center items-center w-1/2 h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src="/imagesignup.webp"
            alt="Image Fixe"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <form className="relative w-1/2 flex flex-col justify-center items-center gap-10 h-full bg-white">
        <div className="w-[150px]">
          <p className="font-logo text-primary text-7xl">LiftUp</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl font-bold">Rejoins l'équipe LiftUp</p>
          <p className="text-xs">Défie la gravité !</p>
        </div>
        <section className="flex flex-col gap-2 w-[75%]">
          <div className="flex justify-center items-center gap-2">
            <Input
              ref={firstname}
              label="Prénom"
              isRequired
              startContent={<BadgeHelp size={20} className="text-gray-500" />}
            />
            <Input
              ref={lastname}
              label="Nom"
              isRequired
              startContent={<User size={20} className="text-gray-500" />}
            />
          </div>
          <Select
            label="Genre"
            placeholder="Quel est votre genre ?"
            startContent={<Shield size={20} className="text-gray-500" />}
            selectedKeys={[sex]}
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            {allSex.map((s) => (
              <SelectItem key={s.key} value={s.key}>
                {s.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            ref={email}
            label="Email"
            isRequired
            startContent={<Mail size={20} className="text-gray-500" />}
          />
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="w-full relative">
              <Input
                ref={password}
                type={`${showPassword ? "text" : "password"}`}
                label="Mot de passe"
                isRequired
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
            <div className="w-full relative">
              <Input
                ref={confirmedPassword}
                type={`${showConfirmPassword ? "text" : "password"}`}
                label="Confirmer le mot de passe"
                isRequired
                startContent={
                  <CheckCircle size={20} className="text-gray-500" />
                }
                endContent={
                  <>
                    <Eye
                      className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                        showConfirmPassword ? "block" : "hidden"
                      }`}
                      onClick={switchViewConfirm}
                    />
                    <EyeOff
                      className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                        !showConfirmPassword ? "block" : "hidden"
                      }`}
                      onClick={switchViewConfirm}
                    />
                  </>
                }
              />
            </div>
          </div>
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
            className="group shadow-none text-white h-[45px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
            onPress={handleSignup}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {!loading && <ArrowRightToLine size={16} />}
            <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
              S'inscrire
            </p>
          </Button>
        </section>
        <section className="w-full flex justify-center items-center">
          <p className="flex justify-center items-center gap-2 text-xs">
            Tu as déjà un compte ? 😁{" "}
            <div
              className="text-primary hover:text-blue-600 text-xs hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </div>
          </p>
        </section>
      </form>
    </section>
  );
}
