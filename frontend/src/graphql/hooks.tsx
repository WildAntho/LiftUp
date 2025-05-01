import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type ActiveMembershipType = {
  offerId: Scalars['String']['input'];
  studentId: Scalars['String']['input'];
};

export type AddExercicePlanInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  intensity?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  rep?: InputMaybe<Scalars['Float']['input']>;
  serie?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<ExerciceTypeData>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type AddMessagetData = {
  content: Scalars['String']['input'];
  conversationId?: InputMaybe<Scalars['String']['input']>;
  isNew: Scalars['Boolean']['input'];
  receiverId: Scalars['String']['input'];
  repliedMessageId?: InputMaybe<Scalars['String']['input']>;
  senderId: Scalars['String']['input'];
};

export type AddRequestData = {
  description?: InputMaybe<Scalars['String']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Float']['input']>;
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type CoachProfile = {
  __typename?: 'CoachProfile';
  description?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  specialisation?: Maybe<Array<Scalars['String']['output']>>;
  user?: Maybe<User>;
};

export type CoachProfileInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  specialisation?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Config = {
  intensity?: InputMaybe<Scalars['Float']['input']>;
  rep?: InputMaybe<Scalars['Float']['input']>;
  serie?: InputMaybe<Scalars['Float']['input']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Message>>;
  participants: Array<User>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Crew = {
  __typename?: 'Crew';
  coach: User;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offer?: Maybe<Offer>;
  students?: Maybe<Array<User>>;
  trainings?: Maybe<Array<Training>>;
};

export type Exercice = {
  __typename?: 'Exercice';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  intensity?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  rep: Scalars['Float']['output'];
  serie: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  training?: Maybe<Training>;
  trainingPlan?: Maybe<TrainingPlan>;
  type?: Maybe<ExerciceType>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ExerciceData = {
  config?: InputMaybe<Config>;
  id?: InputMaybe<Scalars['String']['input']>;
  intensity?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  rep: Scalars['Float']['input'];
  serie: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  type?: InputMaybe<ExerciceTypeData>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ExerciceModel = {
  __typename?: 'ExerciceModel';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  intensity?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  rep?: Maybe<Scalars['Float']['output']>;
  serie?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  type?: Maybe<ExerciceType>;
  user?: Maybe<User>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ExerciceModelData = {
  id?: InputMaybe<Scalars['String']['input']>;
  intensity?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rep?: InputMaybe<Scalars['Float']['input']>;
  serie?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<ExerciceTypeData>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ExerciceModelInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
};

export type ExerciceType = {
  __typename?: 'ExerciceType';
  exercices?: Maybe<Array<Exercice>>;
  exercicesModels?: Maybe<Array<ExerciceModel>>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ExerciceTypeData = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  comment?: Maybe<Scalars['String']['output']>;
  date: Scalars['DateTimeISO']['output'];
  feeling: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  intensity: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  training: Training;
};

export type FeedbackData = {
  comment: Scalars['String']['input'];
  feeling: Scalars['Float']['input'];
  intensity: Scalars['Float']['input'];
  trainingId: Scalars['String']['input'];
};

export type FeedbackWithoutTrainingId = {
  comment: Scalars['String']['input'];
  feeling: Scalars['Float']['input'];
  intensity: Scalars['Float']['input'];
};

export type MarkAsReadResponse = {
  __typename?: 'MarkAsReadResponse';
  message: Scalars['String']['output'];
};

export type Membership = {
  __typename?: 'Membership';
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  offer: Offer;
  startDate: Scalars['DateTimeISO']['output'];
  student: User;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversation: Conversation;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTimeISO']['output']>;
  receiver: User;
  repliedMessage?: Maybe<Message>;
  replies?: Maybe<Array<Message>>;
  sender: User;
};

export type MessageResult = {
  __typename?: 'MessageResult';
  messages: Array<Message>;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: Scalars['String']['output'];
  activeMembership: Scalars['String']['output'];
  addCategory: Scalars['String']['output'];
  addCoachProfile: Scalars['String']['output'];
  addExercice: Exercice;
  addExerciceToProgram: Scalars['String']['output'];
  addFeedback: Scalars['String']['output'];
  addMessages: Scalars['String']['output'];
  addOffer: Scalars['String']['output'];
  addRequest: Scalars['String']['output'];
  addTraining: Scalars['String']['output'];
  addTrainingCrew: Scalars['String']['output'];
  addTrainingStudent: Scalars['String']['output'];
  archiveProgram: Scalars['String']['output'];
  createCrew: Scalars['String']['output'];
  createExerciceModel: Scalars['String']['output'];
  createProgram: Program;
  createTrainingPlan: Scalars['String']['output'];
  deleteCrew: Scalars['String']['output'];
  deleteExercice: Scalars['String']['output'];
  deleteFeedback: Scalars['String']['output'];
  deleteOffer: Scalars['String']['output'];
  deleteStudent: Scalars['String']['output'];
  deleteTraining: Scalars['String']['output'];
  deleteTrainingPlan: Scalars['String']['output'];
  hasBeenSeen: Scalars['String']['output'];
  isRead: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  markAsRead: MarkAsReadResponse;
  publishProgram: Scalars['String']['output'];
  rejectRequest: Scalars['String']['output'];
  renewMemberShip: Scalars['String']['output'];
  signUp: Scalars['String']['output'];
  updateCoachProfile: Scalars['String']['output'];
  updateCrew: Scalars['String']['output'];
  updateExercice: Exercice;
  updateFeedback: Scalars['String']['output'];
  updateOffer: Scalars['String']['output'];
  updateProfile: User;
  updateProgram: Scalars['String']['output'];
  updateTraining: Scalars['String']['output'];
  updateTrainingPlan: Scalars['String']['output'];
};


export type MutationAcceptRequestArgs = {
  data: AddRequestData;
  id: Scalars['String']['input'];
};


export type MutationActiveMembershipArgs = {
  data: ActiveMembershipType;
};


export type MutationAddCategoryArgs = {
  label: Scalars['String']['input'];
};


export type MutationAddCoachProfileArgs = {
  data: CoachProfileInput;
};


export type MutationAddExerciceArgs = {
  data: ExerciceData;
  id: Scalars['String']['input'];
};


export type MutationAddExerciceToProgramArgs = {
  exercices: Array<AddExercicePlanInput>;
  id: Scalars['String']['input'];
};


export type MutationAddFeedbackArgs = {
  data: FeedbackData;
};


export type MutationAddMessagesArgs = {
  data: AddMessagetData;
};


export type MutationAddOfferArgs = {
  data: OfferInput;
};


export type MutationAddRequestArgs = {
  data: AddRequestData;
};


export type MutationAddTrainingArgs = {
  data: TrainingData;
};


export type MutationAddTrainingCrewArgs = {
  data: TrainingData;
};


export type MutationAddTrainingStudentArgs = {
  data: TrainingData;
};


export type MutationArchiveProgramArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateCrewArgs = {
  ids: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateExerciceModelArgs = {
  data: ExerciceModelData;
};


export type MutationCreateProgramArgs = {
  data: ProgramInput;
};


export type MutationCreateTrainingPlanArgs = {
  data: TrainingPlanData;
};


export type MutationDeleteCrewArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExerciceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFeedbackArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteStudentArgs = {
  data: StudentCoach;
};


export type MutationDeleteTrainingArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTrainingPlanArgs = {
  id: Scalars['String']['input'];
};


export type MutationHasBeenSeenArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationIsReadArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  data: UserLogin;
};


export type MutationMarkAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationPublishProgramArgs = {
  id: Scalars['String']['input'];
};


export type MutationRejectRequestArgs = {
  id: Scalars['String']['input'];
};


export type MutationRenewMemberShipArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  data: UserInput;
};


export type MutationUpdateCoachProfileArgs = {
  data: CoachProfileInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateCrewArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  studentIds: Array<Scalars['String']['input']>;
};


export type MutationUpdateExerciceArgs = {
  data: ExerciceData;
  id: Scalars['String']['input'];
};


export type MutationUpdateFeedbackArgs = {
  data: FeedbackWithoutTrainingId;
  id: Scalars['String']['input'];
};


export type MutationUpdateOfferArgs = {
  data: OfferInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfile;
};


export type MutationUpdateProgramArgs = {
  data: UpdateProgramInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateTrainingArgs = {
  data: UpdateTrainingData;
};


export type MutationUpdateTrainingPlanArgs = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTimeISO']['output'];
  hasBeenSeen: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  request?: Maybe<Request>;
  type: Scalars['String']['output'];
  user: User;
};

export type Offer = {
  __typename?: 'Offer';
  availability: Scalars['Boolean']['output'];
  category: OfferCategory;
  crew?: Maybe<Crew>;
  description: Scalars['String']['output'];
  durability: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  memberships?: Maybe<Array<Membership>>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  requests?: Maybe<Array<Request>>;
  students?: Maybe<Array<User>>;
  user?: Maybe<User>;
};

export type OfferCategory = {
  __typename?: 'OfferCategory';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  offers?: Maybe<Array<Offer>>;
};

export type OfferInput = {
  availability: Scalars['Boolean']['input'];
  categoryId: Scalars['String']['input'];
  crewId?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  durability: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Program = {
  __typename?: 'Program';
  coach: User;
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  level: ProgramLevel;
  price?: Maybe<Scalars['Float']['output']>;
  public: Scalars['Boolean']['output'];
  status: ProgramStatus;
  title: Scalars['String']['output'];
  trainingPlans: Array<TrainingPlan>;
};

export type ProgramInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  level?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  public: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

/** Le niveau d'un programme (débutant, intermédiaire, avancé) */
export enum ProgramLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

/** Le statut d'un programme (brouillon, publié, archivé) */
export enum ProgramStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<OfferCategory>;
  getAllExercicesModel: Array<ExerciceModel>;
  getChatUsers: Array<User>;
  getCoachCrews: Array<Crew>;
  getCoachOffers: Array<Offer>;
  getCoachProfile: CoachProfile;
  getConversationById: Conversation;
  getConversations: Array<Conversation>;
  getCrewTraining: Array<Training>;
  getDayNumberTraining: Array<Scalars['Float']['output']>;
  getExerciceTypes: Array<ExerciceType>;
  getExercices: Array<Exercice>;
  getFeedbacks: Array<Feedback>;
  getListUsersCrew: Array<User>;
  getMessages: MessageResult;
  getMyCrew: Crew;
  getNotification: Array<Notification>;
  getOneCoachOffers: Array<Offer>;
  getOneCoachProfile: CoachProfile;
  getOneTraining: Training;
  getPrograms: Array<Program>;
  getRequest: Array<Request>;
  getSent: Array<Request>;
  getStudentFeedback: Array<Feedback>;
  getStudentTrainings: Array<Training>;
  getStudents: StudentsResponse;
  getTotalStudents: Scalars['Int']['output'];
  getTotalUnreadMessage: Scalars['Int']['output'];
  getTrainingPlan: Array<TrainingPlan>;
  getTrainingsById: Array<Training>;
  getUnreadRequests: Array<Request>;
  getUserById: User;
  getUsers: Array<User>;
  selectCoach: Array<User>;
  selectUsers: Array<User>;
};


export type QueryGetAllExercicesModelArgs = {
  data?: InputMaybe<ExerciceModelInput>;
};


export type QueryGetConversationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCrewTrainingArgs = {
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
};


export type QueryGetDayNumberTrainingArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExercicesArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetFeedbacksArgs = {
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
};


export type QueryGetListUsersCrewArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMessagesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetOneCoachOffersArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneCoachProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneTrainingArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProgramsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRequestArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSentArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStudentFeedbackArgs = {
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
};


export type QueryGetStudentTrainingsArgs = {
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
};


export type QueryGetStudentsArgs = {
  crewId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  input?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sortRemaining?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetTrainingPlanArgs = {
  data: GetTrainingType;
};


export type QueryGetTrainingsByIdArgs = {
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySelectCoachArgs = {
  categorie?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  input?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Array<Scalars['Float']['input']>>;
};


export type QuerySelectUsersArgs = {
  id: Scalars['String']['input'];
  input?: InputMaybe<Scalars['String']['input']>;
};

export type RangeDate = {
  endDate: Scalars['DateTimeISO']['input'];
  startDate: Scalars['DateTimeISO']['input'];
};

export type Request = {
  __typename?: 'Request';
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  notifications?: Maybe<Array<Notification>>;
  offer?: Maybe<Offer>;
  phone?: Maybe<Scalars['Float']['output']>;
  receiver: User;
  sender: User;
  status: Scalars['String']['output'];
};

export type StudentCoach = {
  coach_id: Scalars['String']['input'];
  student_id: Scalars['String']['input'];
};

export type StudentsResponse = {
  __typename?: 'StudentsResponse';
  students: Array<User>;
  totalCount: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  lastMessageRead: Scalars['String']['output'];
  newMessage: Message;
  newNotification: Notification;
  totalMessage: Scalars['Int']['output'];
};


export type SubscriptionLastMessageReadArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionNewMessageArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionNewNotificationArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTotalMessageArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Training = {
  __typename?: 'Training';
  color: Scalars['String']['output'];
  createdByCoach?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<Crew>;
  date: Scalars['DateTimeISO']['output'];
  editable: Scalars['Boolean']['output'];
  exercices?: Maybe<Array<Exercice>>;
  feedback?: Maybe<Feedback>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  user?: Maybe<User>;
  validate: Scalars['Boolean']['output'];
};

export type TrainingData = {
  color?: InputMaybe<Scalars['String']['input']>;
  date: Array<Scalars['DateTimeISO']['input']>;
  editable?: InputMaybe<Scalars['Boolean']['input']>;
  exercices?: InputMaybe<Array<ExerciceData>>;
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type TrainingPlan = {
  __typename?: 'TrainingPlan';
  dayNumber: Scalars['Float']['output'];
  exercices?: Maybe<Array<Exercice>>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  program: Program;
  title: Scalars['String']['output'];
};

export type TrainingPlanData = {
  dayNumber: Scalars['Float']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  programId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateProfile = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type UpdateProgramInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  level?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  public: Scalars['Boolean']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateTrainingData = {
  color?: InputMaybe<Scalars['String']['input']>;
  date: Array<Scalars['DateTimeISO']['input']>;
  editable?: InputMaybe<Scalars['Boolean']['input']>;
  exercices?: InputMaybe<Array<ExerciceData>>;
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  coach?: Maybe<User>;
  coachProfile?: Maybe<CoachProfile>;
  coachedCrews?: Maybe<Array<Crew>>;
  conversations?: Maybe<Array<Conversation>>;
  crew?: Maybe<Crew>;
  email: Scalars['String']['output'];
  exerciceModels?: Maybe<Array<ExerciceModel>>;
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  memberships?: Maybe<Array<Membership>>;
  notifications?: Maybe<Array<Notification>>;
  offers?: Maybe<Array<Offer>>;
  password: Scalars['String']['output'];
  receivedMessages?: Maybe<Array<Message>>;
  receivedRequests?: Maybe<Array<Request>>;
  roles: Scalars['String']['output'];
  sentMessages?: Maybe<Array<Message>>;
  sentRequests?: Maybe<Array<Request>>;
  studentOffer?: Maybe<Offer>;
  students?: Maybe<Array<User>>;
  trainings?: Maybe<Array<Training>>;
};

export type UserInput = {
  confirmedPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles: Scalars['String']['input'];
};

export type GetTrainingType = {
  dayNumber: Scalars['Float']['input'];
  programId: Scalars['String']['input'];
};

export type UserLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AcceptRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: AddRequestData;
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: string };

export type ActivateMemberShipMutationVariables = Exact<{
  data: ActiveMembershipType;
}>;


export type ActivateMemberShipMutation = { __typename?: 'Mutation', activeMembership: string };

export type AddCoachProfileMutationVariables = Exact<{
  data: CoachProfileInput;
}>;


export type AddCoachProfileMutation = { __typename?: 'Mutation', addCoachProfile: string };

export type AddExerciceMutationVariables = Exact<{
  data: ExerciceData;
  id: Scalars['String']['input'];
}>;


export type AddExerciceMutation = { __typename?: 'Mutation', addExercice: { __typename?: 'Exercice', id: string, title: string, serie: number, intensity?: number | null, rep: number, weight?: number | null } };

export type AddExerciceProgramMutationVariables = Exact<{
  exercices: Array<AddExercicePlanInput> | AddExercicePlanInput;
  trainingId: Scalars['String']['input'];
}>;


export type AddExerciceProgramMutation = { __typename?: 'Mutation', addExerciceToProgram: string };

export type AddFeedbackMutationVariables = Exact<{
  data: FeedbackData;
}>;


export type AddFeedbackMutation = { __typename?: 'Mutation', addFeedback: string };

export type AddMessageMutationVariables = Exact<{
  data: AddMessagetData;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessages: string };

export type AddOfferMutationVariables = Exact<{
  data: OfferInput;
}>;


export type AddOfferMutation = { __typename?: 'Mutation', addOffer: string };

export type AddRequestMutationVariables = Exact<{
  data: AddRequestData;
}>;


export type AddRequestMutation = { __typename?: 'Mutation', addRequest: string };

export type AddTrainingMutationVariables = Exact<{
  data: TrainingData;
}>;


export type AddTrainingMutation = { __typename?: 'Mutation', addTraining: string };

export type AddTrainingCrewMutationVariables = Exact<{
  data: TrainingData;
}>;


export type AddTrainingCrewMutation = { __typename?: 'Mutation', addTrainingCrew: string };

export type AddTrainingStudentMutationVariables = Exact<{
  data: TrainingData;
}>;


export type AddTrainingStudentMutation = { __typename?: 'Mutation', addTrainingStudent: string };

export type ArchiveProgramMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ArchiveProgramMutation = { __typename?: 'Mutation', archiveProgram: string };

export type CreateCrewMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateCrewMutation = { __typename?: 'Mutation', createCrew: string };

export type CreateProgramMutationVariables = Exact<{
  data: ProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'Program', id: string, title: string, description?: string | null, status: ProgramStatus, duration: number, public: boolean, price?: number | null, level: ProgramLevel } };

export type CreateTrainingPlanMutationVariables = Exact<{
  data: TrainingPlanData;
}>;


export type CreateTrainingPlanMutation = { __typename?: 'Mutation', createTrainingPlan: string };

export type DeleteCrewMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCrewMutation = { __typename?: 'Mutation', deleteCrew: string };

export type DeleteExerciceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExerciceMutation = { __typename?: 'Mutation', deleteExercice: string };

export type DeleteFeedbackMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteFeedbackMutation = { __typename?: 'Mutation', deleteFeedback: string };

export type DeleteOfferMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer: string };

export type DeleteStudentMutationVariables = Exact<{
  data: StudentCoach;
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent: string };

export type DeleteTrainingMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTrainingMutation = { __typename?: 'Mutation', deleteTraining: string };

export type DeleteTrainingPlanMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTrainingPlanMutation = { __typename?: 'Mutation', deleteTrainingPlan: string };

export type LoginMutationVariables = Exact<{
  data: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MarkAsReadMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MarkAsReadMutation = { __typename?: 'Mutation', markAsRead: { __typename?: 'MarkAsReadResponse', message: string } };

export type IsReadMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type IsReadMutation = { __typename?: 'Mutation', isRead: string };

export type HasBeenseenMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type HasBeenseenMutation = { __typename?: 'Mutation', hasBeenSeen: string };

export type RejectRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RejectRequestMutation = { __typename?: 'Mutation', rejectRequest: string };

export type RenewMemberShipMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RenewMemberShipMutation = { __typename?: 'Mutation', renewMemberShip: string };

export type SignupMutationVariables = Exact<{
  data: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: string };

export type UpdateCoachProfileMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: CoachProfileInput;
}>;


export type UpdateCoachProfileMutation = { __typename?: 'Mutation', updateCoachProfile: string };

export type UpdateCrewMutationVariables = Exact<{
  name: Scalars['String']['input'];
  studentIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  crewId: Scalars['String']['input'];
}>;


export type UpdateCrewMutation = { __typename?: 'Mutation', updateCrew: string };

export type UpdateExerciceMutationVariables = Exact<{
  data: ExerciceData;
  id: Scalars['String']['input'];
}>;


export type UpdateExerciceMutation = { __typename?: 'Mutation', updateExercice: { __typename?: 'Exercice', id: string, title: string, serie: number, intensity?: number | null, rep: number, weight?: number | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null } };

export type UpdateFeedbackMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: FeedbackWithoutTrainingId;
}>;


export type UpdateFeedbackMutation = { __typename?: 'Mutation', updateFeedback: string };

export type UpdateOfferMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: OfferInput;
}>;


export type UpdateOfferMutation = { __typename?: 'Mutation', updateOffer: string };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfile;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null } };

export type UpdateProgramMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateProgramInput;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: string };

