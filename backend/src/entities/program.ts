import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { ProgramStatus } from "../InputType/programType";
import { TrainingPlan } from "./trainingPlan";

@ObjectType()
@Entity()
export class Program extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => ProgramStatus)
  @Column({ default: ProgramStatus.DRAFT })
  status!: ProgramStatus;

  @Field()
  @Column()
  duration!: number;

  @Field()
  @Column({ default: false })
  public!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price?: number;

  @Field(() => [TrainingPlan])
  @OneToMany(() => TrainingPlan, (trainingPlan) => trainingPlan.program)
  trainingPlans!: TrainingPlan[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.coachedCrews)
  coach!: User;
}
