import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Message } from "./message";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable() // Permet de créer une table de jointure pour les participants
  participants!: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Date de création de la conversation

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