export type UpdateTrainingMutationVariables = Exact<{
  data: UpdateTrainingData;
}>;


export type UpdateTrainingMutation = { __typename?: 'Mutation', updateTraining: string };

export type UpdateTrainingPlanMutationVariables = Exact<{
  title: Scalars['String']['input'];
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTrainingPlanMutation = { __typename?: 'Mutation', updateTrainingPlan: string };

export type ValidateProgramMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidateProgramMutation = { __typename?: 'Mutation', publishProgram: string };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'OfferCategory', id: string, label: string }> };

export type GetAllExercicesModelQueryVariables = Exact<{
  data?: InputMaybe<ExerciceModelInput>;
}>;


export type GetAllExercicesModelQuery = { __typename?: 'Query', getAllExercicesModel: Array<{ __typename?: 'ExerciceModel', id: string, title: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, notes?: string | null, image?: string | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null }> };

export type GetChatUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatUsersQuery = { __typename?: 'Query', getChatUsers: Array<{ __typename?: 'User', firstname: string, id: string, email: string, lastname: string, avatar?: string | null, roles: string }> };

export type GetCoachQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCoachQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', coach?: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null } | null } };

export type GetCoachCrewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoachCrewsQuery = { __typename?: 'Query', getCoachCrews: Array<{ __typename?: 'Crew', id: string, name: string, students?: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null }> | null }> };

export type GetOneCoachOffersQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneCoachOffersQuery = { __typename?: 'Query', getOneCoachOffers: Array<{ __typename?: 'Offer', id: string, name: string, price: number, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', label: string, id: string } }> };

export type GetOneCoachProfileQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneCoachProfileQuery = { __typename?: 'Query', getOneCoachProfile: { __typename?: 'CoachProfile', id: string, name?: string | null, description?: string | null, specialisation?: Array<string> | null, facebook?: string | null, instagram?: string | null, linkedin?: string | null, user?: { __typename?: 'User', firstname: string, lastname: string } | null } };

export type GetConversationByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetConversationByIdQuery = { __typename?: 'Query', getConversationById: { __typename?: 'Conversation', id: string, messages?: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, sender: { __typename?: 'User', id: string }, receiver: { __typename?: 'User', id: string } }> | null } };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'Conversation', id: string, participants: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string, avatar?: string | null }>, messages?: Array<{ __typename?: 'Message', content: string, createdAt: any, readAt?: any | null, sender: { __typename?: 'User', id: string } }> | null }> };

export type GetCrewTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetCrewTrainingQuery = { __typename?: 'Query', getCrewTraining: Array<{ __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean, color: string, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie: number, rep: number, intensity?: number | null, weight?: number | null, notes?: string | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null }> | null }> };

export type GetDayNumberTrainingQueryVariables = Exact<{
  programId: Scalars['String']['input'];
}>;


export type GetDayNumberTrainingQuery = { __typename?: 'Query', getDayNumberTraining: Array<number> };

export type GetExerciceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExerciceTypesQuery = { __typename?: 'Query', getExerciceTypes: Array<{ __typename?: 'ExerciceType', id: string, value: string, label: string }> };

export type GetExercicesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExercicesQuery = { __typename?: 'Query', getExercices: Array<{ __typename?: 'Exercice', id: string, title: string, serie: number, rep: number, intensity?: number | null, weight?: number | null, notes?: string | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null }> };

export type GetFeedbacksQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetFeedbacksQuery = { __typename?: 'Query', getFeedbacks: Array<{ __typename?: 'Feedback', id: string, intensity: number, feeling: number, comment?: string | null, title: string, date: any }> };

export type GetListUsersCrewQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListUsersCrewQuery = { __typename?: 'Query', getListUsersCrew: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null }> };

export type GetMessagesQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessageResult', totalCount: number, messages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, readAt?: any | null, repliedMessage?: { __typename?: 'Message', id: string, content: string } | null, sender: { __typename?: 'User', id: string }, receiver: { __typename?: 'User', id: string } }> } };

export type GetMyOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOffersQuery = { __typename?: 'Query', getCoachOffers: Array<{ __typename?: 'Offer', id: string, name: string, price: number, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', label: string, id: string }, crew?: { __typename?: 'Crew', id: string, name: string } | null }> };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', getCoachProfile: { __typename?: 'CoachProfile', id: string, name?: string | null, description?: string | null, specialisation?: Array<string> | null, instagram?: string | null, linkedin?: string | null, facebook?: string | null } };

export type GetMyProgramsQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyProgramsQuery = { __typename?: 'Query', getPrograms: Array<{ __typename?: 'Program', id: string, title: string, description?: string | null, status: ProgramStatus, duration: number, public: boolean, price?: number | null, level: ProgramLevel }> };

export type GetMyTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetMyTrainingQuery = { __typename?: 'Query', getTrainingsById: Array<{ __typename?: 'Training', createdByCoach?: string | null, id: string, title: string, date: any, notes?: string | null, editable: boolean, validate: boolean, color: string, crew?: { __typename?: 'Crew', id: string } | null, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie: number, rep: number, intensity?: number | null, weight?: number | null, notes?: string | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null }> | null }> };

export type GetNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification: Array<{ __typename?: 'Notification', id: string, type: string, isRead: boolean, hasBeenSeen: boolean, createdAt: any, request?: { __typename?: 'Request', sender: { __typename?: 'User', firstname: string, lastname: string, roles: string, avatar?: string | null }, receiver: { __typename?: 'User', firstname: string, lastname: string, avatar?: string | null } } | null }> };

