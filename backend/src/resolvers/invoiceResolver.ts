import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Invoice } from "../entities/invoice";
import { User } from "../entities/user";
import { UserProgram, UserProgramStatus } from "../entities/userProgram";
import { FindOptionsWhere, Not } from "typeorm";
import { UserRole } from "../InputType/userType";

@Authorized()
@Resolver(Invoice)
export class InvoiceResolver {
  @Query(() => [Invoice])
  async getInvoices(@Ctx() context: { user: User }) {
    const invoices = await Invoice.find({
      where: {
        user: {
          id: context.user.id,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
    return invoices;
  }

  @Query(() => [UserProgram])
  async getUserPrograms(@Ctx() context: { user: User }) {
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) throw new Error("Aucun utilisateur trouvé");
    const where: FindOptionsWhere<UserProgram>[] = [];

    if (user.roles.includes(UserRole.STUDENT)) {
      where.push({
        user: { id: user.id },
        status: Not(UserProgramStatus.PENDING_PAYMENT),
      });
    }
    if (user.roles.includes(UserRole.COACH)) {
      where.push({
        coach: { id: user.id },
        status: UserProgramStatus.COMPLETED,
      });
    }
    const userPrograms = await UserProgram.find({
      where,
      relations: {
        user: true,
        coach: true,
        program: true,
      },
      order: {
        paidAt: "DESC"
      }
    });
    return userPrograms;
  }
}
