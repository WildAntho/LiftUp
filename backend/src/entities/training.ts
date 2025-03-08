import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Feedback } from "./feedback";
import { Exercice } from "./exercice";
import { Crew } from "./crew";

@ObjectType()
@Entity()
export class Training extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  date!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdByCoach?: string;

  @Field()
  @Column({ default: true })
  editable!: boolean;

  @Field()
  @Column({ default: false })
  validate!: boolean;

  @Field()
  @Column({ default: "#3B82F6" })
  color?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.trainings)
  user?: User;

  @Field(() => Crew, { nullable: true })
  @ManyToOne(() => Crew, (crew) => crew.trainings)
  crew?: Crew;

  @Field(() => Feedback, { nullable: true })
  @OneToOne(() => Feedback, (feedback) => feedback.training)
  feedback?: Feedback;

  @Field(() => [Exercice], { nullable: true })
  @OneToMany(() => Exercice, (exercice) => exercice.training)
  exercices?: Exercice[];
}