export type GetOneTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneTrainingQuery = { __typename?: 'Query', getOneTraining: { __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean } };

export type GetRequestQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRequestQuery = { __typename?: 'Query', getRequest: Array<{ __typename?: 'Request', id: string, description?: string | null, phone?: number | null, offer?: { __typename?: 'Offer', name: string, id: string } | null, sender: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null } }> };

export type GetSentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSentQuery = { __typename?: 'Query', getSent: Array<{ __typename?: 'Request', receiver: { __typename?: 'User', email: string, id: string, firstname: string, lastname: string, roles: string, avatar?: string | null } }> };

export type GetStudentFeedbackQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetStudentFeedbackQuery = { __typename?: 'Query', getStudentFeedback: Array<{ __typename?: 'Feedback', id: string, title: string, intensity: number, feeling: number, date: any, comment?: string | null }> };

export type GetStudentTrainingsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetStudentTrainingsQuery = { __typename?: 'Query', getStudentTrainings: Array<{ __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean, color: string, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie: number, rep: number, intensity?: number | null, weight?: number | null, notes?: string | null, type?: { __typename?: 'ExerciceType', id: string, value: string, label: string } | null }> | null }> };

export type GetStudentsQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  crewId?: InputMaybe<Scalars['String']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  sortRemaining?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetStudentsQuery = { __typename?: 'Query', getStudents: { __typename?: 'StudentsResponse', totalCount: number, students: Array<{ __typename?: 'User', email: string, firstname: string, lastname: string, roles: string, id: string, avatar?: string | null, studentOffer?: { __typename?: 'Offer', name: string, durability: number, id: string } | null, crew?: { __typename?: 'Crew', id: string, name: string } | null, memberships?: Array<{ __typename?: 'Membership', id: string, endDate: any, isActive: boolean }> | null }> } };

export type GetTotalStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalStudentsQuery = { __typename?: 'Query', getTotalStudents: number };

export type GetTotalUnreadMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalUnreadMessageQuery = { __typename?: 'Query', getTotalUnreadMessage: number };

export type GetTrainingPlanQueryVariables = Exact<{
  data: GetTrainingType;
}>;


export type GetTrainingPlanQuery = { __typename?: 'Query', getTrainingPlan: Array<{ __typename?: 'TrainingPlan', id: string, title: string, dayNumber: number, notes?: string | null, exercices?: Array<{ __typename?: 'Exercice', id: string, title: string, serie: number, rep: number, intensity?: number | null, weight?: number | null, notes?: string | null, image?: string | null, position?: number | null }> | null }> };

export type SelectCoachQueryVariables = Exact<{
  id: Scalars['String']['input'];
  price?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  categorie?: InputMaybe<Scalars['String']['input']>;
}>;


export type SelectCoachQuery = { __typename?: 'Query', selectCoach: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null, coachProfile?: { __typename?: 'CoachProfile', id: string, name?: string | null, specialisation?: Array<string> | null } | null, offers?: Array<{ __typename?: 'Offer', id: string, price: number, name: string, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', id: string, label: string } }> | null }> };

export type SelectUsersQueryVariables = Exact<{
  id: Scalars['String']['input'];
  input?: InputMaybe<Scalars['String']['input']>;
}>;


export type SelectUsersQuery = { __typename?: 'Query', selectUsers: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: string, avatar?: string | null }> };

export type LastMessageReadSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type LastMessageReadSubscription = { __typename?: 'Subscription', lastMessageRead: string };

export type NewMessageSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, content: string, createdAt: any, readAt?: any | null, repliedMessage?: { __typename?: 'Message', id: string, content: string } | null, sender: { __typename?: 'User', id: string, avatar?: string | null, firstname: string, lastname: string }, receiver: { __typename?: 'User', id: string } } };

export type SubNewNotificationSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SubNewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: string, type: string, hasBeenSeen: boolean, isRead: boolean, createdAt: any, request?: { __typename?: 'Request', id: string, sender: { __typename?: 'User', firstname: string, lastname: string, roles: string }, receiver: { __typename?: 'User', firstname: string, lastname: string } } | null } };

export type TotalUnreadMessageSubSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TotalUnreadMessageSubSubscription = { __typename?: 'Subscription', totalMessage: number };


export const AcceptRequestDocument = gql`
    mutation AcceptRequest($id: String!, $data: AddRequestData!) {
  acceptRequest(id: $id, data: $data)
}
    `;
export type AcceptRequestMutationFn = Apollo.MutationFunction<AcceptRequestMutation, AcceptRequestMutationVariables>;

/**
 * __useAcceptRequestMutation__
 *
 * To run a mutation, you first call `useAcceptRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRequestMutation, { data, loading, error }] = useAcceptRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAcceptRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptRequestMutation, AcceptRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument, options);
      }
export type AcceptRequestMutationHookResult = ReturnType<typeof useAcceptRequestMutation>;
export type AcceptRequestMutationResult = Apollo.MutationResult<AcceptRequestMutation>;
export type AcceptRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRequestMutation, AcceptRequestMutationVariables>;
export const ActivateMemberShipDocument = gql`
    mutation ActivateMemberShip($data: ActiveMembershipType!) {
  activeMembership(data: $data)
}
    `;
export type ActivateMemberShipMutationFn = Apollo.MutationFunction<ActivateMemberShipMutation, ActivateMemberShipMutationVariables>;

/**
 * __useActivateMemberShipMutation__
 *
 * To run a mutation, you first call `useActivateMemberShipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMemberShipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMemberShipMutation, { data, loading, error }] = useActivateMemberShipMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useActivateMemberShipMutation(baseOptions?: Apollo.MutationHookOptions<ActivateMemberShipMutation, ActivateMemberShipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateMemberShipMutation, ActivateMemberShipMutationVariables>(ActivateMemberShipDocument, options);
      }
export type ActivateMemberShipMutationHookResult = ReturnType<typeof useActivateMemberShipMutation>;
export type ActivateMemberShipMutationResult = Apollo.MutationResult<ActivateMemberShipMutation>;
export type ActivateMemberShipMutationOptions = Apollo.BaseMutationOptions<ActivateMemberShipMutation, ActivateMemberShipMutationVariables>;
export const AddCoachProfileDocument = gql`
    mutation AddCoachProfile($data: CoachProfileInput!) {
  addCoachProfile(data: $data)
}
    `;
export type AddCoachProfileMutationFn = Apollo.MutationFunction<AddCoachProfileMutation, AddCoachProfileMutationVariables>;

/**
 * __useAddCoachProfileMutation__
 *
 * To run a mutation, you first call `useAddCoachProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCoachProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCoachProfileMutation, { data, loading, error }] = useAddCoachProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddCoachProfileMutation(baseOptions?: Apollo.MutationHookOptions<AddCoachProfileMutation, AddCoachProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCoachProfileMutation, AddCoachProfileMutationVariables>(AddCoachProfileDocument, options);
      }
export type AddCoachProfileMutationHookResult = ReturnType<typeof useAddCoachProfileMutation>;
export type AddCoachProfileMutationResult = Apollo.MutationResult<AddCoachProfileMutation>;
export type AddCoachProfileMutationOptions = Apollo.BaseMutationOptions<AddCoachProfileMutation, AddCoachProfileMutationVariables>;
export const AddExerciceDocument = gql`
    mutation AddExercice($data: ExerciceData!, $id: String!) {
  addExercice(data: $data, id: $id) {
    id
    title
    serie
    intensity
    rep
    weight
  }
}
    `;
export type AddExerciceMutationFn = Apollo.MutationFunction<AddExerciceMutation, AddExerciceMutationVariables>;

/**
 * __useAddExerciceMutation__
 *
 * To run a mutation, you first call `useAddExerciceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciceMutation, { data, loading, error }] = useAddExerciceMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddExerciceMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciceMutation, AddExerciceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciceMutation, AddExerciceMutationVariables>(AddExerciceDocument, options);
      }
export type AddExerciceMutationHookResult = ReturnType<typeof useAddExerciceMutation>;
export type AddExerciceMutationResult = Apollo.MutationResult<AddExerciceMutation>;
export type AddExerciceMutationOptions = Apollo.BaseMutationOptions<AddExerciceMutation, AddExerciceMutationVariables>;
export const AddExerciceProgramDocument = gql`
    mutation AddExerciceProgram($exercices: [AddExercicePlanInput!]!, $trainingId: String!) {
  addExerciceToProgram(exercices: $exercices, id: $trainingId)
}
    `;
export type AddExerciceProgramMutationFn = Apollo.MutationFunction<AddExerciceProgramMutation, AddExerciceProgramMutationVariables>;

/**
 * __useAddExerciceProgramMutation__
 *
 * To run a mutation, you first call `useAddExerciceProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciceProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciceProgramMutation, { data, loading, error }] = useAddExerciceProgramMutation({
 *   variables: {
 *      exercices: // value for 'exercices'
 *      trainingId: // value for 'trainingId'
 *   },
 * });
 */
export function useAddExerciceProgramMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciceProgramMutation, AddExerciceProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciceProgramMutation, AddExerciceProgramMutationVariables>(AddExerciceProgramDocument, options);
      }
export type AddExerciceProgramMutationHookResult = ReturnType<typeof useAddExerciceProgramMutation>;
export type AddExerciceProgramMutationResult = Apollo.MutationResult<AddExerciceProgramMutation>;
export type AddExerciceProgramMutationOptions = Apollo.BaseMutationOptions<AddExerciceProgramMutation, AddExerciceProgramMutationVariables>;
export const AddFeedbackDocument = gql`
    mutation AddFeedback($data: FeedbackData!) {
  addFeedback(data: $data)
}
    `;
export type AddFeedbackMutationFn = Apollo.MutationFunction<AddFeedbackMutation, AddFeedbackMutationVariables>;

