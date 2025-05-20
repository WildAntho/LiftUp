import { Field, ID, ObjectType } from "type-graphql";
import {
  AfterInsert,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Training } from "./training";
import { Request } from "./request";
import { ExerciceModel } from "./exerciceModel";
import { Crew } from "./crew";
import { CoachProfile } from "./coachProfile";
import { Offer } from "./offer";
import { Notification } from "./notification";
import { Message } from "./message";
import { Conversation } from "./conversation";
import { Membership } from "./memberShip";
import { Feedback } from "./feedback";
import { NotificationPreference } from "./notificationPreference";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  firstname!: string;

  @Field()
  @Column({ unique: true })
  lastname!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column()
  roles!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sex?: "male" | "female";

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.coach)
  students?: User[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.students, { nullable: true })
  coach?: User | null;

  @Field(() => [Training], { nullable: true })
  @OneToMany(() => Training, (training) => training.user)
  trainings?: Training[];

  @Field(() => [Feedback], { nullable: true })
  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks?: Feedback[];

  @Field(() => [Request], { nullable: true })
  @OneToMany(() => Request, (request) => request.sender)
  sentRequests?: Request[];

  @Field(() => [Request], { nullable: true })
  @OneToMany(() => Request, (request) => request.receiver)
  receivedRequests?: Request[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages?: Message[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages?: Message[];

  @Field(() => [Conversation], { nullable: true })
  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  conversations?: Conversation[];

  @Field(() => [ExerciceModel], { nullable: true })
  @OneToMany(() => ExerciceModel, (exerciceModel) => exerciceModel.user)
  exerciceModels?: ExerciceModel[];

  @Field(() => [ExerciceModel], { nullable: true })
  @ManyToMany(() => ExerciceModel, (ex) => ex.userFavorites, {
    cascade: true,
  })
  @JoinTable()
  favoriteExercices?: ExerciceModel[];

  @Field(() => Crew, { nullable: true })
  @ManyToOne(() => Crew, (crew) => crew.students, {
    nullable: true,
    onDelete: "SET NULL",
  })
  crew?: Crew | null;

  @Field(() => [Crew], { nullable: true })
  @OneToMany(() => Crew, (crew) => crew.coach)
  coachedCrews?: Crew[];

  @Field(() => CoachProfile, { nullable: true })
  @OneToOne(() => CoachProfile, (coachProfile) => coachProfile.user)
  coachProfile?: CoachProfile;

  @Field(() => [Offer], { nullable: true })
  @OneToMany(() => Offer, (offer) => offer.user)
  offers?: Offer[];

  @Field(() => Offer, { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.students, { nullable: true })
  studentOffer?: Offer | null;

  @Field(() => [Membership], { nullable: true })
  @OneToMany(() => Membership, (membership) => membership.student)
  memberships?: Membership[];

  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications?: Notification[];

  @Field(() => [NotificationPreference])
  @OneToMany(() => NotificationPreference, (preference) => preference.user, {
    cascade: ["insert", "update"],
  })
  notificationPreferences!: NotificationPreference[];
}
