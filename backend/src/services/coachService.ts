import { maxFreeStudents } from "../constants";
import { User } from "../entities/user";

export async function deleteFromCrew(student: User) {
  student.crew = null;
  student.studentOffer = null;
  await student.save();
}

export async function deleteStudent(studentId: string, coach: User) {
  const newStudents =
    coach.students && coach.students.filter((s: User) => s.id != studentId);
  coach.students = newStudents;
  await coach.save();
  return JSON.stringify("L'élève a bien été supprimé");
}

export function canAddStudent(coach: User): boolean {
  if (coach.profile?.name === "Coach-Maestro") return true;
  if (!coach.students || coach.students.length <= maxFreeStudents) return true;
  return false;
}
