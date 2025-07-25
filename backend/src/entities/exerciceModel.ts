import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { MuscleGroup } from "./muscleGroup";
import { Exercice } from "./exercice";
import { VideoType } from "../InputType/exerciceModelType";

@ObjectType()
@Entity()
export class ExerciceModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => VideoType, { nullable: true })
  @Column({
    type: "enum",
    enum: VideoType,
    nullable: true,
  })
  videoType?: VideoType | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  video?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.exerciceModels, { nullable: true, onDelete: "CASCADE" })
  user?: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.favoriteExercices, {
    cascade: true,
  })
  userFavorites?: User[];

  @Field(() => MuscleGroup, { nullable: true })
  @ManyToOne(() => MuscleGroup, { nullable: true })
  primaryMuscle?: MuscleGroup;

  @Field(() => MuscleGroup, { nullable: true })
  @ManyToOne(() => MuscleGroup, { nullable: true })
  secondaryMuscle?: MuscleGroup;

  @Field(() => [MuscleGroup], { nullable: true })
  @ManyToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.exercices, {
    cascade: true,
  })
  @JoinTable()
  muscles?: MuscleGroup[];

  @Field(() => Exercice, { nullable: true })
  @OneToMany(() => Exercice, (exercice) => exercice.exerciceModel)
  exercices?: Exercice[];
}
