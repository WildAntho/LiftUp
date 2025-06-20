import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExerciceModel } from "./exerciceModel";

@ObjectType()
@Entity()
export class MuscleGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  key!: string;

  @Field()
  @Column()
  label!: string;

  @Field(() => [ExerciceModel], { nullable: true })
  @OneToMany(() => ExerciceModel, (exercice) => exercice.primaryMuscle, {
    nullable: true,
    cascade: true,
  })
  primaryExercises?: ExerciceModel[];

  @Field(() => [ExerciceModel], { nullable: true })
  @OneToMany(() => ExerciceModel, (exercice) => exercice.secondaryMuscle, {
    nullable: true,
    cascade: true,
  })
  secondaryExercises?: ExerciceModel[];

  @Field(() => [ExerciceModel], { nullable: true })
  @ManyToMany(() => ExerciceModel, (exercice) => exercice.muscles)
  exercices?: ExerciceModel[];
}
