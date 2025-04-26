import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../entities/user";
import { Training } from "../entities/training";
import { Feedback } from "../entities/feedback";
import { Request } from "../entities/request";
import { Exercice } from "../entities/exercice";
import { ExerciceType } from "../entities/exerciceType";
import { ExerciceModel } from "../entities/exerciceModel";
import { Crew } from "../entities/crew";
import { CoachProfile } from "../entities/coachProfile";
import { Offer } from "../entities/offer";
import { OfferCategory } from "../entities/offerCategory";
import { Notification } from "../entities/notification";
import { Message } from "../entities/message";
import { Conversation } from "../entities/conversation";
import { Membership } from "../entities/memberShip";
import { Program } from "../entities/program";

config();

const { DB_PASSWORD, DB_SCHEMA, DB_USER, DB_HOST } = process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  port: 5432,
  entities: [
    User,
    Training,
    Feedback,
    Request,
    Exercice,
    ExerciceType,
    ExerciceModel,
    Crew,
    CoachProfile,
    Offer,
    OfferCategory,
    Notification,
    Message,
    Conversation,
    Membership,
    Program,
  ],
  synchronize: true,
});
