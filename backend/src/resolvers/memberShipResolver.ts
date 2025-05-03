import { Arg, Mutation, Resolver } from "type-graphql";
import { Membership } from "../entities/memberShip";
import { ActiveMembershipType } from "../InputType/memberShipType";
import { User } from "../entities/user";
import { Offer } from "../entities/offer";
import { startMembership } from "../services/memberShipService";
import { addMonths } from "date-fns";

@Resolver(Membership)
export class MembershipResolver {
  @Mutation(() => String)
  async activeMembership(@Arg("data") data: ActiveMembershipType) {
    const student = await User.findOneBy({ id: data.studentId });
    if (!student) throw new Error("Aucun étudiant n'existe pour cet id");
    const offer = await Offer.findOneBy({ id: data.offerId });
    if (!offer) throw new Error("Aucune offre n'existe pour cet id");
    const memberShip = await Membership.find({
      where: {
        student: { id: data.studentId },
        isActive: true,
      },
      relations: { student: true },
    });
    if (memberShip.length > 0)
      throw new Error("Cet élève a déjà une souscription active");
    await startMembership(student, offer);
    return JSON.stringify("La souscription a bien été activée");
  }

  @Mutation(() => String)
  async renewMemberShip(@Arg("id") id: string) {
    const memberShip = await Membership.findOne({
      where: { id },
      relations: { offer: true },
    });
    if (!memberShip) throw new Error("Aucune souscription n'a été trouvée");
    let endDate: Date;
    if (memberShip.endDate.getTime() > new Date().getTime()) {
      endDate = addMonths(memberShip.endDate, memberShip.offer.durability);
    } else {
      endDate = addMonths(new Date(), memberShip.offer.durability);
    }
    memberShip.endDate = endDate;
    await memberShip.save();
    return JSON.stringify("L'abonnement a bien été renouvelé");
  }
}
