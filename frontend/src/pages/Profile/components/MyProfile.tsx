import { useUserStore } from "@/services/zustand/userStore";
import {
  Award,
  BadgeHelp,
  Eye,
  EyeOff,
  Info,
  Lock,
  MailIcon,
  Shield,
  Upload,
  User,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import CardRole from "./CardRole";
import { UserRole, useUpdateProfileMutation } from "@/graphql/hooks";
import { uploadURL } from "@/services/utils";
import { Input, Select, SelectItem } from "@heroui/react";
import { toast } from "sonner";
import Saving from "@/components/Saving";
import { useDebouncedCallback } from "@/services/hooks/useDebouncedCallback";
import { FaMars, FaVenus } from "react-icons/fa";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export default function MyProfile() {
  const [updateProfile] = useUpdateProfileMutation();
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.set);
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentUser?.avatar ? `${uploadURL + currentUser.avatar}` : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);
  const [firstname, setFirstname] = useState<string | undefined>(
    currentUser?.firstname
  );
  const [lastname, setLastname] = useState<string | undefined>(
    currentUser?.lastname
  );
  const [sex, setSex] = useState(currentUser?.sex ?? "");
  const allSex = [
    { key: "female", label: "Femme" },
    { key: "male", label: "Homme" },
  ];
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const renderIconSex = () => {
    switch (sex) {
      case "female":
        return <FaVenus size={20} className="text-gray-500" />;
      case "male":
        return <FaMars size={20} className="text-gray-500" />;
      default:
        <Shield size={20} className="text-gray-500" />;
    }
  };
  const [fileError, setFileError] = useState<string | null>(null);

  const data = {
    firstname: firstname as string,
    lastname: lastname as string,
    sex,
  };

  const handleUpdate = async () => {
    const file =
      fileInputRef &&
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0];
    let avatarUrl = "";
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("L'image ne doit pas dépasser 1 Mo", {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(`${uploadURL}/upload`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          avatarUrl = data.filename;
        } else {
          // Gestion des erreurs de réponse du serveur
          const errorData = await response.json();
          toast.error(
            errorData.message || "Erreur lors de l'upload de l'image",
            {
              style: {
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
              },
            }
          );
          return;
        }
      } catch (error) {
        console.error({ error });
        toast.error("Erreur lors de l'upload de l'image", {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
        return;
      }
    }

    try {
      const user = await updateProfile({
        variables: {
          data: {
            ...data,
            avatar: avatarUrl || currentUser?.avatar || "",
          },
        },
      });

      if (user.data) {
        const newUser = user.data?.updateProfile;
        setUser({ ...newUser, profile: currentUser?.profile });
        toast.success("Votre profil a bien été mis à jour", {
          style: {
            backgroundColor: "#dcfce7",
            color: "#15803d",
          },
        });
        setFileError(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du profil", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
        },
      });
    }
  };

  const debouncedUpdate = useDebouncedCallback(
    async () => {
      handleUpdate();
    },
    2000,
    { leading: true }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError("L'image ne doit pas dépasser 1 Mo");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFileError(null);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // Fonction pour formater la taille du fichier en KB ou MB
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} octets`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} Ko`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} Mo`;
    }
  };

  const switchViewOld = () => {
    setShowOldPassword(!showOldPassword);
  };
  const switchViewNew = () => {
    setShowNewPassword(!showNewPassword);
  };
  const switchViewConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AnimatedWrapper className="w-full h-full flex flex-col justify-start items-start gap-10 py-4">
      <section className="flex flex-col items-start justify-start gap-7 w-[60%] 2xl:w-[50%] p-4 shadow-md rounded-xl border border-gray-200 bg-white">
        <div className="w-full flex justify-start items-center gap-8">
          <div
            className="relative flex justify-center items-center w-32 h-32 rounded-full overflow-hidden border border-gray-300 bg-gray-100 cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
            {!previewImage && (
              <UserRound className="w-full h-full opacity-20" />
            )}
            {hover && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center text-white cursor-pointer"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">Changer</span>
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>
          <div className="h-full flex flex-1 items-center justify-start gap-2">
            <Info />
            <div className="flex flex-col justify-center items-start font-semibold">
              <p className="text-lg">Informations générales</p>
              <p className="text-xs text-gray-500">
                Gérez vos informations personnelles
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Taille maximale d'image : {formatFileSize(MAX_FILE_SIZE)}
              </p>
              {fileError && (
                <p className="text-xs text-red-500 mt-1">{fileError}</p>
              )}
            </div>
          </div>
        </div>
        <section className="w-full flex flex-col items-start justify-start gap-5">
          <Input
            label="Prénom"
            type="text"
            startContent={<BadgeHelp size={20} className="text-gray-500" />}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            label="Nom"
            type="text"
            startContent={<User size={20} className="text-gray-500" />}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            label="Email"
            type="text"
            value={currentUser?.email}
            isDisabled
            startContent={<MailIcon size={20} className="text-gray-500" />}
          />
          <div className="w-full h-full flex justify-start items-center gap-2">
            <Select
              label="Genre"
              placeholder="Quel est votre genre ?"
              startContent={renderIconSex()}
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
            <Saving onClick={debouncedUpdate} />
          </div>
        </section>
      </section>
      <div className="w-[60%] 2xl:w-[50%] p-4 rounded-xl shadow-md border border-gray-200 flex flex-col items-start justify-start gap-5">
        <p className="flex justify-start items-center gap-2 text-lg font-semibold">
          <Award />
          Ton rôle
        </p>
        <section className="w-full h-full flex justify-center items-center gap-2">
          <CardRole role={UserRole.Coach} />
          <CardRole role={UserRole.Student} />
        </section>
      </div>
      <div className="w-[60%] 2xl:w-[50%] h-full p-4 rounded-xl shadow-md border border-gray-200 flex items-start justify-center gap-5">
        <section className="w-[50%] h-full flex flex-col justify-start items-start gap-1">
          <p className="flex justify-start items-start gap-2 text-lg font-semibold">
            <Lock />
            Mot de passe
          </p>
          <p className="text-xs text-gray-500 ml-8">
            Modifier le mot de passe actuel
          </p>
        </section>
        <section className="w-full h-full flex flex-col justify-center items-end gap-5">
          <Input
            type={`${showOldPassword ? "text" : "password"}`}
            isRequired
            label="Mot de passe actuel"
            startContent={<Lock size={20} className="text-gray-500" />}
            endContent={
              <>
                <Eye
                  className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                    showOldPassword ? "block" : "hidden"
                  }`}
                  onClick={switchViewOld}
                />
                <EyeOff
                  className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                    !showOldPassword ? "block" : "hidden"
                  }`}
                  onClick={switchViewOld}
                />
              </>
            }
          />
          <Input
            type={`${showNewPassword ? "text" : "password"}`}
            isRequired
            label="Nouveau mot de passe"
            startContent={<Lock size={20} className="text-gray-500" />}
            endContent={
              <>
                <Eye
                  className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                    showNewPassword ? "block" : "hidden"
                  }`}
                  onClick={switchViewNew}
                />
                <EyeOff
                  className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                    !showNewPassword ? "block" : "hidden"
                  }`}
                  onClick={switchViewNew}
                />
              </>
            }
          />
          <Input
            type={`${showConfirmPassword ? "text" : "password"}`}
            isRequired
            label="Confirmer nouveau mot de passe"
            startContent={<Lock size={20} className="text-gray-500" />}
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
          <div className="w-full mt-2 flex justify-end">
            <Saving onClick={() => console.log("save")} disabled={true} />
          </div>
        </section>
      </div>
    </AnimatedWrapper>
  );
}
