import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class CoachProfile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  specialisation?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  linkedin?: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.coachProfile, { onDelete: "CASCADE" })
  @JoinColumn()
  user?: User;
}