/**
 * __useAddFeedbackMutation__
 *
 * To run a mutation, you first call `useAddFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFeedbackMutation, { data, loading, error }] = useAddFeedbackMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<AddFeedbackMutation, AddFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFeedbackMutation, AddFeedbackMutationVariables>(AddFeedbackDocument, options);
      }
export type AddFeedbackMutationHookResult = ReturnType<typeof useAddFeedbackMutation>;
export type AddFeedbackMutationResult = Apollo.MutationResult<AddFeedbackMutation>;
export type AddFeedbackMutationOptions = Apollo.BaseMutationOptions<AddFeedbackMutation, AddFeedbackMutationVariables>;
export const AddMessageDocument = gql`
    mutation AddMessage($data: AddMessagetData!) {
  addMessages(data: $data)
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, options);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const AddOfferDocument = gql`
    mutation AddOffer($data: OfferInput!) {
  addOffer(data: $data)
}
    `;
export type AddOfferMutationFn = Apollo.MutationFunction<AddOfferMutation, AddOfferMutationVariables>;

/**
 * __useAddOfferMutation__
 *
 * To run a mutation, you first call `useAddOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOfferMutation, { data, loading, error }] = useAddOfferMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOfferMutation(baseOptions?: Apollo.MutationHookOptions<AddOfferMutation, AddOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOfferMutation, AddOfferMutationVariables>(AddOfferDocument, options);
      }
export type AddOfferMutationHookResult = ReturnType<typeof useAddOfferMutation>;
export type AddOfferMutationResult = Apollo.MutationResult<AddOfferMutation>;
export type AddOfferMutationOptions = Apollo.BaseMutationOptions<AddOfferMutation, AddOfferMutationVariables>;
export const AddRequestDocument = gql`
    mutation AddRequest($data: AddRequestData!) {
  addRequest(data: $data)
}
    `;
export type AddRequestMutationFn = Apollo.MutationFunction<AddRequestMutation, AddRequestMutationVariables>;

/**
 * __useAddRequestMutation__
 *
 * To run a mutation, you first call `useAddRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRequestMutation, { data, loading, error }] = useAddRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddRequestMutation(baseOptions?: Apollo.MutationHookOptions<AddRequestMutation, AddRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRequestMutation, AddRequestMutationVariables>(AddRequestDocument, options);
      }
export type AddRequestMutationHookResult = ReturnType<typeof useAddRequestMutation>;
export type AddRequestMutationResult = Apollo.MutationResult<AddRequestMutation>;
export type AddRequestMutationOptions = Apollo.BaseMutationOptions<AddRequestMutation, AddRequestMutationVariables>;
export const AddTrainingDocument = gql`
    mutation AddTraining($data: TrainingData!) {
  addTraining(data: $data)
}
    `;
export type AddTrainingMutationFn = Apollo.MutationFunction<AddTrainingMutation, AddTrainingMutationVariables>;

/**
 * __useAddTrainingMutation__
 *
 * To run a mutation, you first call `useAddTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTrainingMutation, { data, loading, error }] = useAddTrainingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTrainingMutation(baseOptions?: Apollo.MutationHookOptions<AddTrainingMutation, AddTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTrainingMutation, AddTrainingMutationVariables>(AddTrainingDocument, options);
      }
export type AddTrainingMutationHookResult = ReturnType<typeof useAddTrainingMutation>;
export type AddTrainingMutationResult = Apollo.MutationResult<AddTrainingMutation>;
export type AddTrainingMutationOptions = Apollo.BaseMutationOptions<AddTrainingMutation, AddTrainingMutationVariables>;
export const AddTrainingCrewDocument = gql`
    mutation AddTrainingCrew($data: TrainingData!) {
  addTrainingCrew(data: $data)
}
    `;
export type AddTrainingCrewMutationFn = Apollo.MutationFunction<AddTrainingCrewMutation, AddTrainingCrewMutationVariables>;

/**
 * __useAddTrainingCrewMutation__
 *
 * To run a mutation, you first call `useAddTrainingCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTrainingCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTrainingCrewMutation, { data, loading, error }] = useAddTrainingCrewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTrainingCrewMutation(baseOptions?: Apollo.MutationHookOptions<AddTrainingCrewMutation, AddTrainingCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTrainingCrewMutation, AddTrainingCrewMutationVariables>(AddTrainingCrewDocument, options);
      }
export type AddTrainingCrewMutationHookResult = ReturnType<typeof useAddTrainingCrewMutation>;
export type AddTrainingCrewMutationResult = Apollo.MutationResult<AddTrainingCrewMutation>;
export type AddTrainingCrewMutationOptions = Apollo.BaseMutationOptions<AddTrainingCrewMutation, AddTrainingCrewMutationVariables>;
export const AddTrainingStudentDocument = gql`
    mutation AddTrainingStudent($data: TrainingData!) {
  addTrainingStudent(data: $data)
}
    `;
export type AddTrainingStudentMutationFn = Apollo.MutationFunction<AddTrainingStudentMutation, AddTrainingStudentMutationVariables>;

/**
 * __useAddTrainingStudentMutation__
 *
 * To run a mutation, you first call `useAddTrainingStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTrainingStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTrainingStudentMutation, { data, loading, error }] = useAddTrainingStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTrainingStudentMutation(baseOptions?: Apollo.MutationHookOptions<AddTrainingStudentMutation, AddTrainingStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTrainingStudentMutation, AddTrainingStudentMutationVariables>(AddTrainingStudentDocument, options);
      }
export type AddTrainingStudentMutationHookResult = ReturnType<typeof useAddTrainingStudentMutation>;
export type AddTrainingStudentMutationResult = Apollo.MutationResult<AddTrainingStudentMutation>;
export type AddTrainingStudentMutationOptions = Apollo.BaseMutationOptions<AddTrainingStudentMutation, AddTrainingStudentMutationVariables>;
export const ArchiveProgramDocument = gql`
    mutation ArchiveProgram($id: String!) {
  archiveProgram(id: $id)
}
    `;
export type ArchiveProgramMutationFn = Apollo.MutationFunction<ArchiveProgramMutation, ArchiveProgramMutationVariables>;

/**
 * __useArchiveProgramMutation__
 *
 * To run a mutation, you first call `useArchiveProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveProgramMutation, { data, loading, error }] = useArchiveProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveProgramMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveProgramMutation, ArchiveProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveProgramMutation, ArchiveProgramMutationVariables>(ArchiveProgramDocument, options);
      }
export type ArchiveProgramMutationHookResult = ReturnType<typeof useArchiveProgramMutation>;
export type ArchiveProgramMutationResult = Apollo.MutationResult<ArchiveProgramMutation>;
export type ArchiveProgramMutationOptions = Apollo.BaseMutationOptions<ArchiveProgramMutation, ArchiveProgramMutationVariables>;
export const CreateCrewDocument = gql`
    mutation CreateCrew($ids: [String!]!, $name: String!) {
  createCrew(ids: $ids, name: $name)
}
    `;
export type CreateCrewMutationFn = Apollo.MutationFunction<CreateCrewMutation, CreateCrewMutationVariables>;

/**
 * __useCreateCrewMutation__
 *
 * To run a mutation, you first call `useCreateCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCrewMutation, { data, loading, error }] = useCreateCrewMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCrewMutation(baseOptions?: Apollo.MutationHookOptions<CreateCrewMutation, CreateCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCrewMutation, CreateCrewMutationVariables>(CreateCrewDocument, options);
      }
export type CreateCrewMutationHookResult = ReturnType<typeof useCreateCrewMutation>;
export type CreateCrewMutationResult = Apollo.MutationResult<CreateCrewMutation>;
export type CreateCrewMutationOptions = Apollo.BaseMutationOptions<CreateCrewMutation, CreateCrewMutationVariables>;
export const CreateProgramDocument = gql`
    mutation CreateProgram($data: ProgramInput!) {
  createProgram(data: $data) {
    id
    title
    description
    status
    duration
    public
    price
    level
  }
}
    `;
export type CreateProgramMutationFn = Apollo.MutationFunction<CreateProgramMutation, CreateProgramMutationVariables>;

/**
 * __useCreateProgramMutation__
 *
 * To run a mutation, you first call `useCreateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramMutation, { data, loading, error }] = useCreateProgramMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramMutation, CreateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramMutation, CreateProgramMutationVariables>(CreateProgramDocument, options);
      }
export type CreateProgramMutationHookResult = ReturnType<typeof useCreateProgramMutation>;
export type CreateProgramMutationResult = Apollo.MutationResult<CreateProgramMutation>;
export type CreateProgramMutationOptions = Apollo.BaseMutationOptions<CreateProgramMutation, CreateProgramMutationVariables>;
export const CreateTrainingPlanDocument = gql`
    mutation CreateTrainingPlan($data: TrainingPlanData!) {
  createTrainingPlan(data: $data)
}
    `;
export type CreateTrainingPlanMutationFn = Apollo.MutationFunction<CreateTrainingPlanMutation, CreateTrainingPlanMutationVariables>;

/**
 * __useCreateTrainingPlanMutation__
 *
 * To run a mutation, you first call `useCreateTrainingPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainingPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainingPlanMutation, { data, loading, error }] = useCreateTrainingPlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTrainingPlanMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrainingPlanMutation, CreateTrainingPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrainingPlanMutation, CreateTrainingPlanMutationVariables>(CreateTrainingPlanDocument, options);
      }
export type CreateTrainingPlanMutationHookResult = ReturnType<typeof useCreateTrainingPlanMutation>;
export type CreateTrainingPlanMutationResult = Apollo.MutationResult<CreateTrainingPlanMutation>;
export type CreateTrainingPlanMutationOptions = Apollo.BaseMutationOptions<CreateTrainingPlanMutation, CreateTrainingPlanMutationVariables>;
export const DeleteCrewDocument = gql`
    mutation DeleteCrew($id: String!) {
  deleteCrew(id: $id)
}
    `;
export type DeleteCrewMutationFn = Apollo.MutationFunction<DeleteCrewMutation, DeleteCrewMutationVariables>;

/**
 * __useDeleteCrewMutation__
 *
 * To run a mutation, you first call `useDeleteCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCrewMutation, { data, loading, error }] = useDeleteCrewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCrewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCrewMutation, DeleteCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCrewMutation, DeleteCrewMutationVariables>(DeleteCrewDocument, options);
      }
export type DeleteCrewMutationHookResult = ReturnType<typeof useDeleteCrewMutation>;
export type DeleteCrewMutationResult = Apollo.MutationResult<DeleteCrewMutation>;
export type DeleteCrewMutationOptions = Apollo.BaseMutationOptions<DeleteCrewMutation, DeleteCrewMutationVariables>;
export const DeleteExerciceDocument = gql`
    mutation DeleteExercice($id: String!) {
  deleteExercice(id: $id)
}
    `;
export type DeleteExerciceMutationFn = Apollo.MutationFunction<DeleteExerciceMutation, DeleteExerciceMutationVariables>;

/**
 * __useDeleteExerciceMutation__
 *
 * To run a mutation, you first call `useDeleteExerciceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciceMutation, { data, loading, error }] = useDeleteExerciceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciceMutation, DeleteExerciceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciceMutation, DeleteExerciceMutationVariables>(DeleteExerciceDocument, options);
      }
export type DeleteExerciceMutationHookResult = ReturnType<typeof useDeleteExerciceMutation>;
export type DeleteExerciceMutationResult = Apollo.MutationResult<DeleteExerciceMutation>;
export type DeleteExerciceMutationOptions = Apollo.BaseMutationOptions<DeleteExerciceMutation, DeleteExerciceMutationVariables>;
export const DeleteFeedbackDocument = gql`
    mutation DeleteFeedback($id: String!) {
  deleteFeedback(id: $id)
}
    `;
export type DeleteFeedbackMutationFn = Apollo.MutationFunction<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>;

/**
 * __useDeleteFeedbackMutation__
 *
 * To run a mutation, you first call `useDeleteFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeedbackMutation, { data, loading, error }] = useDeleteFeedbackMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>(DeleteFeedbackDocument, options);
      }
export type DeleteFeedbackMutationHookResult = ReturnType<typeof useDeleteFeedbackMutation>;
export type DeleteFeedbackMutationResult = Apollo.MutationResult<DeleteFeedbackMutation>;
export type DeleteFeedbackMutationOptions = Apollo.BaseMutationOptions<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>;
export const DeleteOfferDocument = gql`
    mutation DeleteOffer($id: String!) {
  deleteOffer(id: $id)
}
    `;
export type DeleteOfferMutationFn = Apollo.MutationFunction<DeleteOfferMutation, DeleteOfferMutationVariables>;

/**
 * __useDeleteOfferMutation__
 *
 * To run a mutation, you first call `useDeleteOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOfferMutation, { data, loading, error }] = useDeleteOfferMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOfferMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOfferMutation, DeleteOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOfferMutation, DeleteOfferMutationVariables>(DeleteOfferDocument, options);
      }
export type DeleteOfferMutationHookResult = ReturnType<typeof useDeleteOfferMutation>;
export type DeleteOfferMutationResult = Apollo.MutationResult<DeleteOfferMutation>;
export type DeleteOfferMutationOptions = Apollo.BaseMutationOptions<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($data: StudentCoach!) {
  deleteStudent(data: $data)
}
    `;
export type DeleteStudentMutationFn = Apollo.MutationFunction<DeleteStudentMutation, DeleteStudentMutationVariables>;

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteStudentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, options);
      }
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>;
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>;
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const DeleteTrainingDocument = gql`
    mutation DeleteTraining($id: String!) {
  deleteTraining(id: $id)
}
    `;
export type DeleteTrainingMutationFn = Apollo.MutationFunction<DeleteTrainingMutation, DeleteTrainingMutationVariables>;

/**
 * __useDeleteTrainingMutation__
 *
 * To run a mutation, you first call `useDeleteTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTrainingMutation, { data, loading, error }] = useDeleteTrainingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTrainingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTrainingMutation, DeleteTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTrainingMutation, DeleteTrainingMutationVariables>(DeleteTrainingDocument, options);
      }
export type DeleteTrainingMutationHookResult = ReturnType<typeof useDeleteTrainingMutation>;
export type DeleteTrainingMutationResult = Apollo.MutationResult<DeleteTrainingMutation>;
export type DeleteTrainingMutationOptions = Apollo.BaseMutationOptions<DeleteTrainingMutation, DeleteTrainingMutationVariables>;
export const DeleteTrainingPlanDocument = gql`
    mutation DeleteTrainingPlan($id: String!) {
  deleteTrainingPlan(id: $id)
}
    `;
export type DeleteTrainingPlanMutationFn = Apollo.MutationFunction<DeleteTrainingPlanMutation, DeleteTrainingPlanMutationVariables>;

/**
 * __useDeleteTrainingPlanMutation__
 *
 * To run a mutation, you first call `useDeleteTrainingPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTrainingPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTrainingPlanMutation, { data, loading, error }] = useDeleteTrainingPlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTrainingPlanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTrainingPlanMutation, DeleteTrainingPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTrainingPlanMutation, DeleteTrainingPlanMutationVariables>(DeleteTrainingPlanDocument, options);
      }
export type DeleteTrainingPlanMutationHookResult = ReturnType<typeof useDeleteTrainingPlanMutation>;
export type DeleteTrainingPlanMutationResult = Apollo.MutationResult<DeleteTrainingPlanMutation>;
export type DeleteTrainingPlanMutationOptions = Apollo.BaseMutationOptions<DeleteTrainingPlanMutation, DeleteTrainingPlanMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: userLogin!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarkAsReadDocument = gql`
    mutation MarkAsRead($id: String!) {
  markAsRead(id: $id) {
    message
  }
}
    `;
export type MarkAsReadMutationFn = Apollo.MutationFunction<MarkAsReadMutation, MarkAsReadMutationVariables>;

/**
 * __useMarkAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsReadMutation, { data, loading, error }] = useMarkAsReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsReadMutation, MarkAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAsReadMutation, MarkAsReadMutationVariables>(MarkAsReadDocument, options);
      }
export type MarkAsReadMutationHookResult = ReturnType<typeof useMarkAsReadMutation>;
export type MarkAsReadMutationResult = Apollo.MutationResult<MarkAsReadMutation>;
export type MarkAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAsReadMutation, MarkAsReadMutationVariables>;
export const IsReadDocument = gql`
    mutation IsRead($ids: [String!]!) {
  isRead(id: $ids)
}
    `;
export type IsReadMutationFn = Apollo.MutationFunction<IsReadMutation, IsReadMutationVariables>;

/**
 * __useIsReadMutation__
 *
 * To run a mutation, you first call `useIsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isReadMutation, { data, loading, error }] = useIsReadMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useIsReadMutation(baseOptions?: Apollo.MutationHookOptions<IsReadMutation, IsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IsReadMutation, IsReadMutationVariables>(IsReadDocument, options);
      }
export type IsReadMutationHookResult = ReturnType<typeof useIsReadMutation>;
export type IsReadMutationResult = Apollo.MutationResult<IsReadMutation>;
export type IsReadMutationOptions = Apollo.BaseMutationOptions<IsReadMutation, IsReadMutationVariables>;
export const HasBeenseenDocument = gql`
    mutation hasBeenseen($ids: [String!]!) {
  hasBeenSeen(id: $ids)
}
    `;
export type HasBeenseenMutationFn = Apollo.MutationFunction<HasBeenseenMutation, HasBeenseenMutationVariables>;

/**
 * __useHasBeenseenMutation__
 *
 * To run a mutation, you first call `useHasBeenseenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHasBeenseenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hasBeenseenMutation, { data, loading, error }] = useHasBeenseenMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useHasBeenseenMutation(baseOptions?: Apollo.MutationHookOptions<HasBeenseenMutation, HasBeenseenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HasBeenseenMutation, HasBeenseenMutationVariables>(HasBeenseenDocument, options);
      }
export type HasBeenseenMutationHookResult = ReturnType<typeof useHasBeenseenMutation>;
export type HasBeenseenMutationResult = Apollo.MutationResult<HasBeenseenMutation>;
export type HasBeenseenMutationOptions = Apollo.BaseMutationOptions<HasBeenseenMutation, HasBeenseenMutationVariables>;
export const RejectRequestDocument = gql`
    mutation RejectRequest($id: String!) {
  rejectRequest(id: $id)
}
    `;
export type RejectRequestMutationFn = Apollo.MutationFunction<RejectRequestMutation, RejectRequestMutationVariables>;

/**
 * __useRejectRequestMutation__
 *
 * To run a mutation, you first call `useRejectRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectRequestMutation, { data, loading, error }] = useRejectRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectRequestMutation, RejectRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectRequestMutation, RejectRequestMutationVariables>(RejectRequestDocument, options);
      }
export type RejectRequestMutationHookResult = ReturnType<typeof useRejectRequestMutation>;
export type RejectRequestMutationResult = Apollo.MutationResult<RejectRequestMutation>;
export type RejectRequestMutationOptions = Apollo.BaseMutationOptions<RejectRequestMutation, RejectRequestMutationVariables>;
export const RenewMemberShipDocument = gql`
    mutation RenewMemberShip($id: String!) {
  renewMemberShip(id: $id)
}
    `;
export type RenewMemberShipMutationFn = Apollo.MutationFunction<RenewMemberShipMutation, RenewMemberShipMutationVariables>;

/**
 * __useRenewMemberShipMutation__
 *
 * To run a mutation, you first call `useRenewMemberShipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenewMemberShipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renewMemberShipMutation, { data, loading, error }] = useRenewMemberShipMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRenewMemberShipMutation(baseOptions?: Apollo.MutationHookOptions<RenewMemberShipMutation, RenewMemberShipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenewMemberShipMutation, RenewMemberShipMutationVariables>(RenewMemberShipDocument, options);
      }
export type RenewMemberShipMutationHookResult = ReturnType<typeof useRenewMemberShipMutation>;
export type RenewMemberShipMutationResult = Apollo.MutationResult<RenewMemberShipMutation>;
export type RenewMemberShipMutationOptions = Apollo.BaseMutationOptions<RenewMemberShipMutation, RenewMemberShipMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: UserInput!) {
  signUp(data: $data)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateCoachProfileDocument = gql`
    mutation UpdateCoachProfile($id: String!, $data: CoachProfileInput!) {
  updateCoachProfile(id: $id, data: $data)
}
    `;
export type UpdateCoachProfileMutationFn = Apollo.MutationFunction<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>;

/**
 * __useUpdateCoachProfileMutation__
 *
 * To run a mutation, you first call `useUpdateCoachProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCoachProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoachProfileMutation, { data, loading, error }] = useUpdateCoachProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCoachProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>(UpdateCoachProfileDocument, options);
      }
export type UpdateCoachProfileMutationHookResult = ReturnType<typeof useUpdateCoachProfileMutation>;
export type UpdateCoachProfileMutationResult = Apollo.MutationResult<UpdateCoachProfileMutation>;
export type UpdateCoachProfileMutationOptions = Apollo.BaseMutationOptions<UpdateCoachProfileMutation, UpdateCoachProfileMutationVariables>;
export const UpdateCrewDocument = gql`
    mutation UpdateCrew($name: String!, $studentIds: [String!]!, $crewId: String!) {
  updateCrew(name: $name, studentIds: $studentIds, id: $crewId)
}
    `;
export type UpdateCrewMutationFn = Apollo.MutationFunction<UpdateCrewMutation, UpdateCrewMutationVariables>;

/**
 * __useUpdateCrewMutation__
 *
 * To run a mutation, you first call `useUpdateCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCrewMutation, { data, loading, error }] = useUpdateCrewMutation({
 *   variables: {
 *      name: // value for 'name'
 *      studentIds: // value for 'studentIds'
 *      crewId: // value for 'crewId'
 *   },
 * });
 */
