import { ChangeEvent, useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { Info, Loader2 } from "lucide-react";
import { Label, TagInput, TextInputField, Textarea } from "evergreen-ui";
import { Button } from "@/components/ui/button";
import {
  useAddCoachProfileMutation,
  useGetMyProfileQuery,
  useUpdateCoachProfileMutation,
} from "@/graphql/hooks";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Tooltip } from "@heroui/tooltip";

export default function About() {
  const {
    data: dataProfile,
    loading: loadingProfile,
    refetch,
  } = useGetMyProfileQuery();
  const [update, { loading: loadingUpdate }] = useUpdateCoachProfileMutation();
  const [add, { loading: loadingAdd }] = useAddCoachProfileMutation();
  const loading = loadingAdd || loadingUpdate;
  const profile = dataProfile?.getCoachProfile || null;

  const [isShow, setIsShow] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialisation, setSpecialisation] = useState<string[]>([]);
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [errorSpec, setErrorSpec] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setDescription(profile.description || "");
      setSpecialisation(profile.specialisation || []);
      setFacebook(profile.facebook || "");
      setInstagram(profile.instagram || "");
      setLinkedin(profile.linkedin || "");
    }
  }, [isShow, profile]);

  const handleSave = async () => {
    if (specialisation.length > 5) {
      setErrorSpec(true);
      return;
    }

    const data = {
      name,
      description,
      specialisation,
      facebook,
      instagram,
      linkedin,
    };

    if (!dataProfile) {
      await add({ variables: { data } });
    } else {
      await update({ variables: { data, id: profile?.id as string } });
    }

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

  return (
    <section className="w-full h-full flex flex-col items-start justify-start p-10">
      <HeaderProfile
        isShow={isShow}
        onClick={() => setIsShow(!isShow)}
        title="A propos"
        tooltip="Modifier ma description"
      />
      <section className="w-full flex flex-col items-start justify-start gap-5">
        {!loadingProfile ? (
          <>
            <div className="flex justify-start items-center gap-1">
              <Info className="text-gray-400" />
              <p className="w-[70%] text-xs m-4 text-gray-600">
                Cette section a pour but de décrire vos méthodes et votre vision
                du coaching, ainsi que vos spécialisations. N'hésitez pas à être
                exhaustif dans votre description.
              </p>
            </div>
            <div className="w-[80%] flex flex-col items-start justify-start gap-7">
              <div className="w-full">
                <Label htmlFor="textarea-2" marginBottom={0} display="block">
                  Intitulé
                </Label>
                {isShow && <Separator className="mt-2" />}
                {!isShow ? (
                  <TextInputField
                    placeholder="Renseignez votre activité"
                    marginBottom={0}
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                ) : (
                  <p className="text-xs mt-2">
                    {profile?.name || "Vous n'avez pas encore d'intitulé"}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="textarea-2" marginBottom={4} display="block">
                  À propos de vous
                </Label>
                {isShow && <Separator className="mt-2" />}
                {!isShow ? (
                  <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription(e.target.value)
                    }
                  />
                ) : (
                  <p className="text-xs mt-2">
                    {profile?.description ||
                      "Vous n'avez pas encore de description"}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="textarea-2" marginBottom={4} display="block">
                  Vos spécialisations{" "}
                  {!isShow && (
                    <span className="text-xs text-gray-500">( 5 max )</span>
                  )}
                </Label>
                {isShow && <Separator className="mt-2" />}
                {!isShow ? (
                  <>
                    <div className="flex justify-start items-center gap-2 w-full">
                      <TagInput
                        className="min-w-[50%] max-w-[80%]"
                        inputProps={{
                          placeholder: "Ajouter une spécialisation",
                        }}
                        values={specialisation}
                        onChange={setSpecialisation}
                      />
                      <p className="text-sm text-gray-400">⌘ Entrée</p>
                    </div>
                    {errorSpec && (
                      <p className="text-xs text-red-500 mt-1">
                        5 spécialisations maximum
                      </p>
                    )}
                  </>
                ) : profile?.specialisation?.length ? (
                  <div className="flex justify-start items-center gap-2 mt-3">
                    {profile.specialisation.map((s, i) => (
                      <Badge key={i}>{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs">Vous n'avez pas de spécialisation</p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="textarea-2" marginBottom={4} display="block">
                  Vos réseaux
                </Label>
                <Separator className="mt-2" />
                {!isShow ? (
                  <div className="w-full mt-5">
                    {social.map(({ label, url }, i) => (
                      <TextInputField
                        key={i}
                        label={label.charAt(0).toUpperCase() + label.slice(1)}
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (label === "facebook") setFacebook(e.target.value);
                          if (label === "instagram")
                            setInstagram(e.target.value);
                          if (label === "linkedin") setLinkedin(e.target.value);
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
          <section className="w-full flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsShow(true);
                setErrorSpec(false);
              }}
            >
              Annuler
            </Button>
            <Button
              className="bg-primary hover:bg-blue-600"
              disabled={loading}
              onClick={handleSave}
            >
              {loading && <Loader2 className="animate-spin" />}
              Enregistrer
            </Button>
          </section>
        )}
      </section>
    </section>
  );
}
