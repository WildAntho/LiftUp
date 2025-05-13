import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { NotificationType } from "../InputType/notificationType";

@ObjectType()
@Entity()
export class NotificationPreference extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => [NotificationType])
  @Column({
    type: "jsonb",
    default: () => "'[]'",
  })
  disabledTypes!: NotificationType[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notificationPreferences, {
    onDelete: "CASCADE",
  })
  user!: User;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;
}
