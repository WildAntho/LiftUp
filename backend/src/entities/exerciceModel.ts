import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import {
  IntensityFormat,
  RepFormat,
  WeightFormat,
} from "../InputType/exerciceType";
import { MuscleGroup } from "./muscleGroup";

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

  @Field(() => IntensityFormat, { nullable: true })
  @Column({
    type: "enum",
    enum: IntensityFormat,
    nullable: true,
    default: IntensityFormat.RPE,
  })
  intensityFormat?: IntensityFormat;

  @Field(() => WeightFormat, { nullable: true })
  @Column({
    type: "enum",
    enum: WeightFormat,
    nullable: true,
    default: WeightFormat.KG,
  })
  weightFormat?: WeightFormat;

  @Field(() => RepFormat, { nullable: true })
  @Column({
    type: "enum",
    enum: RepFormat,
    nullable: true,
    default: RepFormat.STANDARD,
  })
  repFormat?: RepFormat;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tempo?: number;

  // Relation avec la table User
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.exerciceModels, { nullable: true })
  user?: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.favoriteExercices)
  userFavorites?: User[];

  @Field(() => MuscleGroup, { nullable: true })
  @ManyToOne(() => MuscleGroup, { nullable: true })
  primaryMuscle?: MuscleGroup;

  @Field(() => MuscleGroup, { nullable: true })
  @ManyToOne(() => MuscleGroup, { nullable: true })
  secondaryMuscle?: MuscleGroup;
}
