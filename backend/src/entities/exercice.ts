import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Training } from "./training";
import { ExerciceType } from "./exerciceType";

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

  @Field(() => Training, { nullable: true })
  @ManyToOne(() => Training, (training) => training.exercices, {
    onDelete: "CASCADE",
  })
  training?: Training;

  @Field(() => ExerciceType, { nullable: true })
  @ManyToOne(() => ExerciceType, (type) => type.exercices, { nullable: true })
  type?: ExerciceType;
}
