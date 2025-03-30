import { addMonths } from "date-fns";
import { Membership } from "../entities/memberShip";
import { Offer } from "../entities/offer";
import { User } from "../entities/user";

export async function startMembership(student: User, offer: Offer) {
  const newMemberShip = new Membership();
  const startDate = new Date();
  const endDate = addMonths(startDate, offer.durability);
  newMemberShip.startDate = startDate;
  newMemberShip.endDate = endDate;
  newMemberShip.isActive = true;
  newMemberShip.student = student;
  await newMemberShip.save();
}
