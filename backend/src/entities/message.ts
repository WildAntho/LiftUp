import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Conversation } from "./conversation";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  content!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readAt?: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: "CASCADE" })
  sender!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedMessages, {
    onDelete: "CASCADE",
  })
  receiver!: User;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: "CASCADE",
  })
  conversation!: Conversation;

  @Field(() => Message, { nullable: true })
  @ManyToOne(() => Message, (message) => message.replies, {
    nullable: true,
    onDelete: "SET NULL",
  })
  repliedMessage?: Message;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.repliedMessage)
  replies?: Message[];
}
