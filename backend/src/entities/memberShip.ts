import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
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
  @Column({ default: true })
  isActive!: boolean;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.membership, { onDelete: "CASCADE" })
  @JoinColumn()
  student!: User;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.memberships, { onDelete: "CASCADE" })
  offer!: Offer;

}