export function useUpdateCrewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCrewMutation, UpdateCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCrewMutation, UpdateCrewMutationVariables>(UpdateCrewDocument, options);
      }
export type UpdateCrewMutationHookResult = ReturnType<typeof useUpdateCrewMutation>;
export type UpdateCrewMutationResult = Apollo.MutationResult<UpdateCrewMutation>;
export type UpdateCrewMutationOptions = Apollo.BaseMutationOptions<UpdateCrewMutation, UpdateCrewMutationVariables>;
export const UpdateExerciceDocument = gql`
    mutation UpdateExercice($data: ExerciceData!, $id: String!) {
  updateExercice(data: $data, id: $id) {
    id
    title
    serie
    intensity
    rep
    weight
    type {
      id
      value
      label
    }
  }
}
    `;
export type UpdateExerciceMutationFn = Apollo.MutationFunction<UpdateExerciceMutation, UpdateExerciceMutationVariables>;

/**
 * __useUpdateExerciceMutation__
 *
 * To run a mutation, you first call `useUpdateExerciceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciceMutation, { data, loading, error }] = useUpdateExerciceMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateExerciceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciceMutation, UpdateExerciceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciceMutation, UpdateExerciceMutationVariables>(UpdateExerciceDocument, options);
      }
export type UpdateExerciceMutationHookResult = ReturnType<typeof useUpdateExerciceMutation>;
export type UpdateExerciceMutationResult = Apollo.MutationResult<UpdateExerciceMutation>;
export type UpdateExerciceMutationOptions = Apollo.BaseMutationOptions<UpdateExerciceMutation, UpdateExerciceMutationVariables>;
export const UpdateFeedbackDocument = gql`
    mutation UpdateFeedback($id: String!, $data: FeedbackWithoutTrainingId!) {
  updateFeedback(id: $id, data: $data)
}
    `;
export type UpdateFeedbackMutationFn = Apollo.MutationFunction<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>;

/**
 * __useUpdateFeedbackMutation__
 *
 * To run a mutation, you first call `useUpdateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedbackMutation, { data, loading, error }] = useUpdateFeedbackMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>(UpdateFeedbackDocument, options);
      }
export type UpdateFeedbackMutationHookResult = ReturnType<typeof useUpdateFeedbackMutation>;
export type UpdateFeedbackMutationResult = Apollo.MutationResult<UpdateFeedbackMutation>;
export type UpdateFeedbackMutationOptions = Apollo.BaseMutationOptions<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>;
export const UpdateOfferDocument = gql`
    mutation UpdateOffer($id: String!, $data: OfferInput!) {
  updateOffer(id: $id, data: $data)
}
    `;
export type UpdateOfferMutationFn = Apollo.MutationFunction<UpdateOfferMutation, UpdateOfferMutationVariables>;

/**
 * __useUpdateOfferMutation__
 *
 * To run a mutation, you first call `useUpdateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOfferMutation, { data, loading, error }] = useUpdateOfferMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOfferMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOfferMutation, UpdateOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOfferMutation, UpdateOfferMutationVariables>(UpdateOfferDocument, options);
      }
export type UpdateOfferMutationHookResult = ReturnType<typeof useUpdateOfferMutation>;
export type UpdateOfferMutationResult = Apollo.MutationResult<UpdateOfferMutation>;
export type UpdateOfferMutationOptions = Apollo.BaseMutationOptions<UpdateOfferMutation, UpdateOfferMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: UpdateProfile!) {
  updateProfile(data: $data) {
    id
    email
    firstname
    lastname
    roles
    avatar
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateProgramDocument = gql`
    mutation UpdateProgram($id: String!, $data: UpdateProgramInput!) {
  updateProgram(id: $id, data: $data)
}
    `;
export type UpdateProgramMutationFn = Apollo.MutationFunction<UpdateProgramMutation, UpdateProgramMutationVariables>;

/**
 * __useUpdateProgramMutation__
 *
 * To run a mutation, you first call `useUpdateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProgramMutation, { data, loading, error }] = useUpdateProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProgramMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProgramMutation, UpdateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProgramMutation, UpdateProgramMutationVariables>(UpdateProgramDocument, options);
      }
export type UpdateProgramMutationHookResult = ReturnType<typeof useUpdateProgramMutation>;
export type UpdateProgramMutationResult = Apollo.MutationResult<UpdateProgramMutation>;
export type UpdateProgramMutationOptions = Apollo.BaseMutationOptions<UpdateProgramMutation, UpdateProgramMutationVariables>;
export const UpdateTrainingDocument = gql`
    mutation UpdateTraining($data: UpdateTrainingData!) {
  updateTraining(data: $data)
}
    `;
export type UpdateTrainingMutationFn = Apollo.MutationFunction<UpdateTrainingMutation, UpdateTrainingMutationVariables>;

/**
 * __useUpdateTrainingMutation__
 *
 * To run a mutation, you first call `useUpdateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainingMutation, { data, loading, error }] = useUpdateTrainingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTrainingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrainingMutation, UpdateTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTrainingMutation, UpdateTrainingMutationVariables>(UpdateTrainingDocument, options);
      }
export type UpdateTrainingMutationHookResult = ReturnType<typeof useUpdateTrainingMutation>;
export type UpdateTrainingMutationResult = Apollo.MutationResult<UpdateTrainingMutation>;
export type UpdateTrainingMutationOptions = Apollo.BaseMutationOptions<UpdateTrainingMutation, UpdateTrainingMutationVariables>;
export const UpdateTrainingPlanDocument = gql`
    mutation UpdateTrainingPlan($title: String!, $id: String!, $notes: String) {
  updateTrainingPlan(title: $title, id: $id, notes: $notes)
}
    `;
export type UpdateTrainingPlanMutationFn = Apollo.MutationFunction<UpdateTrainingPlanMutation, UpdateTrainingPlanMutationVariables>;

/**
 * __useUpdateTrainingPlanMutation__
 *
 * To run a mutation, you first call `useUpdateTrainingPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainingPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainingPlanMutation, { data, loading, error }] = useUpdateTrainingPlanMutation({
 *   variables: {
 *      title: // value for 'title'
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useUpdateTrainingPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrainingPlanMutation, UpdateTrainingPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTrainingPlanMutation, UpdateTrainingPlanMutationVariables>(UpdateTrainingPlanDocument, options);
      }
export type UpdateTrainingPlanMutationHookResult = ReturnType<typeof useUpdateTrainingPlanMutation>;
export type UpdateTrainingPlanMutationResult = Apollo.MutationResult<UpdateTrainingPlanMutation>;
export type UpdateTrainingPlanMutationOptions = Apollo.BaseMutationOptions<UpdateTrainingPlanMutation, UpdateTrainingPlanMutationVariables>;
export const ValidateProgramDocument = gql`
    mutation ValidateProgram($id: String!) {
  publishProgram(id: $id)
}
    `;
export type ValidateProgramMutationFn = Apollo.MutationFunction<ValidateProgramMutation, ValidateProgramMutationVariables>;

/**
 * __useValidateProgramMutation__
 *
 * To run a mutation, you first call `useValidateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateProgramMutation, { data, loading, error }] = useValidateProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useValidateProgramMutation(baseOptions?: Apollo.MutationHookOptions<ValidateProgramMutation, ValidateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateProgramMutation, ValidateProgramMutationVariables>(ValidateProgramDocument, options);
      }
export type ValidateProgramMutationHookResult = ReturnType<typeof useValidateProgramMutation>;
export type ValidateProgramMutationResult = Apollo.MutationResult<ValidateProgramMutation>;
export type ValidateProgramMutationOptions = Apollo.BaseMutationOptions<ValidateProgramMutation, ValidateProgramMutationVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    id
    label
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetAllExercicesModelDocument = gql`
    query GetAllExercicesModel($data: ExerciceModelInput) {
  getAllExercicesModel(data: $data) {
    id
    title
    serie
    rep
    intensity
    weight
    notes
    image
    type {
      id
      value
      label
    }
  }
}
    `;

/**
 * __useGetAllExercicesModelQuery__
 *
 * To run a query within a React component, call `useGetAllExercicesModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExercicesModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExercicesModelQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAllExercicesModelQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>(GetAllExercicesModelDocument, options);
      }
export function useGetAllExercicesModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>(GetAllExercicesModelDocument, options);
        }
export function useGetAllExercicesModelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>(GetAllExercicesModelDocument, options);
        }
export type GetAllExercicesModelQueryHookResult = ReturnType<typeof useGetAllExercicesModelQuery>;
export type GetAllExercicesModelLazyQueryHookResult = ReturnType<typeof useGetAllExercicesModelLazyQuery>;
export type GetAllExercicesModelSuspenseQueryHookResult = ReturnType<typeof useGetAllExercicesModelSuspenseQuery>;
export type GetAllExercicesModelQueryResult = Apollo.QueryResult<GetAllExercicesModelQuery, GetAllExercicesModelQueryVariables>;
export const GetChatUsersDocument = gql`
    query GetChatUsers {
  getChatUsers {
    firstname
    id
    email
    lastname
    avatar
    roles
  }
}
    `;

/**
 * __useGetChatUsersQuery__
 *
 * To run a query within a React component, call `useGetChatUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetChatUsersQuery, GetChatUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatUsersQuery, GetChatUsersQueryVariables>(GetChatUsersDocument, options);
      }
export function useGetChatUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatUsersQuery, GetChatUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatUsersQuery, GetChatUsersQueryVariables>(GetChatUsersDocument, options);
        }
export function useGetChatUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatUsersQuery, GetChatUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatUsersQuery, GetChatUsersQueryVariables>(GetChatUsersDocument, options);
        }
export type GetChatUsersQueryHookResult = ReturnType<typeof useGetChatUsersQuery>;
export type GetChatUsersLazyQueryHookResult = ReturnType<typeof useGetChatUsersLazyQuery>;
export type GetChatUsersSuspenseQueryHookResult = ReturnType<typeof useGetChatUsersSuspenseQuery>;
export type GetChatUsersQueryResult = Apollo.QueryResult<GetChatUsersQuery, GetChatUsersQueryVariables>;
export const GetCoachDocument = gql`
    query GetCoach($id: String!) {
  getUserById(id: $id) {
    coach {
      id
      email
      firstname
      lastname
      roles
      avatar
    }
  }
}
    `;

/**
 * __useGetCoachQuery__
 *
 * To run a query within a React component, call `useGetCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoachQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCoachQuery(baseOptions: Apollo.QueryHookOptions<GetCoachQuery, GetCoachQueryVariables> & ({ variables: GetCoachQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoachQuery, GetCoachQueryVariables>(GetCoachDocument, options);
      }
export function useGetCoachLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoachQuery, GetCoachQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoachQuery, GetCoachQueryVariables>(GetCoachDocument, options);
        }
export function useGetCoachSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoachQuery, GetCoachQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoachQuery, GetCoachQueryVariables>(GetCoachDocument, options);
        }
export type GetCoachQueryHookResult = ReturnType<typeof useGetCoachQuery>;
export type GetCoachLazyQueryHookResult = ReturnType<typeof useGetCoachLazyQuery>;
export type GetCoachSuspenseQueryHookResult = ReturnType<typeof useGetCoachSuspenseQuery>;
export type GetCoachQueryResult = Apollo.QueryResult<GetCoachQuery, GetCoachQueryVariables>;
export const GetCoachCrewsDocument = gql`
    query GetCoachCrews {
  getCoachCrews {
    id
    name
    students {
      id
      email
      firstname
      lastname
      roles
      avatar
    }
  }
}
    `;

/**
 * __useGetCoachCrewsQuery__
 *
 * To run a query within a React component, call `useGetCoachCrewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoachCrewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoachCrewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoachCrewsQuery(baseOptions?: Apollo.QueryHookOptions<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>(GetCoachCrewsDocument, options);
      }
export function useGetCoachCrewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>(GetCoachCrewsDocument, options);
        }
export function useGetCoachCrewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>(GetCoachCrewsDocument, options);
        }
export type GetCoachCrewsQueryHookResult = ReturnType<typeof useGetCoachCrewsQuery>;
export type GetCoachCrewsLazyQueryHookResult = ReturnType<typeof useGetCoachCrewsLazyQuery>;
export type GetCoachCrewsSuspenseQueryHookResult = ReturnType<typeof useGetCoachCrewsSuspenseQuery>;
export type GetCoachCrewsQueryResult = Apollo.QueryResult<GetCoachCrewsQuery, GetCoachCrewsQueryVariables>;
export const GetOneCoachOffersDocument = gql`
    query GetOneCoachOffers($id: String!) {
  getOneCoachOffers(id: $id) {
    id
    name
    price
    description
    availability
    durability
    category {
      label
      id
    }
  }
}
    `;

/**
 * __useGetOneCoachOffersQuery__
 *
 * To run a query within a React component, call `useGetOneCoachOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCoachOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCoachOffersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCoachOffersQuery(baseOptions: Apollo.QueryHookOptions<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables> & ({ variables: GetOneCoachOffersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>(GetOneCoachOffersDocument, options);
      }
export function useGetOneCoachOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>(GetOneCoachOffersDocument, options);
        }
export function useGetOneCoachOffersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>(GetOneCoachOffersDocument, options);
        }
export type GetOneCoachOffersQueryHookResult = ReturnType<typeof useGetOneCoachOffersQuery>;
export type GetOneCoachOffersLazyQueryHookResult = ReturnType<typeof useGetOneCoachOffersLazyQuery>;
export type GetOneCoachOffersSuspenseQueryHookResult = ReturnType<typeof useGetOneCoachOffersSuspenseQuery>;
export type GetOneCoachOffersQueryResult = Apollo.QueryResult<GetOneCoachOffersQuery, GetOneCoachOffersQueryVariables>;
export const GetOneCoachProfileDocument = gql`
    query GetOneCoachProfile($id: String!) {
  getOneCoachProfile(id: $id) {
    id
    name
    description
    specialisation
    facebook
    instagram
    linkedin
    user {
      firstname
      lastname
    }
  }
}
    `;

/**
 * __useGetOneCoachProfileQuery__
 *
 * To run a query within a React component, call `useGetOneCoachProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCoachProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCoachProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCoachProfileQuery(baseOptions: Apollo.QueryHookOptions<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables> & ({ variables: GetOneCoachProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>(GetOneCoachProfileDocument, options);
      }
export function useGetOneCoachProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>(GetOneCoachProfileDocument, options);
        }
export function useGetOneCoachProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>(GetOneCoachProfileDocument, options);
        }
export type GetOneCoachProfileQueryHookResult = ReturnType<typeof useGetOneCoachProfileQuery>;
export type GetOneCoachProfileLazyQueryHookResult = ReturnType<typeof useGetOneCoachProfileLazyQuery>;
export type GetOneCoachProfileSuspenseQueryHookResult = ReturnType<typeof useGetOneCoachProfileSuspenseQuery>;
export type GetOneCoachProfileQueryResult = Apollo.QueryResult<GetOneCoachProfileQuery, GetOneCoachProfileQueryVariables>;
export const GetConversationByIdDocument = gql`
    query GetConversationById($id: String!) {
  getConversationById(id: $id) {
    id
    messages {
      id
      content
      createdAt
      sender {
        id
      }
      receiver {
        id
      }
    }
  }
}
    `;

/**
 * __useGetConversationByIdQuery__
 *
 * To run a query within a React component, call `useGetConversationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConversationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables> & ({ variables: GetConversationByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
      }
export function useGetConversationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
        }
export function useGetConversationByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
        }
export type GetConversationByIdQueryHookResult = ReturnType<typeof useGetConversationByIdQuery>;
export type GetConversationByIdLazyQueryHookResult = ReturnType<typeof useGetConversationByIdLazyQuery>;
export type GetConversationByIdSuspenseQueryHookResult = ReturnType<typeof useGetConversationByIdSuspenseQuery>;
export type GetConversationByIdQueryResult = Apollo.QueryResult<GetConversationByIdQuery, GetConversationByIdQueryVariables>;
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    id
    participants {
      id
      firstname
      lastname
      avatar
    }
    messages {
      content
      createdAt
      readAt
      sender {
        id
      }
    }
  }
}
    `;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
      }
export function useGetConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export function useGetConversationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsSuspenseQueryHookResult = ReturnType<typeof useGetConversationsSuspenseQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<GetConversationsQuery, GetConversationsQueryVariables>;
export const GetCrewTrainingDocument = gql`
    query GetCrewTraining($id: String!, $rangeDate: RangeDate!) {
  getCrewTraining(id: $id, rangeDate: $rangeDate) {
    id
    title
    date
    notes
    createdByCoach
    editable
    validate
    color
    exercices {
      title
      id
      serie
      rep
      intensity
      weight
      notes
      type {
        id
        value
        label
      }
    }
  }
}
    `;

/**
 * __useGetCrewTrainingQuery__
 *
 * To run a query within a React component, call `useGetCrewTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCrewTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCrewTrainingQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rangeDate: // value for 'rangeDate'
 *   },
 * });
 */
