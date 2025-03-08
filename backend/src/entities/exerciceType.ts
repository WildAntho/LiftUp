import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exercice } from "./exercice";
import { ExerciceModel } from "./exerciceModel";

@ObjectType()
@Entity()
export class ExerciceType extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  value!: string;

  @Field()
  @Column()
  label!: string;

  @Field(() => [Exercice], { nullable: true })
  @OneToMany(() => Exercice, (exercice) => exercice.type)
  exercices?: Exercice[];

  @Field(() => [ExerciceModel], { nullable: true })
  @OneToMany(() => ExerciceModel, (exerciceModel) => exerciceModel.type)
  exercicesModels?: ExerciceModel[];
}
