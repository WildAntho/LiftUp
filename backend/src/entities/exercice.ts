import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Training } from "./training";
import { TrainingPlan } from "./trainingPlan";
import {
  IntensityFormat,
  RepFormat,
  WeightFormat,
} from "../InputType/exerciceType";

@ObjectType()
@Entity()
export class Exercice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  serie!: number;

  @Field()
  @Column()
  rep!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  intensity?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  position?: number;

  @Field(() => IntensityFormat, { nullable: true })
  @Column({ type: "enum", enum: IntensityFormat, nullable: true })
  intensityFormat?: IntensityFormat;

  @Field(() => WeightFormat, { nullable: true })
  @Column({ type: "enum", enum: WeightFormat, nullable: true })
  weightFormat?: WeightFormat;

  @Field(() => RepFormat, { nullable: true })
  @Column({ type: "enum", enum: RepFormat, nullable: true })
  repFormat?: RepFormat;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tempo?: number;

  @Field(() => Training, { nullable: true })
  @ManyToOne(() => Training, (training) => training.exercices, {
    onDelete: "CASCADE",
  })
  training?: Training;

  @Field(() => TrainingPlan, { nullable: true })
  @ManyToOne(() => TrainingPlan, (trainingPlan) => trainingPlan.exercices, {
    onDelete: "CASCADE",
  })
  trainingPlan?: TrainingPlan;
}
