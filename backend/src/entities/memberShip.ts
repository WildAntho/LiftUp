import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Offer } from "./offer";
import { Notification } from "./notification";

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
  @ManyToOne(() => User, (user) => user.memberships, {
    onDelete: "CASCADE",
    eager: true,
  })
  student!: User;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.memberships, { onDelete: "CASCADE" })
  offer!: Offer;

  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.membership, {
    cascade: true,
  })
  notifications?: Notification[];
}
