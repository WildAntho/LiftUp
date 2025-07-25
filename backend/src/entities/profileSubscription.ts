import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, ID, registerEnumType } from "type-graphql";
import { User } from "./user";
import { Profile } from "./profile";
import { Invoice } from "./invoice";

export enum ProfileSubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  SCHEDULE_CANCEL = "schedule_cancel",
  FIRST_PAID = "first_paid",
  INCOMPLETE = "incomplete",
}

registerEnumType(ProfileSubscriptionStatus, {
  name: "ProfileSubscriptionStatus",
});

export enum Periodicity {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

registerEnumType(Periodicity, {
  name: "Periodicity",
});

@ObjectType()
@Entity()
export class ProfileSubscription extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripeSessionId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripeSubscriptionId?: string;

  @Field(() => ProfileSubscriptionStatus)
  @Column({ type: "enum", enum: ProfileSubscriptionStatus })
  status!: ProfileSubscriptionStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.profileSubscriptions, { eager: true })
  user!: User;

  @Field(() => Profile)
  @ManyToOne(() => Profile, { eager: true })
  profile!: Profile;

  @Field(() => Periodicity)
  @Column({ type: "enum", enum: Periodicity })
  periodicity!: Periodicity;

  @Field({ nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  endDate?: Date | null;

  @Field({ nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  currentPeriodEnd?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  canceledAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Invoice, (invoice) => invoice.profileSubscription)
  invoices!: Invoice[];
}
