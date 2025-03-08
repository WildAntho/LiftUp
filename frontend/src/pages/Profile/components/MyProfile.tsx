import { Button } from "@/components/ui/button";
import { useUserStore } from "@/services/zustand/userStore";
import { Label, TextInputField } from "evergreen-ui";
import { Upload, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CardRole from "./CardRole";
import { useUpdateProfileMutation } from "@/graphql/hooks";
import HeaderProfile from "./HeaderProfile";
import { Separator } from "@/components/ui/separator";
import { uploadURL } from "@/services/utils";

export default function MyProfile() {
  const [updateProfile] = useUpdateProfileMutation();
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.set);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);
  const [firstname, setFirstname] = useState<string | undefined>(
    currentUser?.firstname
  );
  const [lastname, setLastname] = useState<string | undefined>(
    currentUser?.lastname
  );

  useEffect(() => {
    if (isShow) {
      setFirstname(currentUser?.firstname);
      setLastname(currentUser?.lastname);
      setPreviewImage(
        currentUser?.avatar ? `${uploadURL + currentUser.avatar}` : ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

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
      setIsShow(true);
    }
  };

  const switchMode = () => {
    setIsShow(!isShow);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-start justify-start p-10">
      <HeaderProfile
        onClick={switchMode}
        title="Mon profil"
        isShow={isShow}
        tooltip="Modifier le profil"
      />
      <section className="p-8 w-full h-full flex flex-col justify-between items-start">
        <section className="w-full flex justify-start items-start gap-10">
          <section className="flex flex-col items-start justify-start gap-7 w-[40%] p-2">
            <p className="text-xl font-semibold">Vos informations</p>
            <div
              className={`relative flex justify-center items-center w-32 h-32 rounded-full overflow-hidden border border-gray-300 bg-gray-100 ${
                isShow ? "cursor-default" : "cursor-pointer"
              }`}
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
              {hover && !isShow && (
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
            <section
              className={`w-full ${
                isShow && "flex flex-col items-start justify-start gap-5"
              }`}
            >
              <div className={`${!isShow && "mb-7"}`}>
                <Label>Email</Label>
                <p className="text-sm">{currentUser?.email}</p>
              </div>
              {!isShow && (
                <TextInputField
                  label="Prénom"
                  type="text"
                  placeholder="Prénom"
                  value={firstname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstname(e.target.value)
                  }
                />
              )}
              {isShow && <Separator />}
              {isShow && (
                <div>
                  <Label>Prénom</Label>
                  <p className="text-sm">{currentUser?.firstname}</p>
                </div>
              )}
              {!isShow && (
                <TextInputField
                  label="Nom"
                  type="text"
                  placeholder="Nom"
                  value={lastname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastname(e.target.value)
                  }
                />
              )}
              {isShow && <Separator />}
              {isShow && (
                <div>
                  <Label>Nom</Label>
                  <p className="text-sm">{currentUser?.lastname}</p>
                </div>
              )}
            </section>
          </section>
          <div className="flex-1 p-2 flex flex-col items-start justify-start gap-5">
            <p className="text-xl font-semibold ml-5">Votre souscription</p>
            <section className="w-full h-full flex justify-center items-center gap-2">
              <CardRole role="STUDENT" />
              <CardRole role="COACH" />
            </section>
          </div>
        </section>
        {!isShow && (
          <section className="w-full flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsShow(true);
                setPreviewImage(null);
              }}
            >
              Annuler
            </Button>
            <Button
              className="bg-primary hover:bg-blue-600"
              onClick={handleUpdate}
            >
              Enregistrer
            </Button>
          </section>
        )}
      </section>
    </section>
  );
}
