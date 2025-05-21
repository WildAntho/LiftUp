import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Training } from "./training";
import { Notification } from "./notification";
import { User } from "./user";

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

  @Field({ nullable: true })
  @Column({ nullable: true, default: 7 })
  satisfaction?: number;

  @Field()
  @Column()
  date!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field(() => Training)
  @OneToOne(() => Training, (training) => training.feedback, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  training!: Training;

  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.feedback, {
    cascade: true,
  })
  notifications?: Notification[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.feedbacks, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  user!: User;
}
