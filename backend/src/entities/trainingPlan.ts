import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Program } from "./program";

@ObjectType()
@Entity()
export class TrainingPlan extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  dayNumber!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(() => Program)
  @ManyToOne(() => Program, (program) => program.trainingPlans, { onDelete: "CASCADE" })
  program!: Program;
}
