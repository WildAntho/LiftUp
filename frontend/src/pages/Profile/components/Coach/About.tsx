import { useEffect, useState } from "react";
import { Eye, Loader2, X } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateCoachProfileMutation,
} from "@/graphql/hooks";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Tooltip } from "@heroui/tooltip";
import Edit from "@/components/Edit";
import Close from "@/components/Close";
import Saving from "@/components/Saving";
import { toast } from "sonner";
import { Button, Input, Modal, ModalContent, ModalHeader } from "@heroui/react";
import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import CoachInformation from "@/pages/CoachInformation.tsx/CoachInformation";
import { useUserStore } from "@/services/zustand/userStore";
import { InputWithTags } from "@/components/InputWithTags";
import { Label } from "@/components/ui/label";
import IllustrationAbout from "./IllustrationAbout";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function About() {
  const currentUser = useUserStore((state) => state.user);
  const {
    data: dataProfile,
    loading: loadingProfile,
    refetch,
  } = useGetMyProfileQuery();
  const [update, { loading: loadingUpdate }] = useUpdateCoachProfileMutation();
  const loading = loadingUpdate;
  const profile = dataProfile?.getCoachProfile || null;
  const [isShow, setIsShow] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialisation, setSpecialisation] = useState<string[]>([]);
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [content, setContent] = useState<object | null>(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setDescription(profile.description || "");
      setContent(profile.description ? JSON.parse(profile.description) : "");
      setSpecialisation(profile.specialisation || []);
      setFacebook(profile.facebook || "");
      setInstagram(profile.instagram || "");
      setLinkedin(profile.linkedin || "");
    }
  }, [isShow, profile]);

  const handleSave = async () => {
    if (specialisation.length > 5) {
      return;
    }

    const data = {
      name,
      description: JSON.stringify(content),
      specialisation,
      facebook,
      instagram,
      linkedin,
    };
    await update({ variables: { data, id: profile?.id as string } });
    toast.success("Vos informations ont bien été enregistré", {
      style: {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      },
    });
    refetch();
    setIsShow(true);
  };

  const social = [
    { id: 1, label: "facebook", icon: <FaFacebook size={30} />, url: facebook },
    {
      id: 2,
      label: "instagram",
      icon: <FaInstagram size={30} />,
      url: instagram,
    },
    { id: 3, label: "linkedin", icon: <FaLinkedin size={30} />, url: linkedin },
  ];

  const handleChangeContent = (content: object) => {
    setContent(content);
  };

  return (
    <AnimatedWrapper className="w-full px-4 pb-4">
      <IllustrationAbout />
      <section className="relative max-w-[60%] h-full flex flex-col items-start justify-start">
        <Modal
          scrollBehavior="inside"
          isOpen={openPreview}
          onOpenChange={() => setOpenPreview(false)}
          isDismissable={false}
          size="5xl"
          style={{ backgroundColor: "#f3f4f6" }}
          className="rounded-xl overflow-hidden"
          classNames={{
            closeButton: "text-black hover:bg-black/5 active:bg-black/10",
          }}
        >
          <ModalContent>
            <ModalHeader className="w-full flex flex-col justify-center items-center bg-white">
              Point de vue des élèves
              <p className="text-gray-500 text-sm">
                Les élèves pourront choisir une offre de coaching ou un
                programme
              </p>
            </ModalHeader>
            <Separator className="w-full" />
            <CoachInformation prevId={currentUser?.id.toString()} />
          </ModalContent>
        </Modal>
        <section className="w-full flex flex-col items-start justify-start gap-2">
          {!loadingProfile ? (
            <>
              <div className="flex items-center justify-end w-full mt-2">
                <div className="flex justify-center items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                  {isShow && (
                    <Tooltip
                      content="Prévisualiser"
                      showArrow={true}
                      color="foreground"
                      className="text-xs"
                    >
                      <div
                        className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
                        onClick={() => setOpenPreview(true)}
                      >
                        <Eye className="size-4 text-black active:text-gray-500" />
                      </div>
                    </Tooltip>
                  )}
                  {isShow && <Edit onClick={() => setIsShow(false)} />}
                  {!isShow && <Close onClick={() => setIsShow(true)} />}
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-7">
                <div className="w-full">
                  <Label htmlFor="textarea-2">Intitulé</Label>
                  {isShow && <Separator className="mt-2" />}
                  {!isShow ? (
                    <Input
                      label="Renseignez votre activité"
                      className="mt-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm mt-2">
                      {profile?.name || "Vous n'avez pas encore d'intitulé"}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="textarea-2">À propos de vous</Label>
                  {isShow && <Separator className="mt-2" />}
                  {description || !isShow ? (
                    <div className="w-full my-4">
                      <LexicalEditorComponent
                        onChange={handleChangeContent}
                        value={content}
                        readOnly={isShow}
                      />
                    </div>
                  ) : (
                    <p className="text-sm mt-2">
                      Vous n'avez pas encore de description
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="textarea-2">
                    Vos spécialisations{" "}
                    {!isShow && (
                      <span className="text-xs text-gray-500">( 5 max )</span>
                    )}
                  </Label>
                  {isShow && <Separator className="mt-2" />}
                  {!isShow ? (
                    <div className="flex justify-start items-start gap-2 w-full">
                      <InputWithTags
                        tags={specialisation}
                        setTags={setSpecialisation}
                        placeholder="Ajouter une spécialisation"
                        limit={5}
                      />
                    </div>
                  ) : profile?.specialisation?.length ? (
                    <div className="flex justify-start items-center gap-2 mt-3">
                      {profile.specialisation.map((s, i) => (
                        <Badge key={i}>{s}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm mt-2">
                      Vous n'avez pas de spécialisation
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="textarea-2">Vos réseaux</Label>
                  <Separator className="mt-2" />
                  {!isShow ? (
                    <div className="w-full flex flex-col items-start justify-start gap-2 my-4">
                      {social.map(({ label, url }, i) => (
                        <Input
                          key={i}
                          label={label.charAt(0).toUpperCase() + label.slice(1)}
                          type="text"
                          placeholder="URL"
                          value={url}
                          onChange={(e) => {
                            if (label === "facebook")
                              setFacebook(e.target.value);
                            if (label === "instagram")
                              setInstagram(e.target.value);
                            if (label === "linkedin")
                              setLinkedin(e.target.value);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-7 mt-5 text-black">
                      {social.map(
                        ({ id, label, icon, url }) =>
                          url && (
                            <Tooltip
                              key={id}
                              content={label}
                              showArrow
                              color="foreground"
                              className="text-xs"
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {icon}
                              </a>
                            </Tooltip>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {!isShow && (
            <section className="w-full flex items-center justify-end gap-2">
              <Button
                className="group shadow-none text-black h-[55px] w-[25%] rounded-xl border border-gray-300 bg-gray-200 hover:bg-gray-200 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
                onPress={() => {
                  setIsShow(true);
                }}
              >
                <X />
                <p className="transition-all duration-200 group-hover:translate-x-1">
                  Annuler
                </p>
              </Button>
              <Saving loading={loading} onClick={handleSave} />
            </section>
          )}
        </section>
        {/* <PreviewProfile open={openPreview} close={() => setOpenPreview(false)} /> */}
      </section>
    </AnimatedWrapper>
  );
}
