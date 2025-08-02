import { useSignupMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { ApolloError } from "@apollo/client";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";
import { Eye, EyeOff, Info, Loader2 } from "lucide-react";
import { ReactElement, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoShieldSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FiTrendingUp } from "react-icons/fi";
import { MdTimer } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import ShadowWrapper from "@/components/Wrapper/ShadowWrapper";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";

type Features = {
  id: number;
  title: string;
  description: string;
  icon: ReactElement;
};

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

  const features: Features[] = [
    {
      id: 1,
      title: "Entraînements",
      description: "Crée des entraînement sur mesure !",
      icon: <GiWeightLiftingUp size={32} />,
    },
    {
      id: 2,
      title: "Suivi personnalisé",
      description:
        role === "coach"
          ? "Suis tous tes élèves en temps réel !"
          : "Collabore avec des coachs spécialisés pour progresser dans ta pratique !",
      icon: <FiTrendingUp size={32} />,
    },
    {
      id: 3,
      title: "Programmes",
      description:
        role === "coach"
          ? "Construis des programmes adaptés à tout niveau !"
          : "Trouve le programme qui te correspond le mieux !",
      icon: <MdTimer size={32} />,
    },
    {
      id: 4,
      title: "Et bien plus encore !",
      description:
        role === "coach"
          ? "Offres de coaching, équipes, vidéos d'exercices ..."
          : "Banque d'exercices, marketplace, feedback ...",
      icon: <BsThreeDots size={32} />,
    },
  ];

  return (
    <section className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-primary/10">
      <Toaster position="top-right" />
      {/* <div className="absolute bottom-[-300px] left-[-60px] w-[700px] h-[500px] bg-primary rounded-full opacity-20 blur-3xl z-0" /> */}
      <svg
        className="absolute top-0 left-0 w-full h-[45vh]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#3B82F6"
          d="M0,160 C360,280 1080,0 1440,160 L1440,0 L0,0 Z"
        />
      </svg>

      <AnimatedWrapper className="w-1/2 h-full flex justify-end items-center p-8">
        <div className="h-full flex flex-col justify-center items-center gap-6 z-10">
          {features.map((f, i) => (
            <ShadowWrapper
              key={f.id}
              className="w-[550px] flex items-center justify-start gap-10 rounded-xl py-8 pl-8 pr-4 bg-white"
              style={{ marginLeft: `${i * 30}px` }}
            >
              <div className="min-w-[70px] h-[70px] bg-primary rounded-xl flex justify-center items-center -rotate-6 text-white shadow-[4px_4px_0_rgba(59,130,246,0.5)]">
                {f.icon}
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="font-bold text-lg text-dark">{f.title}</p>
                <p className="text-gray-500 text-sm">{f.description}</p>
              </div>
            </ShadowWrapper>
          ))}
        </div>
      </AnimatedWrapper>
      <AnimatedWrapper className="h-full w-1/2 flex flex-col items-start justify-center p-8 z-10">
        <ShadowWrapper className="rounded-xl bg-white max-w-[600px] p-4 pt-8">
          <section className="w-full flex flex-col items-center justify-center gap-6">
            <div className="relative inline-block">
              <p className="text-4xl font-black font-inter text-gray-700">
                Bienvenue sur <span className="text-primary">LiftUp !</span>
              </p>
              <span className="absolute -bottom-2 left-0 h-1.5 w-32 bg-primary rounded-full" />
            </div>
            {role === "coach" ? (
              <p className="text-medium text-gray-500 w-[550px] text-center px-2">
                <span className="font-semibold">
                  Valorise ton expertise, sans compromis.
                </span>{" "}
                Grâce à notre plateforme, crée des programmes sur mesure, gère
                le suivi de tes élèves en toute simplicité.
              </p>
            ) : (
              <p className="text-medium text-gray-500 w-[550px] text-center">
                <span className="font-semibold">
                  Un coaching pensé pour toi, enfin !
                </span>{" "}
                Accède à des entraînements personnalisés, suis ta progression en
                temps réel, et échange directement avec ton coach.
              </p>
            )}
          </section>
          <form className="relative flex items-center justify-center w-full bg-white">
            <div className="w-full p-8 flex flex-col justify-center items-center gap-2">
              <section className="flex flex-col gap-2 w-full">
                <p className="text-2xl font-bold pb-2 font-inter text-gray-700 pl-2">
                  S'inscrire
                </p>
                <div className="flex justify-center items-center gap-2">
                  <Input
                    ref={firstname}
                    label="Prénom"
                    isRequired
                    startContent={
                      <FaQuestionCircle size={20} className="text-gray-500" />
                    }
                  />
                  <Input
                    ref={lastname}
                    label="Nom"
                    isRequired
                    startContent={
                      <FaUser size={16} className="text-gray-500" />
                    }
                  />
                </div>
                <Select
                  label="Genre"
                  placeholder="Quel est votre genre ?"
                  startContent={
                    <IoShieldSharp size={20} className="text-gray-500" />
                  }
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
                  startContent={<IoMail size={20} className="text-gray-500" />}
                />
                <div className="flex flex-col justify-center items-center gap-2 w-full">
                  <div className="w-full relative">
                    <Input
                      ref={password}
                      type={`${showPassword ? "text" : "password"}`}
                      label="Mot de passe"
                      isRequired
                      startContent={
                        <FaLock size={18} className="text-gray-500" />
                      }
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
                        <FaCheckCircle size={20} className="text-gray-500" />
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
                  <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                    S'inscrire
                  </p>
                </Button>
              </section>
              <section
                className="w-full flex justify-center items-center my-2"
                onClick={() => navigate("/login")}
              >
                <div className="flex justify-center items-center gap-2 text-sm text-gray-400 cursor-pointer transform transition-all duration-200 ease-in-out hover:text-dark hover:translate-x-1">
                  <p>Tu as déjà un compte ?</p>
                  <p className="font-bold">Se connecter</p>
                </div>
              </section>
            </div>
          </form>
        </ShadowWrapper>
      </AnimatedWrapper>
    </section>
  );
}
