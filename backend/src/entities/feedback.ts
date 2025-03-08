import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Training } from "./training";

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  intensity!: number;

  @Field()
  @Column()
  feeling!: number;

  @Field()
  @Column()
  date!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field(() => Training)
  @OneToOne(() => Training, (training) => training.feedback, {
    onDelete: "CASCADE"})
  @JoinColumn()
  training!: Training;
}
