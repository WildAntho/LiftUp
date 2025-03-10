import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Training } from "./training";
import { Offer } from "./offer";

@ObjectType()
@Entity()
export class Crew extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Training], { nullable: true })
  @OneToMany(() => Training, (training) => training.user)
  trainings?: Training[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.coachedCrews)
  coach!: User;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.crew)
  students?: User[];

  @Field(() => Offer, { nullable: true })
  @OneToOne(() => Offer, (offer) => offer.crew, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  offer?: Offer;
}
