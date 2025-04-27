import { useUserStore } from "@/services/zustand/userStore";
import {
  Award,
  BadgeHelp,
  Info,
  MailIcon,
  Upload,
  User,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import CardRole from "./CardRole";
import { useUpdateProfileMutation } from "@/graphql/hooks";
import { uploadURL } from "@/services/utils";
import { Input } from "@heroui/react";
import { toast } from "sonner";
import Saving from "@/components/Saving";

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

  const data = {
    firstname: firstname as string,
    lastname: lastname as string,
  };

  const handleUpdate = async () => {
    const file =
      fileInputRef &&
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0];
    let avatarUrl = "";
    if (file) {
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
        }
      } catch (error) {
        console.error({ error });
      }
    }
    const user = await updateProfile({
      variables: {
        data: {
          ...data,
          avatar: avatarUrl,
        },
      },
    });
    if (user.data) {
      const newUser = user.data?.updateProfile;
      setUser(newUser);
      toast.success("Votre profil a bien été mis à jour", {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-start items-start gap-10 py-4">
      <section className="flex flex-col items-start justify-start gap-7 w-[50%] max-w-[800px] p-4 shadow-md rounded-xl border border-gray-200">
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
              <p className="font-bold">Informations générales</p>
              <p className="text-xs text-gray-500">
                Gérez vos informations personnelles
              </p>
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
          <div className="w-full h-full flex justify-start items-center gap-2">
            <Input
              label="Email"
              type="text"
              value={currentUser?.email}
              isDisabled
              startContent={<MailIcon size={20} className="text-gray-500" />}
            />
            <Saving onClick={handleUpdate} />
          </div>
        </section>
      </section>
      <div className="w-[50%] max-w-[800px] p-4 rounded-xl shadow-md border border-gray-200 flex flex-col items-start justify-start gap-5">
        <p className="flex justify-start items-center gap-2 font-semibold">
          <Award />
          Votre souscription
        </p>
        <section className="w-full h-full flex justify-center items-center gap-2">
          <CardRole role="COACH" />
          <CardRole role="STUDENT" />
        </section>
      </div>
    </section>
  );
}