export function useGetCrewTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetCrewTrainingQuery, GetCrewTrainingQueryVariables> & ({ variables: GetCrewTrainingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>(GetCrewTrainingDocument, options);
      }
export function useGetCrewTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>(GetCrewTrainingDocument, options);
        }
export function useGetCrewTrainingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>(GetCrewTrainingDocument, options);
        }
export type GetCrewTrainingQueryHookResult = ReturnType<typeof useGetCrewTrainingQuery>;
export type GetCrewTrainingLazyQueryHookResult = ReturnType<typeof useGetCrewTrainingLazyQuery>;
export type GetCrewTrainingSuspenseQueryHookResult = ReturnType<typeof useGetCrewTrainingSuspenseQuery>;
export type GetCrewTrainingQueryResult = Apollo.QueryResult<GetCrewTrainingQuery, GetCrewTrainingQueryVariables>;
export const GetDayNumberTrainingDocument = gql`
    query GetDayNumberTraining($programId: String!) {
  getDayNumberTraining(id: $programId)
}
    `;

/**
 * __useGetDayNumberTrainingQuery__
 *
 * To run a query within a React component, call `useGetDayNumberTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDayNumberTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDayNumberTrainingQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useGetDayNumberTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables> & ({ variables: GetDayNumberTrainingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>(GetDayNumberTrainingDocument, options);
      }
export function useGetDayNumberTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>(GetDayNumberTrainingDocument, options);
        }
export function useGetDayNumberTrainingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>(GetDayNumberTrainingDocument, options);
        }
export type GetDayNumberTrainingQueryHookResult = ReturnType<typeof useGetDayNumberTrainingQuery>;
export type GetDayNumberTrainingLazyQueryHookResult = ReturnType<typeof useGetDayNumberTrainingLazyQuery>;
export type GetDayNumberTrainingSuspenseQueryHookResult = ReturnType<typeof useGetDayNumberTrainingSuspenseQuery>;
export type GetDayNumberTrainingQueryResult = Apollo.QueryResult<GetDayNumberTrainingQuery, GetDayNumberTrainingQueryVariables>;
export const GetExerciceTypesDocument = gql`
    query GetExerciceTypes {
  getExerciceTypes {
    id
    value
    label
  }
}
    `;

/**
 * __useGetExerciceTypesQuery__
 *
 * To run a query within a React component, call `useGetExerciceTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciceTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciceTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExerciceTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>(GetExerciceTypesDocument, options);
      }
export function useGetExerciceTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>(GetExerciceTypesDocument, options);
        }
export function useGetExerciceTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>(GetExerciceTypesDocument, options);
        }
export type GetExerciceTypesQueryHookResult = ReturnType<typeof useGetExerciceTypesQuery>;
export type GetExerciceTypesLazyQueryHookResult = ReturnType<typeof useGetExerciceTypesLazyQuery>;
export type GetExerciceTypesSuspenseQueryHookResult = ReturnType<typeof useGetExerciceTypesSuspenseQuery>;
export type GetExerciceTypesQueryResult = Apollo.QueryResult<GetExerciceTypesQuery, GetExerciceTypesQueryVariables>;
export const GetExercicesDocument = gql`
    query GetExercices($id: String!) {
  getExercices(id: $id) {
    id
    title
    serie
    rep
    intensity
    weight
    notes
    type {
      id
      value
      label
    }
  }
}
    `;

/**
 * __useGetExercicesQuery__
 *
 * To run a query within a React component, call `useGetExercicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExercicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExercicesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExercicesQuery(baseOptions: Apollo.QueryHookOptions<GetExercicesQuery, GetExercicesQueryVariables> & ({ variables: GetExercicesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExercicesQuery, GetExercicesQueryVariables>(GetExercicesDocument, options);
      }
export function useGetExercicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExercicesQuery, GetExercicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExercicesQuery, GetExercicesQueryVariables>(GetExercicesDocument, options);
        }
export function useGetExercicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExercicesQuery, GetExercicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExercicesQuery, GetExercicesQueryVariables>(GetExercicesDocument, options);
        }
export type GetExercicesQueryHookResult = ReturnType<typeof useGetExercicesQuery>;
export type GetExercicesLazyQueryHookResult = ReturnType<typeof useGetExercicesLazyQuery>;
export type GetExercicesSuspenseQueryHookResult = ReturnType<typeof useGetExercicesSuspenseQuery>;
export type GetExercicesQueryResult = Apollo.QueryResult<GetExercicesQuery, GetExercicesQueryVariables>;
export const GetFeedbacksDocument = gql`
    query GetFeedbacks($id: String!, $rangeDate: RangeDate!) {
  getFeedbacks(id: $id, rangeDate: $rangeDate) {
    id
    intensity
    feeling
    comment
    title
    date
  }
}
    `;

/**
 * __useGetFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbacksQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rangeDate: // value for 'rangeDate'
 *   },
 * });
 */
