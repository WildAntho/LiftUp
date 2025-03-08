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
import { OfferCategory } from "./offerCategory";
import { Crew } from "./crew";
import { Request } from "./request";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  availability!: boolean;

  @Field()
  @Column()
  durability!: number;

  @Field(() => OfferCategory)
  @ManyToOne(() => OfferCategory, (category) => category.offers)
  @JoinColumn()
  category!: OfferCategory;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  user?: User;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.studentOffer)
  students?: User[];

  @Field(() => Crew, { nullable: true })
  @OneToOne(() => Crew, (crew) => crew.offer)
  crew?: Crew;

  @Field(() => [Request], { nullable: true })
  @OneToMany(() => Request, (request) => request.offer, { cascade: true })
  requests?: Request[];
}
