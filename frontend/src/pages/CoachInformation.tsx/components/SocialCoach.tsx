import { CoachProfile } from "@/graphql/hooks";
import { Tooltip } from "@heroui/tooltip";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

type SocialCoachProfile = {
  profile: CoachProfile;
};

export default function SocialCoach({ profile }: SocialCoachProfile) {
  const social = [
    {
      id: 1,
      label: "facebook",
      icon: <FaFacebook size={20} />,
      url: profile?.facebook,
    },
    {
      id: 2,
      label: "instagram",
      icon: <FaInstagram size={20} />,
      url: profile?.instagram,
    },
    {
      id: 3,
      label: "linkedin",
      icon: <FaLinkedin size={20} />,
      url: profile?.linkedin,
    },
  ];
  return (
    <section className="flex flex-col items-start justify-start gap-5">
      <div className="flex items-center gap-5 text-black pl-2">
        {social.map(
          ({ id, label, icon, url }) =>
            url && (
              <div
                key={id}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Tooltip
                  key={id}
                  content={label}
                  showArrow
                  color="foreground"
                  className="text-xs"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {icon}
                  </a>
                </Tooltip>
              </div>
            )
        )}
      </div>
    </section>
  );
}
