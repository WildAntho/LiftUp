import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Offer } from "./offer";
import { Program } from "./program";

@ObjectType()
@Entity()
export class OfferCategory extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  label!: string;

  @Field(() => [Offer], { nullable: true })
  @OneToMany(() => Offer, (offer) => offer.category, { nullable: true })
  offers?: Offer[];

  @Field(() => [Program], { nullable: true })
  @OneToMany(() => Program, (program) => program.category, { nullable: true })
  program?: Program[];
}
