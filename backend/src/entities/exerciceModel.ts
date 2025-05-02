import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class ExerciceModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  serie?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rep?: number;

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

  // Relation avec la table User
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.exerciceModels, { nullable: true })
  user?: User;
}
