import { Field, ObjectType, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from "typeorm";
import { Profile } from "./profile";

@ObjectType()
@Entity()
export class Permission extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  key!: string;  

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Profile, (profile) => profile.permissions)
  profiles!: Profile[];
}
