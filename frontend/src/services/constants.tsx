export const PERMISSIONS = {
  MANAGE_PROGRAM: "manage:Program",
  MANAGE_EXERCICE: "manage:Exercice",
  MANAGE_FEEDBACK: "manage:Feedback",
  READ_VIDEO: "read:Video",
  MANAGE_MESSAGE: "manage:Message",
  MANAGE_CREW: "manage:Crew",
  MANAGE_VIDEO: "manage:Video",
  READ_FEEDBACK: "read:Feedback",
} as const;

export const commissionProgram = 0.15;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
