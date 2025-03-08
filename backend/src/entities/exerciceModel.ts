import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { ExerciceType } from "./exerciceType";

@ObjectType()
@Entity()
export class ExerciceModel extends BaseEntity {
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

  // Relation avec la table User
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.exerciceModels, { nullable: true })
  user?: User;

  @Field(() => ExerciceType, { nullable: true })
  @ManyToOne(() => ExerciceType, (type) => type.exercices, { nullable: true })
  type?: ExerciceType;
}