export function useGetFeedbacksQuery(baseOptions: Apollo.QueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables> & ({ variables: GetFeedbacksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(GetFeedbacksDocument, options);
      }
export function useGetFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(GetFeedbacksDocument, options);
        }
export function useGetFeedbacksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(GetFeedbacksDocument, options);
        }
export type GetFeedbacksQueryHookResult = ReturnType<typeof useGetFeedbacksQuery>;
export type GetFeedbacksLazyQueryHookResult = ReturnType<typeof useGetFeedbacksLazyQuery>;
export type GetFeedbacksSuspenseQueryHookResult = ReturnType<typeof useGetFeedbacksSuspenseQuery>;
export type GetFeedbacksQueryResult = Apollo.QueryResult<GetFeedbacksQuery, GetFeedbacksQueryVariables>;
export const GetListUsersCrewDocument = gql`
    query GetListUsersCrew($input: String) {
  getListUsersCrew(input: $input) {
    id
    email
    firstname
    lastname
    roles
    avatar
  }
}
    `;

/**
 * __useGetListUsersCrewQuery__
 *
 * To run a query within a React component, call `useGetListUsersCrewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListUsersCrewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListUsersCrewQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetListUsersCrewQuery(baseOptions?: Apollo.QueryHookOptions<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>(GetListUsersCrewDocument, options);
      }
export function useGetListUsersCrewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>(GetListUsersCrewDocument, options);
        }
export function useGetListUsersCrewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>(GetListUsersCrewDocument, options);
        }
export type GetListUsersCrewQueryHookResult = ReturnType<typeof useGetListUsersCrewQuery>;
export type GetListUsersCrewLazyQueryHookResult = ReturnType<typeof useGetListUsersCrewLazyQuery>;
export type GetListUsersCrewSuspenseQueryHookResult = ReturnType<typeof useGetListUsersCrewSuspenseQuery>;
export type GetListUsersCrewQueryResult = Apollo.QueryResult<GetListUsersCrewQuery, GetListUsersCrewQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($id: String!, $limit: Float, $cursor: String) {
  getMessages(id: $id, limit: $limit, cursor: $cursor) {
    totalCount
    messages {
      id
      content
      createdAt
      readAt
      repliedMessage {
        id
        content
      }
      sender {
        id
      }
      receiver {
        id
      }
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables> & ({ variables: GetMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesSuspenseQueryHookResult = ReturnType<typeof useGetMessagesSuspenseQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetMyOffersDocument = gql`
    query GetMyOffers {
  getCoachOffers {
    id
    name
    price
    description
    availability
    durability
    category {
      label
      id
    }
    crew {
      id
      name
    }
  }
}
    `;

/**
 * __useGetMyOffersQuery__
 *
 * To run a query within a React component, call `useGetMyOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOffersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOffersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOffersQuery, GetMyOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOffersQuery, GetMyOffersQueryVariables>(GetMyOffersDocument, options);
      }
export function useGetMyOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOffersQuery, GetMyOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOffersQuery, GetMyOffersQueryVariables>(GetMyOffersDocument, options);
        }
export function useGetMyOffersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyOffersQuery, GetMyOffersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOffersQuery, GetMyOffersQueryVariables>(GetMyOffersDocument, options);
        }
export type GetMyOffersQueryHookResult = ReturnType<typeof useGetMyOffersQuery>;
export type GetMyOffersLazyQueryHookResult = ReturnType<typeof useGetMyOffersLazyQuery>;
export type GetMyOffersSuspenseQueryHookResult = ReturnType<typeof useGetMyOffersSuspenseQuery>;
export type GetMyOffersQueryResult = Apollo.QueryResult<GetMyOffersQuery, GetMyOffersQueryVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  getCoachProfile {
    id
    name
    description
    specialisation
    instagram
    linkedin
    facebook
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export function useGetMyProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileSuspenseQueryHookResult = ReturnType<typeof useGetMyProfileSuspenseQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const GetMyProgramsDocument = gql`
    query GetMyPrograms($status: String) {
  getPrograms(status: $status) {
    id
    title
    description
    status
    duration
    public
    price
    level
  }
}
    `;

/**
 * __useGetMyProgramsQuery__
 *
 * To run a query within a React component, call `useGetMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProgramsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetMyProgramsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProgramsQuery, GetMyProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProgramsQuery, GetMyProgramsQueryVariables>(GetMyProgramsDocument, options);
      }
export function useGetMyProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProgramsQuery, GetMyProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProgramsQuery, GetMyProgramsQueryVariables>(GetMyProgramsDocument, options);
        }
export function useGetMyProgramsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyProgramsQuery, GetMyProgramsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyProgramsQuery, GetMyProgramsQueryVariables>(GetMyProgramsDocument, options);
        }
export type GetMyProgramsQueryHookResult = ReturnType<typeof useGetMyProgramsQuery>;
export type GetMyProgramsLazyQueryHookResult = ReturnType<typeof useGetMyProgramsLazyQuery>;
export type GetMyProgramsSuspenseQueryHookResult = ReturnType<typeof useGetMyProgramsSuspenseQuery>;
export type GetMyProgramsQueryResult = Apollo.QueryResult<GetMyProgramsQuery, GetMyProgramsQueryVariables>;
export const GetMyTrainingDocument = gql`
    query GetMyTraining($id: String!, $rangeDate: RangeDate!) {
  getTrainingsById(id: $id, rangeDate: $rangeDate) {
    createdByCoach
    id
    title
    date
    notes
    editable
    validate
    color
    crew {
      id
    }
    exercices {
      title
      id
      serie
      rep
      intensity
      weight
      notes
      type {
        id
        value
        label
      }
    }
  }
}
    `;

/**
 * __useGetMyTrainingQuery__
 *
 * To run a query within a React component, call `useGetMyTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTrainingQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rangeDate: // value for 'rangeDate'
 *   },
 * });
 */
export function useGetMyTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetMyTrainingQuery, GetMyTrainingQueryVariables> & ({ variables: GetMyTrainingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTrainingQuery, GetMyTrainingQueryVariables>(GetMyTrainingDocument, options);
      }
export function useGetMyTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTrainingQuery, GetMyTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTrainingQuery, GetMyTrainingQueryVariables>(GetMyTrainingDocument, options);
        }
export function useGetMyTrainingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyTrainingQuery, GetMyTrainingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTrainingQuery, GetMyTrainingQueryVariables>(GetMyTrainingDocument, options);
        }
export type GetMyTrainingQueryHookResult = ReturnType<typeof useGetMyTrainingQuery>;
export type GetMyTrainingLazyQueryHookResult = ReturnType<typeof useGetMyTrainingLazyQuery>;
export type GetMyTrainingSuspenseQueryHookResult = ReturnType<typeof useGetMyTrainingSuspenseQuery>;
export type GetMyTrainingQueryResult = Apollo.QueryResult<GetMyTrainingQuery, GetMyTrainingQueryVariables>;
export const GetNotificationDocument = gql`
    query GetNotification {
  getNotification {
    id
    type
    isRead
    hasBeenSeen
    createdAt
    request {
      sender {
        firstname
        lastname
        roles
        avatar
      }
      receiver {
        firstname
        lastname
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetNotificationQuery__
 *
 * To run a query within a React component, call `useGetNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, options);
      }
export function useGetNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, options);
        }
export function useGetNotificationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, options);
        }
export type GetNotificationQueryHookResult = ReturnType<typeof useGetNotificationQuery>;
export type GetNotificationLazyQueryHookResult = ReturnType<typeof useGetNotificationLazyQuery>;
export type GetNotificationSuspenseQueryHookResult = ReturnType<typeof useGetNotificationSuspenseQuery>;
export type GetNotificationQueryResult = Apollo.QueryResult<GetNotificationQuery, GetNotificationQueryVariables>;
export const GetOneTrainingDocument = gql`
    query GetOneTraining($id: String!) {
  getOneTraining(id: $id) {
    id
    title
    date
    notes
    createdByCoach
    editable
    validate
  }
}
    `;

/**
 * __useGetOneTrainingQuery__
 *
 * To run a query within a React component, call `useGetOneTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneTrainingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetOneTrainingQuery, GetOneTrainingQueryVariables> & ({ variables: GetOneTrainingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneTrainingQuery, GetOneTrainingQueryVariables>(GetOneTrainingDocument, options);
      }
export function useGetOneTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneTrainingQuery, GetOneTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneTrainingQuery, GetOneTrainingQueryVariables>(GetOneTrainingDocument, options);
        }
export function useGetOneTrainingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneTrainingQuery, GetOneTrainingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneTrainingQuery, GetOneTrainingQueryVariables>(GetOneTrainingDocument, options);
        }
export type GetOneTrainingQueryHookResult = ReturnType<typeof useGetOneTrainingQuery>;
export type GetOneTrainingLazyQueryHookResult = ReturnType<typeof useGetOneTrainingLazyQuery>;
export type GetOneTrainingSuspenseQueryHookResult = ReturnType<typeof useGetOneTrainingSuspenseQuery>;
export type GetOneTrainingQueryResult = Apollo.QueryResult<GetOneTrainingQuery, GetOneTrainingQueryVariables>;
export const GetRequestDocument = gql`
    query GetRequest($id: String!) {
  getRequest(id: $id) {
    id
    description
    phone
    offer {
      name
      id
    }
    sender {
      id
      email
      firstname
      lastname
      roles
      avatar
    }
  }
}
    `;

/**
 * __useGetRequestQuery__
 *
 * To run a query within a React component, call `useGetRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRequestQuery(baseOptions: Apollo.QueryHookOptions<GetRequestQuery, GetRequestQueryVariables> & ({ variables: GetRequestQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, options);
      }
export function useGetRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, options);
        }
export function useGetRequestSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, options);
        }
export type GetRequestQueryHookResult = ReturnType<typeof useGetRequestQuery>;
export type GetRequestLazyQueryHookResult = ReturnType<typeof useGetRequestLazyQuery>;
export type GetRequestSuspenseQueryHookResult = ReturnType<typeof useGetRequestSuspenseQuery>;
export type GetRequestQueryResult = Apollo.QueryResult<GetRequestQuery, GetRequestQueryVariables>;
export const GetSentDocument = gql`
    query GetSent($id: String!) {
  getSent(id: $id) {
    receiver {
      email
      id
      firstname
      lastname
      roles
      avatar
    }
  }
}
    `;

/**
 * __useGetSentQuery__
 *
 * To run a query within a React component, call `useGetSentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSentQuery(baseOptions: Apollo.QueryHookOptions<GetSentQuery, GetSentQueryVariables> & ({ variables: GetSentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSentQuery, GetSentQueryVariables>(GetSentDocument, options);
      }
export function useGetSentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSentQuery, GetSentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSentQuery, GetSentQueryVariables>(GetSentDocument, options);
        }
export function useGetSentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSentQuery, GetSentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSentQuery, GetSentQueryVariables>(GetSentDocument, options);
        }
export type GetSentQueryHookResult = ReturnType<typeof useGetSentQuery>;
export type GetSentLazyQueryHookResult = ReturnType<typeof useGetSentLazyQuery>;
export type GetSentSuspenseQueryHookResult = ReturnType<typeof useGetSentSuspenseQuery>;
export type GetSentQueryResult = Apollo.QueryResult<GetSentQuery, GetSentQueryVariables>;
export const GetStudentFeedbackDocument = gql`
    query GetStudentFeedback($id: String!, $rangeDate: RangeDate!) {
  getStudentFeedback(id: $id, rangeDate: $rangeDate) {
    id
    title
    intensity
    feeling
    date
    comment
  }
}
    `;

/**
 * __useGetStudentFeedbackQuery__
 *
 * To run a query within a React component, call `useGetStudentFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentFeedbackQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rangeDate: // value for 'rangeDate'
 *   },
 * });
 */
