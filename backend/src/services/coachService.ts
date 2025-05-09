import { Membership } from "../entities/memberShip";
import { User } from "../entities/user";

export async function desactivateMemberShip(memberShip: Membership) {
  memberShip.isActive = false;
  await memberShip.save();
}

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
