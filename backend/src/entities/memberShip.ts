import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Offer } from "./offer";

@ObjectType()
@Entity()
export class Membership extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  startDate!: Date;

  @Field()
  @Column()
  endDate!: Date;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.memberships, { onDelete: "CASCADE" })
  student!: User;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.memberships, { onDelete: "CASCADE" })
  offer!: Offer;

}
