import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Request } from "./request";
import { NotificationType } from "../InputType/notificationType";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => NotificationType)
  @Column({
    type: "enum",
    enum: NotificationType,
  })
  type!: NotificationType;

  @Field()
  @Column({ default: false })
  hasBeenSeen!: boolean;

  @Field()
  @Column({ default: false })
  isRead!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;

  @Field(() => Request, { nullable: true })
  @ManyToOne(() => Request, (request) => request.notifications, {
    nullable: true,
  })
  request?: Request;
}
