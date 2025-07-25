import Saving from "@/components/Saving";
import { Separator } from "@/components/ui/separator";
import {
  NotificationType,
  useGetPreferenceNotificationQuery,
  UserRole,
  useUpdatePreferenceNotificationMutation,
} from "@/graphql/hooks";
import { useRole } from "@/services/hooks/useRole";
import { useDebouncedCallback } from "@/services/hooks/useDebouncedCallback";
import { Switch } from "@heroui/switch";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import IllustrationNotif from "./IllustrationNotif";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function NotificationPreference() {
  const isCoach = useRole(UserRole.Coach);
  const { data, loading, refetch } = useGetPreferenceNotificationQuery();
  const [updatePreference] = useUpdatePreferenceNotificationMutation();

  const initialPreferences = useMemo(
    () => data?.getPreferenceNotification.disabledTypes ?? [],
    [data]
  );

  const [disabledNotifications, setDisabledNotifications] = useState<
    NotificationType[]
  >([]);

  useEffect(() => {
    setDisabledNotifications(initialPreferences);
  }, [initialPreferences]);

  const toggleNotification = (key: NotificationType) => {
    setDisabledNotifications((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleUpdate = async () => {
    try {
      const { data } = await updatePreference({
        variables: { data: disabledNotifications },
      });
      toast.success(data?.updatePreferenceNotification, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de l'enregistrement des préférences"
      );
    }
  };

  const debounceUpdate = useDebouncedCallback(
    () => {
      handleUpdate();
    },
    1000,
    { leading: true }
  );

  const allGroupNotification = useMemo(
    () => [
      ...(isCoach
        ? [
            {
              key: NotificationType.NewRequest,
              label: "Lors de la réception d'une nouvelle demande de coaching",
              icon: <FaQuestionCircle size={20} />,
              color: "text-blue-500 bg-blue-500",
            },
            {
              key: NotificationType.NewFeedback,
              label: "Lorsqu'un élève valide un entraînement",
              icon: <FaCircleCheck size={20} />,
              color: "text-green-500 bg-green-500",
            },
            {
              key: NotificationType.CancelMembership,
              label: "Lorsqu'un élève arrête son coaching",
              icon: <FaPowerOff size={20} />,
              color: "text-orange-500 bg-orange-500",
            },
          ]
        : [
            {
              key: NotificationType.AcceptRequest,
              label: "Lorsqu'une demande de coaching a été acceptée",
              icon: <FaCircleCheck size={20} />,
              color: "text-green-500 bg-green-500",
            },
            {
              key: NotificationType.NewTraining,
              label: "Lorsque ton coach te programme des entraînements",
              icon: <FaFilePen size={20} />,
              color: "text-blue-500 bg-blue-500",
            },
            {
              key: NotificationType.ActivateMembership,
              label: "Lorsque ton coach active ton suivi",
              icon: <FaPowerOff size={20} />,
              color: "text-orange-500 bg-orange-500",
            },
          ]),
    ],
    [isCoach]
  );

  return (
    <AnimatedWrapper className="flex flex-col items-start justify-start gap-4 px-4 pb-4">
      <IllustrationNotif />
      <section className="flex flex-col gap-4 shadow-md border-1 border-gray-100 rounded-xl p-8 w-[60%]">
        <div className="flex flex-col items-start justify-start gap-1 pl-2">
          <p className="font-medium text-xl">Préférences de notifications</p>
          <p className="text-xs text-gray-500">
            Activer les notifications souhaitées
          </p>
        </div>
        <Separator />
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          {allGroupNotification.map((type) => (
            <div
              key={type.key}
              className="group w-full text-sm flex justify-between gap-2 px-2 py-4 font-medium bg-gray-50 rounded-xl cursor-pointer"
              onClick={() => toggleNotification(type.key)}
            >
              <div className="flex justify-start items-center gap-4">
                <p className={`${type.color} bg-opacity-10 rounded-lg p-3`}>
                  {type.icon}
                </p>
                <p className="transition-all duration-200 ease-in-out group-hover:translate-x-1">
                  {type.label}
                </p>
              </div>
              <Switch
                size="sm"
                isSelected={!disabledNotifications.includes(type.key)}
                onChange={() => toggleNotification(type.key)}
              />
            </div>
          ))}
        </div>
      </section>
      <div className="w-[60%] flex justify-end items-center">
        <Saving onClick={debounceUpdate} loading={loading} />
      </div>
    </AnimatedWrapper>
  );
}
