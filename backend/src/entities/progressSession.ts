import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class ProgressSession extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ default: false })
  profile!: boolean;

  @Field()
  @Column({ default: false })
  training!: boolean;

  @Field()
  @Column({ default: false })
  program!: boolean;

  @Field()
  @Column({ default: false })
  offer!: boolean;

  @Field()
  @Column({ default: false })
  searchCoach!: boolean;

  @Field()
  @Column({ default: false })
  createConnect!: boolean;

  @Field()
  @Column({ default: false })
  searchProgram!: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.progress, {
    onDelete: "CASCADE",
  })
  user!: User;
}
