import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Notification } from "./notification";
import { Offer } from "./offer";

@ObjectType()
@Entity()
export class Request extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentRequests, { eager: true })
  sender!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedRequests, { eager: true })
  receiver!: User;

  @Field()
  @Column({ default: "PENDING" })
  status!: "PENDING" | "ACCEPTED" | "REJECTED";

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

  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.request, {
    cascade: true,
  })
  notifications?: Notification[];

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.requests, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  offer?: Offer;
}
