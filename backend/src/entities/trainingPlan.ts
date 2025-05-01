import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Program } from "./program";
import { Exercice } from "./exercice";

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
  @ManyToOne(() => Program, (program) => program.trainingPlans, {
    onDelete: "CASCADE",
  })
  program!: Program;

  @Field(() => [Exercice], { nullable: true })
  @OneToMany(() => Exercice, (exercice) => exercice.trainingPlan)
  exercices?: Exercice[];
}
