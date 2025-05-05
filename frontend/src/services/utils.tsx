import {
  IntensityFormat,
  Message,
  ProgramLevel,
  ProgramStatus,
  RepFormat,
  WeightFormat,
} from "@/graphql/hooks";
import { Image } from "@heroui/react";
import {
  Archive,
  BicepsFlexed,
  CircleCheckBig,
  Flame,
  NotepadTextDashed,
  Sparkles,
} from "lucide-react";

export const uploadURL = "file";

export function formatUser(user: string) {
  return user
    .split(" ")
    .map((u: string) => u[0].toUpperCase())
    .join("");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];
  const startPadding = (firstDay.getDay() + 6) % 7;

  // Add previous month's days
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add next month's days to complete the grid
  const remainingDays = 35 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

export const getDaysInWeek = (date: Date): Date[] => {
  const current = new Date(date);
  const days: Date[] = [];
  const startOfWeek = (current.getDay() + 6) % 7;
  current.setDate(current.getDate() - startOfWeek);

  for (let i = 0; i < 7; i++) {
    days.push(new Date(current.getTime()));
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const picture = [
  {
    type: "traction",
    image: (
      <Image alt="HeroUI hero Image" src="../../public/pullup.png" width={80} />
    ),
  },
  {
    type: "squat",
    image: (
      <Image alt="HeroUI hero Image" src="../../public/squat.jpg" width={80} />
    ),
  },
  {
    type: "dips",
    image: (
      <Image alt="HeroUI hero Image" src="../../public/dips.png" width={80} />
    ),
  },
  {
    type: "muscleup",
    image: (
      <Image
        alt="HeroUI hero Image"
        src="../../public/muscleup.png"
        width={80}
      />
    ),
  },
  {
    type: "renfo",
    image: (
      <Image alt="HeroUI hero Image" src="../../public/renfo.png" width={80} />
    ),
  },
];

export function getLastReadMessageIndex(
  messages: Message[],
  currentUserId: string
): number | null {
  if (messages[0]?.sender?.id !== currentUserId) return null;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].readAt) {
      return i;
    }
  }
  return null;
}

export const adjustScrollPosition = (
  container: HTMLDivElement,
  prevScrollHeight: number
) => {
  const newScrollHeight = container.scrollHeight;
  const scrollDifference = newScrollHeight - prevScrollHeight;
  container.scrollTop += scrollDifference;
};

export const allStatus = [
  {
    key: ProgramStatus.Published,
    label: "Validé",
    startContent: <CircleCheckBig className="w-4 h-4" />,
  },
  {
    key: ProgramStatus.Draft,
    label: "Brouillon",
    startContent: <NotepadTextDashed className="w-4 h-4" />,
  },
  {
    key: ProgramStatus.Archived,
    label: "Archivé",
    startContent: <Archive className="w-4 h-4" />,
  },
];

export const allLevel = [
  {
    key: ProgramLevel.Beginner,
    label: "Débutant",
    startContent: <Sparkles className="w-4 h-4" />,
  },
  {
    key: ProgramLevel.Intermediate,
    label: "Intermédiaire",
    startContent: <BicepsFlexed className="w-4 h-4" />,
  },
  {
    key: ProgramLevel.Advanced,
    label: "Avancé",
    startContent: <Flame className="w-4 h-4" />,
  },
];

export const allFormatReps = [
  {
    key: RepFormat.Standard,
    label: "Standard",
  },
  {
    key: RepFormat.Amrap,
    label: "AMRAP",
  },
  {
    key: RepFormat.Emom,
    label: "EMOM",
  },
  {
    key: RepFormat.E2Mom,
    label: "E2MOM",
  },
  {
    key: RepFormat.Time,
    label: "Temps(sec)",
  },
];

export const allFormatWeight = [
  {
    key: WeightFormat.Kg,
    label: "Kg",
  },
  {
    key: WeightFormat.Lbs,
    label: "Lbs",
  },
  {
    key: WeightFormat.Bodyweight,
    label: "Poids du corps",
  },
  {
    key: WeightFormat.Choice,
    label: "Au choix",
  },
  {
    key: WeightFormat.Percentage,
    label: "%RM",
  },
];

export const allFormatIntensity = [
  {
    key: IntensityFormat.Rpe,
    label: "RPE",
  },
  {
    key: IntensityFormat.Rir,
    label: "RIR",
  },
];

export enum FilterCardEnum {
  ALL = "ALL",
  MINE = "MINE",
  FAVORITE = "FAVORITE",
  NEW = "NEW",
}

export const exercicesURL = "/exercices/women";
