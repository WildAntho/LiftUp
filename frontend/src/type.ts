import { ReactElement } from "react";
import { UserWithoutPassword } from "./services/zustand/userStore";
import { Crew, Exercice, Feedback, Training } from "./graphql/hooks";

export type Student = {
  name: string;
};

export type ViewMode = "month" | "week";

export type CalendarEvent = Omit<Training, "user"> | Omit<Feedback, "training">;

export type SidebarComponent = {
  title: string;
  data?: UserWithoutPassword[] | Crew[] | [];
  value?: string;
  withArrow: boolean;
  loading?: boolean;
  rotateArrow?: boolean;
  subitems?: SidebarComponent[];
  get?: () => void;
  icon?: ReactElement;
  type: string;
  isLastPage?: boolean;
};

export type Sender = {
  id: string;
  sender: UserWithoutPassword;
};

export type Receiver = {
  receiver: UserWithoutPassword;
};

export type ExerciceWithoutId = Omit<Exercice, "id">;

export enum StatusStudent {
  active = "ACTIVE",
  waiting = "WAITING",
  end_7 = "END_7",
  expired = "EXPIRED",
}