export function useGetStudentFeedbackQuery(baseOptions: Apollo.QueryHookOptions<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables> & ({ variables: GetStudentFeedbackQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>(GetStudentFeedbackDocument, options);
      }
export function useGetStudentFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>(GetStudentFeedbackDocument, options);
        }
export function useGetStudentFeedbackSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>(GetStudentFeedbackDocument, options);
        }
export type GetStudentFeedbackQueryHookResult = ReturnType<typeof useGetStudentFeedbackQuery>;
export type GetStudentFeedbackLazyQueryHookResult = ReturnType<typeof useGetStudentFeedbackLazyQuery>;
export type GetStudentFeedbackSuspenseQueryHookResult = ReturnType<typeof useGetStudentFeedbackSuspenseQuery>;
export type GetStudentFeedbackQueryResult = Apollo.QueryResult<GetStudentFeedbackQuery, GetStudentFeedbackQueryVariables>;
export const GetStudentTrainingsDocument = gql`
    query getStudentTrainings($id: String!, $rangeDate: RangeDate!) {
  getStudentTrainings(id: $id, rangeDate: $rangeDate) {
    id
    title
    date
    notes
    createdByCoach
    editable
    validate
    color
    exercices {
      title
      id
      serie
      rep
      intensity
      weight
      notes
      type {
        id
        value
        label
      }
    }
  }
}
    `;

/**
 * __useGetStudentTrainingsQuery__
 *
 * To run a query within a React component, call `useGetStudentTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentTrainingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rangeDate: // value for 'rangeDate'
 *   },
 * });
 */
export function useGetStudentTrainingsQuery(baseOptions: Apollo.QueryHookOptions<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables> & ({ variables: GetStudentTrainingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>(GetStudentTrainingsDocument, options);
      }
export function useGetStudentTrainingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>(GetStudentTrainingsDocument, options);
        }
export function useGetStudentTrainingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>(GetStudentTrainingsDocument, options);
        }
export type GetStudentTrainingsQueryHookResult = ReturnType<typeof useGetStudentTrainingsQuery>;
export type GetStudentTrainingsLazyQueryHookResult = ReturnType<typeof useGetStudentTrainingsLazyQuery>;
export type GetStudentTrainingsSuspenseQueryHookResult = ReturnType<typeof useGetStudentTrainingsSuspenseQuery>;
export type GetStudentTrainingsQueryResult = Apollo.QueryResult<GetStudentTrainingsQuery, GetStudentTrainingsQueryVariables>;
export const GetStudentsDocument = gql`
    query getStudents($input: String, $id: String!, $crewId: String, $offerId: String, $sortRemaining: Boolean, $page: Float, $limit: Float) {
  getStudents(
    input: $input
    id: $id
    crewId: $crewId
    offerId: $offerId
    sortRemaining: $sortRemaining
    page: $page
    limit: $limit
  ) {
    totalCount
    students {
      email
      firstname
      lastname
      roles
      id
      avatar
      studentOffer {
        name
        durability
        id
      }
      crew {
        id
        name
      }
      memberships {
        id
        endDate
        isActive
      }
    }
  }
}
    `;

/**
 * __useGetStudentsQuery__
 *
 * To run a query within a React component, call `useGetStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *      crewId: // value for 'crewId'
 *      offerId: // value for 'offerId'
 *      sortRemaining: // value for 'sortRemaining'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetStudentsQuery(baseOptions: Apollo.QueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables> & ({ variables: GetStudentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
      }
export function useGetStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
        }
export function useGetStudentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
        }
export type GetStudentsQueryHookResult = ReturnType<typeof useGetStudentsQuery>;
export type GetStudentsLazyQueryHookResult = ReturnType<typeof useGetStudentsLazyQuery>;
export type GetStudentsSuspenseQueryHookResult = ReturnType<typeof useGetStudentsSuspenseQuery>;
export type GetStudentsQueryResult = Apollo.QueryResult<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetTotalStudentsDocument = gql`
    query GetTotalStudents {
  getTotalStudents
}
    `;

/**
 * __useGetTotalStudentsQuery__
 *
 * To run a query within a React component, call `useGetTotalStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalStudentsQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>(GetTotalStudentsDocument, options);
      }
export function useGetTotalStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>(GetTotalStudentsDocument, options);
        }
export function useGetTotalStudentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>(GetTotalStudentsDocument, options);
        }
export type GetTotalStudentsQueryHookResult = ReturnType<typeof useGetTotalStudentsQuery>;
export type GetTotalStudentsLazyQueryHookResult = ReturnType<typeof useGetTotalStudentsLazyQuery>;
export type GetTotalStudentsSuspenseQueryHookResult = ReturnType<typeof useGetTotalStudentsSuspenseQuery>;
export type GetTotalStudentsQueryResult = Apollo.QueryResult<GetTotalStudentsQuery, GetTotalStudentsQueryVariables>;
export const GetTotalUnreadMessageDocument = gql`
    query GetTotalUnreadMessage {
  getTotalUnreadMessage
}
    `;

/**
 * __useGetTotalUnreadMessageQuery__
 *
 * To run a query within a React component, call `useGetTotalUnreadMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalUnreadMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalUnreadMessageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalUnreadMessageQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>(GetTotalUnreadMessageDocument, options);
      }
export function useGetTotalUnreadMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>(GetTotalUnreadMessageDocument, options);
        }
export function useGetTotalUnreadMessageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>(GetTotalUnreadMessageDocument, options);
        }
export type GetTotalUnreadMessageQueryHookResult = ReturnType<typeof useGetTotalUnreadMessageQuery>;
export type GetTotalUnreadMessageLazyQueryHookResult = ReturnType<typeof useGetTotalUnreadMessageLazyQuery>;
export type GetTotalUnreadMessageSuspenseQueryHookResult = ReturnType<typeof useGetTotalUnreadMessageSuspenseQuery>;
export type GetTotalUnreadMessageQueryResult = Apollo.QueryResult<GetTotalUnreadMessageQuery, GetTotalUnreadMessageQueryVariables>;
export const GetTrainingPlanDocument = gql`
    query GetTrainingPlan($data: getTrainingType!) {
  getTrainingPlan(data: $data) {
    id
    title
    dayNumber
    notes
    exercices {
      id
      title
      serie
      rep
      intensity
      weight
      notes
      image
      position
    }
  }
}
    `;

/**
 * __useGetTrainingPlanQuery__
 *
 * To run a query within a React component, call `useGetTrainingPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrainingPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrainingPlanQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetTrainingPlanQuery(baseOptions: Apollo.QueryHookOptions<GetTrainingPlanQuery, GetTrainingPlanQueryVariables> & ({ variables: GetTrainingPlanQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>(GetTrainingPlanDocument, options);
      }
export function useGetTrainingPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>(GetTrainingPlanDocument, options);
        }
export function useGetTrainingPlanSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>(GetTrainingPlanDocument, options);
        }
export type GetTrainingPlanQueryHookResult = ReturnType<typeof useGetTrainingPlanQuery>;
export type GetTrainingPlanLazyQueryHookResult = ReturnType<typeof useGetTrainingPlanLazyQuery>;
export type GetTrainingPlanSuspenseQueryHookResult = ReturnType<typeof useGetTrainingPlanSuspenseQuery>;
export type GetTrainingPlanQueryResult = Apollo.QueryResult<GetTrainingPlanQuery, GetTrainingPlanQueryVariables>;
export const SelectCoachDocument = gql`
    query SelectCoach($id: String!, $price: [Float!], $input: String, $categorie: String) {
  selectCoach(id: $id, price: $price, input: $input, categorie: $categorie) {
    id
    email
    firstname
    lastname
    roles
    avatar
    coachProfile {
      id
      name
      specialisation
    }
    offers {
      id
      price
      name
      description
      availability
      durability
      category {
        id
        label
      }
    }
  }
}
    `;

/**
 * __useSelectCoachQuery__
 *
 * To run a query within a React component, call `useSelectCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectCoachQuery({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      input: // value for 'input'
 *      categorie: // value for 'categorie'
 *   },
 * });
 */
export function useSelectCoachQuery(baseOptions: Apollo.QueryHookOptions<SelectCoachQuery, SelectCoachQueryVariables> & ({ variables: SelectCoachQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectCoachQuery, SelectCoachQueryVariables>(SelectCoachDocument, options);
      }
export function useSelectCoachLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectCoachQuery, SelectCoachQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectCoachQuery, SelectCoachQueryVariables>(SelectCoachDocument, options);
        }
export function useSelectCoachSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SelectCoachQuery, SelectCoachQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectCoachQuery, SelectCoachQueryVariables>(SelectCoachDocument, options);
        }
export type SelectCoachQueryHookResult = ReturnType<typeof useSelectCoachQuery>;
export type SelectCoachLazyQueryHookResult = ReturnType<typeof useSelectCoachLazyQuery>;
export type SelectCoachSuspenseQueryHookResult = ReturnType<typeof useSelectCoachSuspenseQuery>;
export type SelectCoachQueryResult = Apollo.QueryResult<SelectCoachQuery, SelectCoachQueryVariables>;
export const SelectUsersDocument = gql`
    query SelectUsers($id: String!, $input: String) {
  selectUsers(id: $id, input: $input) {
    id
    email
    firstname
    lastname
    roles
    avatar
  }
}
    `;

/**
 * __useSelectUsersQuery__
 *
 * To run a query within a React component, call `useSelectUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSelectUsersQuery(baseOptions: Apollo.QueryHookOptions<SelectUsersQuery, SelectUsersQueryVariables> & ({ variables: SelectUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectUsersQuery, SelectUsersQueryVariables>(SelectUsersDocument, options);
      }
export function useSelectUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectUsersQuery, SelectUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectUsersQuery, SelectUsersQueryVariables>(SelectUsersDocument, options);
        }
export function useSelectUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SelectUsersQuery, SelectUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectUsersQuery, SelectUsersQueryVariables>(SelectUsersDocument, options);
        }
export type SelectUsersQueryHookResult = ReturnType<typeof useSelectUsersQuery>;
export type SelectUsersLazyQueryHookResult = ReturnType<typeof useSelectUsersLazyQuery>;
export type SelectUsersSuspenseQueryHookResult = ReturnType<typeof useSelectUsersSuspenseQuery>;
export type SelectUsersQueryResult = Apollo.QueryResult<SelectUsersQuery, SelectUsersQueryVariables>;
export const LastMessageReadDocument = gql`
    subscription LastMessageRead($id: String) {
  lastMessageRead(id: $id)
}
    `;

/**
 * __useLastMessageReadSubscription__
 *
 * To run a query within a React component, call `useLastMessageReadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLastMessageReadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastMessageReadSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLastMessageReadSubscription(baseOptions?: Apollo.SubscriptionHookOptions<LastMessageReadSubscription, LastMessageReadSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LastMessageReadSubscription, LastMessageReadSubscriptionVariables>(LastMessageReadDocument, options);
      }
export type LastMessageReadSubscriptionHookResult = ReturnType<typeof useLastMessageReadSubscription>;
export type LastMessageReadSubscriptionResult = Apollo.SubscriptionResult<LastMessageReadSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($id: String, $userId: String) {
  newMessage(id: $id, userId: $userId) {
    id
    content
    createdAt
    readAt
    repliedMessage {
      id
      content
    }
    sender {
      id
      avatar
      firstname
      lastname
    }
    receiver {
      id
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const SubNewNotificationDocument = gql`
    subscription SubNewNotification($id: String!) {
  newNotification(id: $id) {
    id
    type
    hasBeenSeen
    isRead
    createdAt
    request {
      id
      sender {
        firstname
        lastname
        roles
      }
      receiver {
        firstname
        lastname
      }
    }
  }
}
    `;

/**
 * __useSubNewNotificationSubscription__
 *
 * To run a query within a React component, call `useSubNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubNewNotificationSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubNewNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubNewNotificationSubscription, SubNewNotificationSubscriptionVariables> & ({ variables: SubNewNotificationSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubNewNotificationSubscription, SubNewNotificationSubscriptionVariables>(SubNewNotificationDocument, options);
      }
export type SubNewNotificationSubscriptionHookResult = ReturnType<typeof useSubNewNotificationSubscription>;
export type SubNewNotificationSubscriptionResult = Apollo.SubscriptionResult<SubNewNotificationSubscription>;
export const TotalUnreadMessageSubDocument = gql`
    subscription totalUnreadMessageSub($id: String!) {
  totalMessage(id: $id)
}
    `;

/**
 * __useTotalUnreadMessageSubSubscription__
 *
 * To run a query within a React component, call `useTotalUnreadMessageSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTotalUnreadMessageSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalUnreadMessageSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTotalUnreadMessageSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<TotalUnreadMessageSubSubscription, TotalUnreadMessageSubSubscriptionVariables> & ({ variables: TotalUnreadMessageSubSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TotalUnreadMessageSubSubscription, TotalUnreadMessageSubSubscriptionVariables>(TotalUnreadMessageSubDocument, options);
      }
export type TotalUnreadMessageSubSubscriptionHookResult = ReturnType<typeof useTotalUnreadMessageSubSubscription>;
export type TotalUnreadMessageSubSubscriptionResult = Apollo.SubscriptionResult<TotalUnreadMessageSubSubscription>;