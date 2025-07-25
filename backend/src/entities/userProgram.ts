import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Program } from "./program";

export enum UserProgramStatus {
  PENDING_PAYMENT = "pending_payment",
  PAID = "paid",
  COMPLETED = "completed",
  EXPIRED = "expired",
}

@ObjectType()
@Entity()
export class UserProgram extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserProgramStatus,
    default: UserProgramStatus.PENDING_PAYMENT,
  })
  status!: UserProgramStatus;

  @Field()
  @Column()
  price!: number;

  @Field({ nullable: true })
  @Column({ default: "eur", nullable: true })
  currency!: string;

  @Field()
  @Column({ type: "float", default: 0 })
  commissionRate!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  paidAt?: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripeSessionId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  receip?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userPrograms)
  user!: User;

  @Field(() => Program)
  @ManyToOne(() => Program, (program) => program.subscriptions)
  program!: Program;

  @Field(() => User)
  @ManyToOne(() => User, (coach) => coach.coachingPrograms)
  coach!: User;
}
