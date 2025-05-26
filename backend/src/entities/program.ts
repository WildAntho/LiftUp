import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { ProgramLevel, ProgramStatus } from "../InputType/programType";
import { TrainingPlan } from "./trainingPlan";
import { OfferCategory } from "./offerCategory";

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
  @Column({
    type: "enum",
    enum: ProgramStatus,
    default: ProgramStatus.DRAFT,
  })
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

  @Field(() => ProgramLevel)
  @Column({
    type: "enum",
    enum: ProgramLevel,
    nullable: true,
  })
  level?: ProgramLevel;

  @Field(() => OfferCategory, { nullable: true })
  @ManyToOne(() => OfferCategory, (category) => category.program, {
    nullable: true,
  })
  @JoinColumn()
  category?: OfferCategory;

  @Field(() => [TrainingPlan])
  @OneToMany(() => TrainingPlan, (trainingPlan) => trainingPlan.program)
  trainingPlans!: TrainingPlan[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.coachedCrews)
  coach!: User;
}
