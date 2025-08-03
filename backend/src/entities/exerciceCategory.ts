import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExerciceModel } from "./exerciceModel";

@ObjectType()
@Entity()
export class ExerciceCategory extends BaseEntity {
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
  @OneToMany(() => ExerciceModel, (exercice) => exercice.category, {
    nullable: true,
    eager: true,
  })
  exerciceModels?: ExerciceModel[];
}
