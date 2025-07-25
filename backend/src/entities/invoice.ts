import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType, ID, registerEnumType } from "type-graphql";
import { User } from "./user";
import { ProfileSubscription } from "./profileSubscription";

export enum InvoiceStatus {
  PAID = "paid",
  OPEN = "open",
  VOID = "void",
  UNCOLLECTIBLE = "uncollectible",
}

registerEnumType(InvoiceStatus, {
  name: "InvoiceStatus",
});

@ObjectType()
@Entity()
export class Invoice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  stripeInvoiceId!: string; // ex: in_XXXXXX

  @Field(() => InvoiceStatus)
  @Column({ type: "enum", enum: InvoiceStatus })
  status!: InvoiceStatus;

  @Field()
  @Column()
  amountPaid!: number;

  @Field()
  @Column()
  currency!: string;

  @Field()
  @Column()
  invoicePdf!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hostedInvoicePdf?: string;

  @Field(() => Date)
  @Column({ type: "timestamptz" })
  paidAt!: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  nextPaymentAt?: Date | null;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.invoices, { eager: true })
  user!: User;

  @Field(() => ProfileSubscription)
  @ManyToOne(() => ProfileSubscription, (sub) => sub.invoices, { eager: true })
  profileSubscription!: ProfileSubscription;

  @CreateDateColumn()
  createdAt!: Date;
}
