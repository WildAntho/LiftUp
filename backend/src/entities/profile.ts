import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Permission } from "./permission";
import { User } from "./user";
import { UserRole } from "../InputType/userType";
import { ProfileSubscription } from "./profileSubscription";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => UserRole)
  @Column({
    type: "enum",
    enum: UserRole,
    nullable: true,
  })
  type?: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripeProductId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripePriceMonth?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripePriceYear?: string;

  @Field(() => [Permission])
  @ManyToMany(() => Permission, (permission) => permission.profiles, {
    eager: true,
  })
  @JoinTable()
  permissions!: Permission[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.profile)
  users?: User[];

  @OneToMany(() => ProfileSubscription, (subscription) => subscription.profile, { nullable: true})
  profileSubscriptions?: ProfileSubscription[];
}
