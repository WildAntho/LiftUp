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
  chargesEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  detailsSubmitted: Scalars['Boolean']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payoutsEnabled: Scalars['Boolean']['output'];
  specialisation?: Maybe<Array<Scalars['String']['output']>>;
  stripeAccountId?: Maybe<Scalars['String']['output']>;
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
  exerciceModel?: Maybe<ExerciceModel>;
  id: Scalars['ID']['output'];
  intensity?: Maybe<Scalars['Float']['output']>;
  intensityFormat?: Maybe<IntensityFormat>;
  notes?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  rep?: Maybe<Scalars['Float']['output']>;
  repFormat?: Maybe<RepFormat>;
  serie?: Maybe<Scalars['Float']['output']>;
  tempo?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  training?: Maybe<Training>;
  trainingPlan?: Maybe<TrainingPlan>;
  weight?: Maybe<Scalars['Float']['output']>;
  weightFormat?: Maybe<WeightFormat>;
};

export type ExerciceData = {
  config?: InputMaybe<Config>;
  exerciceModelId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  intensity?: InputMaybe<Scalars['Float']['input']>;
  intensityFormat?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  rep?: InputMaybe<Scalars['Float']['input']>;
  repFormat?: InputMaybe<Scalars['String']['input']>;
  serie?: InputMaybe<Scalars['Float']['input']>;
  tempo?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  weightFormat?: InputMaybe<Scalars['String']['input']>;
};

export type ExerciceInfoResponse = {
  __typename?: 'ExerciceInfoResponse';
  description?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  muscles?: Maybe<Array<MuscleGroup>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ExerciceModel = {
  __typename?: 'ExerciceModel';
  description?: Maybe<Scalars['String']['output']>;
  exercices?: Maybe<Exercice>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  muscles?: Maybe<Array<MuscleGroup>>;
  primaryMuscle?: Maybe<MuscleGroup>;
  secondaryMuscle?: Maybe<MuscleGroup>;
  title: Scalars['String']['output'];
  user?: Maybe<User>;
  userFavorites?: Maybe<Array<User>>;
  video?: Maybe<Scalars['String']['output']>;
  videoType?: Maybe<VideoType>;
};

export type ExerciceModelData = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  muscles?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  video?: InputMaybe<Scalars['String']['input']>;
  videoType?: InputMaybe<VideoType>;
};

export type Feedback = {
  __typename?: 'Feedback';
  comment?: Maybe<Scalars['String']['output']>;
  date: Scalars['DateTimeISO']['output'];
  feeling: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  intensity: Scalars['Float']['output'];
  notifications?: Maybe<Array<Notification>>;
  satisfaction?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  training: Training;
  user: User;
};

export type FeedbackData = {
  comment: Scalars['String']['input'];
  feeling: Scalars['Float']['input'];
  intensity: Scalars['Float']['input'];
  satisfaction: Scalars['Float']['input'];
  trainingId: Scalars['String']['input'];
};

export type FeedbackWithoutTrainingId = {
  comment: Scalars['String']['input'];
  feeling: Scalars['Float']['input'];
  intensity: Scalars['Float']['input'];
  satisfaction: Scalars['Float']['input'];
};

export type GenerateUploadUrl = {
  __typename?: 'GenerateUploadURL';
  fileName: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

/** Format d'intensité */
export enum IntensityFormat {
  Rir = 'RIR',
  Rpe = 'RPE'
}

export type Invoice = {
  __typename?: 'Invoice';
  amountPaid: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  hostedInvoicePdf?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoicePdf: Scalars['String']['output'];
  nextPaymentAt?: Maybe<Scalars['DateTimeISO']['output']>;
  paidAt: Scalars['DateTimeISO']['output'];
  profileSubscription: ProfileSubscription;
  status: InvoiceStatus;
  stripeInvoiceId: Scalars['String']['output'];
  user: User;
};

export enum InvoiceStatus {
  Open = 'OPEN',
  Paid = 'PAID',
  Uncollectible = 'UNCOLLECTIBLE',
  Void = 'VOID'
}

export type MarkAsReadResponse = {
  __typename?: 'MarkAsReadResponse';
  message: Scalars['String']['output'];
};

export type Membership = {
  __typename?: 'Membership';
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  notifications?: Maybe<Array<Notification>>;
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

export type MuscleGroup = {
  __typename?: 'MuscleGroup';
  exercices?: Maybe<Array<ExerciceModel>>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  primaryExercises?: Maybe<Array<ExerciceModel>>;
  secondaryExercises?: Maybe<Array<ExerciceModel>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: Scalars['String']['output'];
  activeMembership: Scalars['String']['output'];
  addCategory: Scalars['String']['output'];
  addExercice: Scalars['String']['output'];
  addExerciceFavorite: Scalars['String']['output'];
  addFeedback: Scalars['String']['output'];
  addMessages: Scalars['String']['output'];
  addOffer: Scalars['String']['output'];
  addRequest: Scalars['String']['output'];
  addTraining: Scalars['String']['output'];
  addTrainingCrew: Scalars['String']['output'];
  addTrainingStudent: Scalars['String']['output'];
  archiveProgram: Scalars['String']['output'];
  cancelMembership: Scalars['String']['output'];
  cancelProfileSubscription: Scalars['Boolean']['output'];
  createCrew: Scalars['String']['output'];
  createExerciceModel: Scalars['String']['output'];
  createProgram: Program;
  createTrainingPlan: Scalars['String']['output'];
  deleteCrew: Scalars['String']['output'];
  deleteExercice: Scalars['String']['output'];
  deleteExerciceFavorite: Scalars['String']['output'];
  deleteExerciceModel: Scalars['String']['output'];
  deleteFeedback: Scalars['String']['output'];
  deleteOffer: Scalars['String']['output'];
  deleteProgram: Scalars['String']['output'];
  deleteStudent: Scalars['String']['output'];
  deleteTraining: Scalars['String']['output'];
  deleteTrainingPlan: Scalars['String']['output'];
  duplicateWeekTraining: Scalars['String']['output'];
  generateProgram: Scalars['String']['output'];
  generateSessionProfile: Scalars['String']['output'];
  generateUploadUrl: GenerateUploadUrl;
  hasBeenSeen: Scalars['String']['output'];
  isRead: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  markAsRead: MarkAsReadResponse;
  pasteTraining: Scalars['String']['output'];
  publishProgram: Scalars['String']['output'];
  reactivateProfileSubscription: Scalars['Boolean']['output'];
  rejectRequest: Scalars['String']['output'];
  renewMemberShip: Scalars['String']['output'];
  signUp: Scalars['String']['output'];
  subscribeProgram: Scalars['String']['output'];
  updateCoachProfile: Scalars['String']['output'];
  updateCrew: Scalars['String']['output'];
  updateExercice: Exercice;
  updateExerciceModel: Scalars['String']['output'];
  updateFeedback: Scalars['String']['output'];
  updateOffer: Scalars['String']['output'];
  updatePreferenceNotification: Scalars['String']['output'];
  updateProfile: User;
  updateProgram: Scalars['String']['output'];
  updateProgress: Scalars['String']['output'];
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


export type MutationAddExerciceArgs = {
  exercices: Array<ExerciceData>;
  id: Scalars['String']['input'];
  scope: ScopeExercice;
};


export type MutationAddExerciceFavoriteArgs = {
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


export type MutationDeleteExerciceFavoriteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExerciceModelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFeedbackArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProgramArgs = {
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


export type MutationDuplicateWeekTrainingArgs = {
  currentWeek: Scalars['Float']['input'];
  programId: Scalars['String']['input'];
  repetition: Scalars['Float']['input'];
};


export type MutationGenerateProgramArgs = {
  coachId: Scalars['String']['input'];
  programId: Scalars['String']['input'];
  startDate: Scalars['DateTimeISO']['input'];
  userIds: Array<Scalars['String']['input']>;
};


export type MutationGenerateSessionProfileArgs = {
  id: Scalars['String']['input'];
  periodicity: Periodicity;
};


export type MutationGenerateUploadUrlArgs = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileType?: InputMaybe<Scalars['String']['input']>;
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
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


export type MutationPasteTrainingArgs = {
  day: Scalars['Float']['input'];
  ids: Array<Scalars['String']['input']>;
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


export type MutationSubscribeProgramArgs = {
  coachId: Scalars['String']['input'];
  politic: Scalars['Boolean']['input'];
  programId: Scalars['String']['input'];
  startDate: Scalars['DateTimeISO']['input'];
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


export type MutationUpdateExerciceModelArgs = {
  addVideo?: InputMaybe<Scalars['Boolean']['input']>;
  data: ExerciceModelData;
  deleteVideo?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateFeedbackArgs = {
  data: FeedbackWithoutTrainingId;
  id: Scalars['String']['input'];
};


export type MutationUpdateOfferArgs = {
  data: OfferInput;
  id: Scalars['String']['input'];
};


export type MutationUpdatePreferenceNotificationArgs = {
  data: Array<NotificationType>;
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfile;
};


export type MutationUpdateProgramArgs = {
  data: UpdateProgramInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateProgressArgs = {
  data: ProgressInput;
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
  feedback?: Maybe<Feedback>;
  group: NotificationGroup;
  hasBeenSeen: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  membership?: Maybe<Membership>;
  request?: Maybe<Request>;
  type: NotificationType;
  user: User;
};

export enum NotificationGroup {
  Follow = 'FOLLOW',
  Request = 'REQUEST',
  Training = 'TRAINING'
}

export type NotificationPreference = {
  __typename?: 'NotificationPreference';
  createdAt: Scalars['DateTimeISO']['output'];
  disabledTypes: Array<NotificationType>;
  id: Scalars['ID']['output'];
  user: User;
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  notifications: Array<Notification>;
  total: Scalars['Int']['output'];
  totalUnread: Scalars['Int']['output'];
};

export enum NotificationType {
  AcceptRequest = 'ACCEPT_REQUEST',
  ActivateMembership = 'ACTIVATE_MEMBERSHIP',
  CancelMembership = 'CANCEL_MEMBERSHIP',
  NewFeedback = 'NEW_FEEDBACK',
  NewRequest = 'NEW_REQUEST',
  NewTraining = 'NEW_TRAINING'
}

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
  program?: Maybe<Array<Program>>;
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

/** Statut des offres */
export enum OfferStatus {
  Available = 'AVAILABLE',
  Cancel = 'CANCEL'
}

export enum Periodicity {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

export type Permission = {
  __typename?: 'Permission';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  stripePriceMonth?: Maybe<Scalars['String']['output']>;
  stripePriceYear?: Maybe<Scalars['String']['output']>;
  stripeProductId?: Maybe<Scalars['String']['output']>;
  type: UserRole;
  users?: Maybe<Array<User>>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  id: Scalars['String']['output'];
  monthlyAmount?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  yearlyAmount?: Maybe<Scalars['Float']['output']>;
};

export type ProfileSubscription = {
  __typename?: 'ProfileSubscription';
  canceledAt?: Maybe<Scalars['DateTimeISO']['output']>;
  currentPeriodEnd?: Maybe<Scalars['DateTimeISO']['output']>;
  endDate?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  periodicity: Periodicity;
  profile: Profile;
  startDate?: Maybe<Scalars['DateTimeISO']['output']>;
  status: ProfileSubscriptionStatus;
  stripeSessionId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  user: User;
};

export enum ProfileSubscriptionStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  FirstPaid = 'FIRST_PAID',
  Incomplete = 'INCOMPLETE',
  ScheduleCancel = 'SCHEDULE_CANCEL'
}

export type Program = {
  __typename?: 'Program';
  category?: Maybe<OfferCategory>;
  coach: User;
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  level: ProgramLevel;
  price?: Maybe<Scalars['Float']['output']>;
  public: Scalars['Boolean']['output'];
  status: ProgramStatus;
  subscriptions?: Maybe<Array<UserProgram>>;
  title: Scalars['String']['output'];
  trainingPlans: Array<TrainingPlan>;
};

export type ProgramInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
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

export type ProgramMarketplaceResponse = {
  __typename?: 'ProgramMarketplaceResponse';
  program: Program;
  trainingsCount: Scalars['Float']['output'];
};

/** Le statut d'un programme (brouillon, publié, archivé) */
export enum ProgramStatus {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type ProgressSession = {
  __typename?: 'ProgressSession';
  createConnect: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  offer: Scalars['Boolean']['output'];
  profile: Scalars['Boolean']['output'];
  program: Scalars['Boolean']['output'];
  searchCoach: Scalars['Boolean']['output'];
  searchProgram: Scalars['Boolean']['output'];
  training: Scalars['Boolean']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  GetMe: Scalars['String']['output'];
  getAllCategories: Array<OfferCategory>;
  getAllExercicesModel: Array<ExerciceModel>;
  getAllMuscleGroup: Array<MuscleGroup>;
  getChatUsers: Array<User>;
  getCoachCrews: Array<Crew>;
  getCoachOffers: Array<Offer>;
  getCoachProfile: CoachProfile;
  getConnectUrl: Scalars['String']['output'];
  getConversationById: Conversation;
  getConversations: Array<Conversation>;
  getCrewTraining: Array<Training>;
  getCurrentProfileSubscription: ProfileSubscription;
  getDayNumberTraining: Array<Scalars['Float']['output']>;
  getExerciceInfo: ExerciceInfoResponse;
  getExercices: Array<Exercice>;
  getFavoriteExercicesId: Array<Scalars['String']['output']>;
  getFeedbacks: Array<Feedback>;
  getInvoices: Array<Invoice>;
  getListUsersCrew: Array<User>;
  getMembership: Membership;
  getMessages: MessageResult;
  getMyCoach: User;
  getMyCrew: Crew;
  getNotification: NotificationResponse;
  getOneCoachOffers: Array<Offer>;
  getOneCoachProfile: CoachProfile;
  getOneExericeModel: ExerciceModel;
  getOneProgramMarketPlace: ProgramMarketplaceResponse;
  getOneTraining: Training;
  getPermissionAdmin: Array<Permission>;
  getPortailStrip: Scalars['String']['output'];
  getPreferenceNotification: NotificationPreference;
  getProfileAdmin: Array<Profile>;
  getProfilePricing: Array<ProfileOutput>;
  getPrograms: Array<Program>;
  getProgramsMarketPlace: Array<Program>;
  getProgress: ProgressSession;
  getRequest: Array<Request>;
  getSent: Array<Request>;
  getStudentFeedback: Array<Feedback>;
  getStudentTrainings: Array<Training>;
  getStudents: StudentsResponse;
  getTotalRequests: Scalars['Float']['output'];
  getTotalStudents: Scalars['Int']['output'];
  getTotalUnreadMessage: Scalars['Int']['output'];
  getTrainingPlan: Array<TrainingPlan>;
  getTrainingsById: Array<Training>;
  getUnreadRequests: Array<Request>;
  getUserById: User;
  getUserPrograms: Array<UserProgram>;
  getUsers: Array<User>;
  selectCoach: Array<User>;
};


export type QueryGetAllExercicesModelArgs = {
  getFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  muscles?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetCoachOffersArgs = {
  status?: InputMaybe<OfferStatus>;
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


export type QueryGetExerciceInfoArgs = {
  exerciceId?: InputMaybe<Scalars['String']['input']>;
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


export type QueryGetNotificationArgs = {
  group?: InputMaybe<Scalars['String']['input']>;
  unread?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetOneCoachOffersArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneCoachProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneExericeModelArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneProgramMarketPlaceArgs = {
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
  status?: InputMaybe<Scalars['String']['input']>;
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

export type RangeDate = {
  endDate: Scalars['DateTimeISO']['input'];
  startDate: Scalars['DateTimeISO']['input'];
};

/** Format de répétions */
export enum RepFormat {
  Amrap = 'AMRAP',
  E2Mom = 'E2MOM',
  Emom = 'EMOM',
  Standard = 'STANDARD',
  Time = 'TIME'
}

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

/** Scope de la provenance d'un exercice */
export enum ScopeExercice {
  Calendar = 'CALENDAR',
  Program = 'PROGRAM'
}

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
  sendNotif?: InputMaybe<Scalars['Boolean']['input']>;
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
  sex?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProgramInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
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
  coachingPrograms?: Maybe<Array<UserProgram>>;
  conversations?: Maybe<Array<Conversation>>;
  crew?: Maybe<Crew>;
  email: Scalars['String']['output'];
  exerciceModels?: Maybe<Array<ExerciceModel>>;
  favoriteExercices?: Maybe<Array<ExerciceModel>>;
  feedbacks?: Maybe<Array<Feedback>>;
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  memberships?: Maybe<Array<Membership>>;
  notificationPreferences: Array<NotificationPreference>;
  notifications?: Maybe<Array<Notification>>;
  offers?: Maybe<Array<Offer>>;
  password: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  progress: Array<ProgressSession>;
  receivedMessages?: Maybe<Array<Message>>;
  receivedRequests?: Maybe<Array<Request>>;
  roles: Array<UserRole>;
  sentMessages?: Maybe<Array<Message>>;
  sentRequests?: Maybe<Array<Request>>;
  sex?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  studentOffer?: Maybe<Offer>;
  students?: Maybe<Array<User>>;
  tokenVersion: Scalars['Float']['output'];
  trainings?: Maybe<Array<Training>>;
  userPrograms?: Maybe<Array<UserProgram>>;
};

export type UserInput = {
  confirmedPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles: Scalars['String']['input'];
  sex?: InputMaybe<Scalars['String']['input']>;
};

export type UserProgram = {
  __typename?: 'UserProgram';
  coach: User;
  commissionRate: Scalars['Float']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paidAt?: Maybe<Scalars['DateTimeISO']['output']>;
  price: Scalars['Float']['output'];
  program: Program;
  receip?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTimeISO']['output']>;
  status: Scalars['String']['output'];
  stripeSessionId?: Maybe<Scalars['String']['output']>;
  user: User;
};

/** Rôles utilisateurs */
export enum UserRole {
  Admin = 'ADMIN',
  Coach = 'COACH',
  Student = 'STUDENT'
}

/** Type de vidéo */
export enum VideoType {
  Perso = 'PERSO',
  Youtube = 'YOUTUBE'
}

/** Format de poids */
export enum WeightFormat {
  Bodyweight = 'BODYWEIGHT',
  Choice = 'CHOICE',
  Kg = 'KG',
  Lbs = 'LBS',
  Percentage = 'PERCENTAGE'
}

export type GetTrainingType = {
  dayNumber: Scalars['Float']['input'];
  programId: Scalars['String']['input'];
};

export type ProgressInput = {
  id: Scalars['String']['input'];
  offer?: InputMaybe<Scalars['Boolean']['input']>;
  profile?: InputMaybe<Scalars['Boolean']['input']>;
  program?: InputMaybe<Scalars['Boolean']['input']>;
  searchCoach?: InputMaybe<Scalars['Boolean']['input']>;
  searchProgram?: InputMaybe<Scalars['Boolean']['input']>;
  training?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ExerciceFieldsFragment = { __typename?: 'Exercice', id: string, title: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, tempo?: number | null, repFormat?: RepFormat | null, weightFormat?: WeightFormat | null, intensityFormat?: IntensityFormat | null, notes?: string | null, position?: number | null, exerciceModel?: { __typename?: 'ExerciceModel', id: string, image?: string | null, title: string } | null };

export type AcceptRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: AddRequestData;
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: string };

export type ActivateMemberShipMutationVariables = Exact<{
  data: ActiveMembershipType;
}>;


export type ActivateMemberShipMutation = { __typename?: 'Mutation', activeMembership: string };

export type AddExerciceMutationVariables = Exact<{
  exercices: Array<ExerciceData> | ExerciceData;
  id: Scalars['String']['input'];
  scope: ScopeExercice;
}>;


export type AddExerciceMutation = { __typename?: 'Mutation', addExercice: string };

export type AddExerciceFavoriteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AddExerciceFavoriteMutation = { __typename?: 'Mutation', addExerciceFavorite: string };

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

export type CancelMembershipMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelMembershipMutation = { __typename?: 'Mutation', cancelMembership: string };

export type CreateCrewMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateCrewMutation = { __typename?: 'Mutation', createCrew: string };

export type CreateExerciceModelMutationVariables = Exact<{
  data: ExerciceModelData;
}>;


export type CreateExerciceModelMutation = { __typename?: 'Mutation', createExerciceModel: string };

export type CreateProgramMutationVariables = Exact<{
  data: ProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'Program', id: string, title: string, description?: string | null, status: ProgramStatus, duration: number, public: boolean, price?: number | null, level: ProgramLevel, category?: { __typename?: 'OfferCategory', id: string, label: string } | null } };

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

export type DeleteExerciceFavoriteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExerciceFavoriteMutation = { __typename?: 'Mutation', deleteExerciceFavorite: string };

export type DeleteExerciceModelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExerciceModelMutation = { __typename?: 'Mutation', deleteExerciceModel: string };

export type DeleteFeedbackMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteFeedbackMutation = { __typename?: 'Mutation', deleteFeedback: string };

export type DeleteOfferMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer: string };

export type DeleteProgramMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteProgramMutation = { __typename?: 'Mutation', deleteProgram: string };

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

export type DuplicateWeekTrainingMutationVariables = Exact<{
  repetition: Scalars['Float']['input'];
  currentWeek: Scalars['Float']['input'];
  programId: Scalars['String']['input'];
}>;


export type DuplicateWeekTrainingMutation = { __typename?: 'Mutation', duplicateWeekTraining: string };

export type GenerateProgramMutationVariables = Exact<{
  startDate: Scalars['DateTimeISO']['input'];
  coachId: Scalars['String']['input'];
  programId: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GenerateProgramMutation = { __typename?: 'Mutation', generateProgram: string };

export type GenerateSessionProfileMutationVariables = Exact<{
  periodicity: Periodicity;
  id: Scalars['String']['input'];
}>;


export type GenerateSessionProfileMutation = { __typename?: 'Mutation', generateSessionProfile: string };

export type GenerateUploadUrlMutationVariables = Exact<{
  fileType?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GenerateUploadUrlMutation = { __typename?: 'Mutation', generateUploadUrl: { __typename?: 'GenerateUploadURL', uploadUrl: string, fileName: string } };

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

export type PasteTrainingMutationVariables = Exact<{
  day: Scalars['Float']['input'];
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type PasteTrainingMutation = { __typename?: 'Mutation', pasteTraining: string };

export type ReactivateProfileSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type ReactivateProfileSubscriptionMutation = { __typename?: 'Mutation', reactivateProfileSubscription: boolean };

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

export type SubscribeProgramMutationVariables = Exact<{
  startDate: Scalars['DateTimeISO']['input'];
  coachId: Scalars['String']['input'];
  programId: Scalars['String']['input'];
  politic: Scalars['Boolean']['input'];
}>;


export type SubscribeProgramMutation = { __typename?: 'Mutation', subscribeProgram: string };

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


export type UpdateExerciceMutation = { __typename?: 'Mutation', updateExercice: { __typename?: 'Exercice', id: string, title: string, serie?: number | null, intensity?: number | null, rep?: number | null, weight?: number | null } };

export type UpdateExerciceModelMutationVariables = Exact<{
  data: ExerciceModelData;
  deleteVideo?: InputMaybe<Scalars['Boolean']['input']>;
  addVideo?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateExerciceModelMutation = { __typename?: 'Mutation', updateExerciceModel: string };

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

export type UpdatePreferenceNotificationMutationVariables = Exact<{
  data: Array<NotificationType> | NotificationType;
}>;


export type UpdatePreferenceNotificationMutation = { __typename?: 'Mutation', updatePreferenceNotification: string };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfile;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, sex?: string | null, roles: Array<UserRole>, avatar?: string | null } };

export type UpdateProgramMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateProgramInput;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: string };

export type UpdateProgressMutationVariables = Exact<{
  data: ProgressInput;
}>;


export type UpdateProgressMutation = { __typename?: 'Mutation', updateProgress: string };

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

export type CancelProfileSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelProfileSubscriptionMutation = { __typename?: 'Mutation', cancelProfileSubscription: boolean };

export type GetPermissionAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPermissionAdminQuery = { __typename?: 'Query', getPermissionAdmin: Array<{ __typename?: 'Permission', id: string, key: string, description?: string | null }> };

export type GetProfileAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileAdminQuery = { __typename?: 'Query', getProfileAdmin: Array<{ __typename?: 'Profile', id: string, name: string, permissions: Array<{ __typename?: 'Permission', id: string, key: string, description?: string | null }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null, sex?: string | null, coach?: { __typename?: 'User', firstname: string, lastname: string, email: string, avatar?: string | null, id: string } | null, profile?: { __typename?: 'Profile', id: string, name: string } | null }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'OfferCategory', id: string, label: string }> };

export type GetChatUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatUsersQuery = { __typename?: 'Query', getChatUsers: Array<{ __typename?: 'User', firstname: string, id: string, email: string, lastname: string, avatar?: string | null, roles: Array<UserRole> }> };

export type GetConversationByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetConversationByIdQuery = { __typename?: 'Query', getConversationById: { __typename?: 'Conversation', id: string, messages?: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, sender: { __typename?: 'User', id: string }, receiver: { __typename?: 'User', id: string } }> | null } };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'Conversation', id: string, participants: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string, avatar?: string | null }>, messages?: Array<{ __typename?: 'Message', content: string, createdAt: any, readAt?: any | null, sender: { __typename?: 'User', id: string } }> | null }> };

export type GetMessagesQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessageResult', totalCount: number, messages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, readAt?: any | null, repliedMessage?: { __typename?: 'Message', id: string, content: string } | null, sender: { __typename?: 'User', id: string }, receiver: { __typename?: 'User', id: string } }> } };

export type GetTotalUnreadMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalUnreadMessageQuery = { __typename?: 'Query', getTotalUnreadMessage: number };

export type GetCoachCrewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoachCrewsQuery = { __typename?: 'Query', getCoachCrews: Array<{ __typename?: 'Crew', id: string, name: string, students?: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null }> | null }> };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', getCoachProfile: { __typename?: 'CoachProfile', id: string, name?: string | null, description?: string | null, specialisation?: Array<string> | null, stripeAccountId?: string | null, chargesEnabled: boolean, payoutsEnabled: boolean, detailsSubmitted: boolean, instagram?: string | null, linkedin?: string | null, facebook?: string | null } };

export type GetStudentsQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  crewId?: InputMaybe<Scalars['String']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  sortRemaining?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetStudentsQuery = { __typename?: 'Query', getStudents: { __typename?: 'StudentsResponse', totalCount: number, students: Array<{ __typename?: 'User', email: string, firstname: string, lastname: string, roles: Array<UserRole>, id: string, avatar?: string | null, studentOffer?: { __typename?: 'Offer', name: string, durability: number, id: string } | null, crew?: { __typename?: 'Crew', id: string, name: string } | null, memberships?: Array<{ __typename?: 'Membership', id: string, endDate: any, isActive: boolean }> | null }> } };

export type GetTotalStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalStudentsQuery = { __typename?: 'Query', getTotalStudents: number };

export type GetAllExercicesModelQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  getFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  muscles?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetAllExercicesModelQuery = { __typename?: 'Query', getAllExercicesModel: Array<{ __typename?: 'ExerciceModel', id: string, title: string, image?: string | null, description?: string | null, videoType?: VideoType | null, video?: string | null, user?: { __typename?: 'User', id: string } | null, muscles?: Array<{ __typename?: 'MuscleGroup', id: string }> | null }> };

export type GetExerciceInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExerciceInfoQuery = { __typename?: 'Query', getExerciceInfo: { __typename?: 'ExerciceInfoResponse', link?: string | null, description?: string | null, title?: string | null, muscles?: Array<{ __typename?: 'MuscleGroup', id: string, label: string }> | null } };

export type GetFavoriteExercicesIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavoriteExercicesIdQuery = { __typename?: 'Query', getFavoriteExercicesId: Array<string> };

export type GetOneExericeModelQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneExericeModelQuery = { __typename?: 'Query', getOneExericeModel: { __typename?: 'ExerciceModel', id: string, title: string, image?: string | null, description?: string | null, muscles?: Array<{ __typename?: 'MuscleGroup', id: string }> | null } };

export type GetFeedbacksQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetFeedbacksQuery = { __typename?: 'Query', getFeedbacks: Array<{ __typename?: 'Feedback', id: string, intensity: number, feeling: number, satisfaction?: number | null, comment?: string | null, title: string, date: any }> };

export type GetStudentFeedbackQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetStudentFeedbackQuery = { __typename?: 'Query', getStudentFeedback: Array<{ __typename?: 'Feedback', id: string, title: string, intensity: number, feeling: number, satisfaction?: number | null, date: any, comment?: string | null }> };

export type GetListUsersCrewQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListUsersCrewQuery = { __typename?: 'Query', getListUsersCrew: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', GetMe: string };

export type GetMyMembershipQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyMembershipQuery = { __typename?: 'Query', getMembership: { __typename?: 'Membership', id: string, startDate: any, endDate: any, isActive: boolean, offer: { __typename?: 'Offer', id: string, name: string, description: string } } };

export type GetProgressQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgressQuery = { __typename?: 'Query', getProgress: { __typename?: 'ProgressSession', id: string, profile: boolean, training: boolean, program: boolean, offer: boolean, searchCoach: boolean, searchProgram: boolean, createConnect: boolean } };

export type GetInvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInvoicesQuery = { __typename?: 'Query', getInvoices: Array<{ __typename?: 'Invoice', id: string, status: InvoiceStatus, amountPaid: number, currency: string, invoicePdf: string, hostedInvoicePdf?: string | null, paidAt: any, nextPaymentAt?: any | null, profileSubscription: { __typename?: 'ProfileSubscription', profile: { __typename?: 'Profile', id: string, name: string } } }> };

export type GetAllMuscleGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMuscleGroupQuery = { __typename?: 'Query', getAllMuscleGroup: Array<{ __typename?: 'MuscleGroup', id: string, key: string, label: string }> };

export type GetNotificationQueryVariables = Exact<{
  unread: Scalars['Boolean']['input'];
  group?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification: { __typename?: 'NotificationResponse', totalUnread: number, total: number, notifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, isRead: boolean, hasBeenSeen: boolean, createdAt: any, request?: { __typename?: 'Request', sender: { __typename?: 'User', firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null }, receiver: { __typename?: 'User', firstname: string, lastname: string, avatar?: string | null } } | null, feedback?: { __typename?: 'Feedback', title: string, id: string, comment?: string | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, avatar?: string | null } } | null, membership?: { __typename?: 'Membership', id: string, student: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null } } | null }> } };

export type GetPreferenceNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPreferenceNotificationQuery = { __typename?: 'Query', getPreferenceNotification: { __typename?: 'NotificationPreference', id: string, disabledTypes: Array<NotificationType> } };

export type GetOneCoachOffersQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneCoachOffersQuery = { __typename?: 'Query', getOneCoachOffers: Array<{ __typename?: 'Offer', id: string, name: string, price: number, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', label: string, id: string } }> };

export type GetMyOffersQueryVariables = Exact<{
  status?: InputMaybe<OfferStatus>;
}>;


export type GetMyOffersQuery = { __typename?: 'Query', getCoachOffers: Array<{ __typename?: 'Offer', id: string, name: string, price: number, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', label: string, id: string }, crew?: { __typename?: 'Crew', id: string, name: string } | null }> };

export type GetOneCoachProfileQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneCoachProfileQuery = { __typename?: 'Query', getOneCoachProfile: { __typename?: 'CoachProfile', id: string, name?: string | null, description?: string | null, specialisation?: Array<string> | null, facebook?: string | null, instagram?: string | null, linkedin?: string | null, user?: { __typename?: 'User', firstname: string, lastname: string, avatar?: string | null } | null } };

export type GetCurrentProfileSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentProfileSubscriptionQuery = { __typename?: 'Query', getCurrentProfileSubscription: { __typename?: 'ProfileSubscription', id: string, status: ProfileSubscriptionStatus, currentPeriodEnd?: any | null } };

export type GetDayNumberTrainingQueryVariables = Exact<{
  programId: Scalars['String']['input'];
}>;


export type GetDayNumberTrainingQuery = { __typename?: 'Query', getDayNumberTraining: Array<number> };

export type GetMyProgramsQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyProgramsQuery = { __typename?: 'Query', getPrograms: Array<{ __typename?: 'Program', id: string, title: string, description?: string | null, status: ProgramStatus, duration: number, public: boolean, price?: number | null, level: ProgramLevel, category?: { __typename?: 'OfferCategory', id: string, label: string } | null }> };

export type GetOneProgramMarketPlaceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneProgramMarketPlaceQuery = { __typename?: 'Query', getOneProgramMarketPlace: { __typename?: 'ProgramMarketplaceResponse', trainingsCount: number, program: { __typename?: 'Program', id: string, title: string, description?: string | null, duration: number, price?: number | null, level: ProgramLevel, category?: { __typename?: 'OfferCategory', label: string, id: string } | null, coach: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null, coachProfile?: { __typename?: 'CoachProfile', specialisation?: Array<string> | null, name?: string | null } | null } } } };

export type GetProgramsMarketPlaceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgramsMarketPlaceQuery = { __typename?: 'Query', getProgramsMarketPlace: Array<{ __typename?: 'Program', id: string, title: string, duration: number, price?: number | null, level: ProgramLevel, category?: { __typename?: 'OfferCategory', id: string, label: string } | null, coach: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null } }> };

export type GetTrainingPlanQueryVariables = Exact<{
  data: GetTrainingType;
}>;


export type GetTrainingPlanQuery = { __typename?: 'Query', getTrainingPlan: Array<{ __typename?: 'TrainingPlan', id: string, title: string, dayNumber: number, notes?: string | null, exercices?: Array<{ __typename?: 'Exercice', id: string, title: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, notes?: string | null, tempo?: number | null, repFormat?: RepFormat | null, weightFormat?: WeightFormat | null, intensityFormat?: IntensityFormat | null, position?: number | null, exerciceModel?: { __typename?: 'ExerciceModel', id: string, image?: string | null } | null }> | null }> };

export type GetUserProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProgramsQuery = { __typename?: 'Query', getUserPrograms: Array<{ __typename?: 'UserProgram', id: string, price: number, commissionRate: number, createdAt: any, startDate?: any | null, paidAt?: any | null, status: string, receip?: string | null, user: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null }, coach: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null }, program: { __typename?: 'Program', id: string, title: string } }> };

export type GetRequestQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRequestQuery = { __typename?: 'Query', getRequest: Array<{ __typename?: 'Request', id: string, description?: string | null, phone?: number | null, offer?: { __typename?: 'Offer', name: string, id: string } | null, sender: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null } }> };

export type GetSentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSentQuery = { __typename?: 'Query', getSent: Array<{ __typename?: 'Request', receiver: { __typename?: 'User', email: string, id: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null } }> };

export type GetTotalRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalRequestsQuery = { __typename?: 'Query', getTotalRequests: number };

export type GetConnectUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConnectUrlQuery = { __typename?: 'Query', getConnectUrl: string };

export type GetProfilePricingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilePricingQuery = { __typename?: 'Query', getProfilePricing: Array<{ __typename?: 'ProfileOutput', id: string, name: string, monthlyAmount?: number | null, yearlyAmount?: number | null }> };

export type GetPortailStripQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPortailStripQuery = { __typename?: 'Query', getPortailStrip: string };

export type GetCoachQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCoachQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', coach?: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null } | null } };

export type GetMyCoachQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCoachQuery = { __typename?: 'Query', getMyCoach: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null } };

export type SelectCoachQueryVariables = Exact<{
  id: Scalars['String']['input'];
  price?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  categorie?: InputMaybe<Scalars['String']['input']>;
}>;


export type SelectCoachQuery = { __typename?: 'Query', selectCoach: Array<{ __typename?: 'User', id: string, email: string, firstname: string, lastname: string, roles: Array<UserRole>, avatar?: string | null, coachProfile?: { __typename?: 'CoachProfile', id: string, name?: string | null, specialisation?: Array<string> | null } | null, offers?: Array<{ __typename?: 'Offer', id: string, price: number, name: string, description: string, availability: boolean, durability: number, category: { __typename?: 'OfferCategory', id: string, label: string } }> | null }> };

export type GetCrewTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetCrewTrainingQuery = { __typename?: 'Query', getCrewTraining: Array<{ __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, tempo?: number | null, repFormat?: RepFormat | null, weightFormat?: WeightFormat | null, intensityFormat?: IntensityFormat | null, notes?: string | null, position?: number | null, exerciceModel?: { __typename?: 'ExerciceModel', id: string, image?: string | null, title: string } | null }> | null }> };

export type GetMyTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetMyTrainingQuery = { __typename?: 'Query', getTrainingsById: Array<{ __typename?: 'Training', createdByCoach?: string | null, id: string, title: string, date: any, notes?: string | null, editable: boolean, validate: boolean, crew?: { __typename?: 'Crew', id: string } | null, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, tempo?: number | null, repFormat?: RepFormat | null, weightFormat?: WeightFormat | null, intensityFormat?: IntensityFormat | null, notes?: string | null, position?: number | null, exerciceModel?: { __typename?: 'ExerciceModel', id: string, image?: string | null, title: string } | null }> | null }> };

export type GetOneTrainingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneTrainingQuery = { __typename?: 'Query', getOneTraining: { __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean } };

export type GetStudentTrainingsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  rangeDate: RangeDate;
}>;


export type GetStudentTrainingsQuery = { __typename?: 'Query', getStudentTrainings: Array<{ __typename?: 'Training', id: string, title: string, date: any, notes?: string | null, createdByCoach?: string | null, editable: boolean, validate: boolean, exercices?: Array<{ __typename?: 'Exercice', title: string, id: string, serie?: number | null, rep?: number | null, intensity?: number | null, weight?: number | null, tempo?: number | null, repFormat?: RepFormat | null, weightFormat?: WeightFormat | null, intensityFormat?: IntensityFormat | null, notes?: string | null, position?: number | null, exerciceModel?: { __typename?: 'ExerciceModel', id: string, image?: string | null, title: string } | null }> | null }> };

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


export type SubNewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: string, type: NotificationType, hasBeenSeen: boolean, isRead: boolean, createdAt: any, request?: { __typename?: 'Request', id: string, sender: { __typename?: 'User', firstname: string, lastname: string, roles: Array<UserRole> }, receiver: { __typename?: 'User', firstname: string, lastname: string } } | null, feedback?: { __typename?: 'Feedback', title: string, id: string, comment?: string | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, avatar?: string | null } } | null, membership?: { __typename?: 'Membership', id: string, student: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, avatar?: string | null } } | null } };

export type TotalUnreadMessageSubSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TotalUnreadMessageSubSubscription = { __typename?: 'Subscription', totalMessage: number };

export const ExerciceFieldsFragmentDoc = gql`
    fragment ExerciceFields on Exercice {
  id
  title
  serie
  rep
  intensity
  weight
  tempo
  repFormat
  weightFormat
  intensityFormat
  notes
  position
  exerciceModel {
    id
    image
    title
  }
}
    `;
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
export const AddExerciceDocument = gql`
    mutation AddExercice($exercices: [ExerciceData!]!, $id: String!, $scope: ScopeExercice!) {
  addExercice(exercices: $exercices, id: $id, scope: $scope)
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
 *      exercices: // value for 'exercices'
 *      id: // value for 'id'
 *      scope: // value for 'scope'
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
export const AddExerciceFavoriteDocument = gql`
    mutation AddExerciceFavorite($id: String!) {
  addExerciceFavorite(id: $id)
}
    `;
export type AddExerciceFavoriteMutationFn = Apollo.MutationFunction<AddExerciceFavoriteMutation, AddExerciceFavoriteMutationVariables>;

/**
 * __useAddExerciceFavoriteMutation__
 *
 * To run a mutation, you first call `useAddExerciceFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciceFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciceFavoriteMutation, { data, loading, error }] = useAddExerciceFavoriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddExerciceFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciceFavoriteMutation, AddExerciceFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciceFavoriteMutation, AddExerciceFavoriteMutationVariables>(AddExerciceFavoriteDocument, options);
      }
export type AddExerciceFavoriteMutationHookResult = ReturnType<typeof useAddExerciceFavoriteMutation>;
export type AddExerciceFavoriteMutationResult = Apollo.MutationResult<AddExerciceFavoriteMutation>;
export type AddExerciceFavoriteMutationOptions = Apollo.BaseMutationOptions<AddExerciceFavoriteMutation, AddExerciceFavoriteMutationVariables>;
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
export const CancelMembershipDocument = gql`
    mutation CancelMembership {
  cancelMembership
}
    `;
export type CancelMembershipMutationFn = Apollo.MutationFunction<CancelMembershipMutation, CancelMembershipMutationVariables>;

/**
 * __useCancelMembershipMutation__
 *
 * To run a mutation, you first call `useCancelMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMembershipMutation, { data, loading, error }] = useCancelMembershipMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelMembershipMutation(baseOptions?: Apollo.MutationHookOptions<CancelMembershipMutation, CancelMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelMembershipMutation, CancelMembershipMutationVariables>(CancelMembershipDocument, options);
      }
export type CancelMembershipMutationHookResult = ReturnType<typeof useCancelMembershipMutation>;
export type CancelMembershipMutationResult = Apollo.MutationResult<CancelMembershipMutation>;
export type CancelMembershipMutationOptions = Apollo.BaseMutationOptions<CancelMembershipMutation, CancelMembershipMutationVariables>;
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
export const CreateExerciceModelDocument = gql`
    mutation CreateExerciceModel($data: ExerciceModelData!) {
  createExerciceModel(data: $data)
}
    `;
export type CreateExerciceModelMutationFn = Apollo.MutationFunction<CreateExerciceModelMutation, CreateExerciceModelMutationVariables>;

/**
 * __useCreateExerciceModelMutation__
 *
 * To run a mutation, you first call `useCreateExerciceModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciceModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciceModelMutation, { data, loading, error }] = useCreateExerciceModelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateExerciceModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciceModelMutation, CreateExerciceModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciceModelMutation, CreateExerciceModelMutationVariables>(CreateExerciceModelDocument, options);
      }
export type CreateExerciceModelMutationHookResult = ReturnType<typeof useCreateExerciceModelMutation>;
export type CreateExerciceModelMutationResult = Apollo.MutationResult<CreateExerciceModelMutation>;
export type CreateExerciceModelMutationOptions = Apollo.BaseMutationOptions<CreateExerciceModelMutation, CreateExerciceModelMutationVariables>;
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
    category {
      id
      label
    }
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
export const DeleteExerciceFavoriteDocument = gql`
    mutation DeleteExerciceFavorite($id: String!) {
  deleteExerciceFavorite(id: $id)
}
    `;
export type DeleteExerciceFavoriteMutationFn = Apollo.MutationFunction<DeleteExerciceFavoriteMutation, DeleteExerciceFavoriteMutationVariables>;

/**
 * __useDeleteExerciceFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteExerciceFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciceFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciceFavoriteMutation, { data, loading, error }] = useDeleteExerciceFavoriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciceFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciceFavoriteMutation, DeleteExerciceFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciceFavoriteMutation, DeleteExerciceFavoriteMutationVariables>(DeleteExerciceFavoriteDocument, options);
      }
export type DeleteExerciceFavoriteMutationHookResult = ReturnType<typeof useDeleteExerciceFavoriteMutation>;
export type DeleteExerciceFavoriteMutationResult = Apollo.MutationResult<DeleteExerciceFavoriteMutation>;
export type DeleteExerciceFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteExerciceFavoriteMutation, DeleteExerciceFavoriteMutationVariables>;
export const DeleteExerciceModelDocument = gql`
    mutation DeleteExerciceModel($id: String!) {
  deleteExerciceModel(id: $id)
}
    `;
export type DeleteExerciceModelMutationFn = Apollo.MutationFunction<DeleteExerciceModelMutation, DeleteExerciceModelMutationVariables>;

/**
 * __useDeleteExerciceModelMutation__
 *
 * To run a mutation, you first call `useDeleteExerciceModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciceModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciceModelMutation, { data, loading, error }] = useDeleteExerciceModelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciceModelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciceModelMutation, DeleteExerciceModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciceModelMutation, DeleteExerciceModelMutationVariables>(DeleteExerciceModelDocument, options);
      }
export type DeleteExerciceModelMutationHookResult = ReturnType<typeof useDeleteExerciceModelMutation>;
export type DeleteExerciceModelMutationResult = Apollo.MutationResult<DeleteExerciceModelMutation>;
export type DeleteExerciceModelMutationOptions = Apollo.BaseMutationOptions<DeleteExerciceModelMutation, DeleteExerciceModelMutationVariables>;
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
export const DeleteProgramDocument = gql`
    mutation DeleteProgram($id: String!) {
  deleteProgram(id: $id)
}
    `;
export type DeleteProgramMutationFn = Apollo.MutationFunction<DeleteProgramMutation, DeleteProgramMutationVariables>;

/**
 * __useDeleteProgramMutation__
 *
 * To run a mutation, you first call `useDeleteProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProgramMutation, { data, loading, error }] = useDeleteProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProgramMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProgramMutation, DeleteProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProgramMutation, DeleteProgramMutationVariables>(DeleteProgramDocument, options);
      }
export type DeleteProgramMutationHookResult = ReturnType<typeof useDeleteProgramMutation>;
export type DeleteProgramMutationResult = Apollo.MutationResult<DeleteProgramMutation>;
export type DeleteProgramMutationOptions = Apollo.BaseMutationOptions<DeleteProgramMutation, DeleteProgramMutationVariables>;
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
export const DuplicateWeekTrainingDocument = gql`
    mutation DuplicateWeekTraining($repetition: Float!, $currentWeek: Float!, $programId: String!) {
  duplicateWeekTraining(
    repetition: $repetition
    currentWeek: $currentWeek
    programId: $programId
  )
}
    `;
export type DuplicateWeekTrainingMutationFn = Apollo.MutationFunction<DuplicateWeekTrainingMutation, DuplicateWeekTrainingMutationVariables>;

/**
 * __useDuplicateWeekTrainingMutation__
 *
 * To run a mutation, you first call `useDuplicateWeekTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateWeekTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateWeekTrainingMutation, { data, loading, error }] = useDuplicateWeekTrainingMutation({
 *   variables: {
 *      repetition: // value for 'repetition'
 *      currentWeek: // value for 'currentWeek'
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useDuplicateWeekTrainingMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateWeekTrainingMutation, DuplicateWeekTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateWeekTrainingMutation, DuplicateWeekTrainingMutationVariables>(DuplicateWeekTrainingDocument, options);
      }
export type DuplicateWeekTrainingMutationHookResult = ReturnType<typeof useDuplicateWeekTrainingMutation>;
export type DuplicateWeekTrainingMutationResult = Apollo.MutationResult<DuplicateWeekTrainingMutation>;
export type DuplicateWeekTrainingMutationOptions = Apollo.BaseMutationOptions<DuplicateWeekTrainingMutation, DuplicateWeekTrainingMutationVariables>;
export const GenerateProgramDocument = gql`
    mutation GenerateProgram($startDate: DateTimeISO!, $coachId: String!, $programId: String!, $userIds: [String!]!) {
  generateProgram(
    startDate: $startDate
    coachId: $coachId
    programId: $programId
    userIds: $userIds
  )
}
    `;
export type GenerateProgramMutationFn = Apollo.MutationFunction<GenerateProgramMutation, GenerateProgramMutationVariables>;

/**
 * __useGenerateProgramMutation__
 *
 * To run a mutation, you first call `useGenerateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateProgramMutation, { data, loading, error }] = useGenerateProgramMutation({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      coachId: // value for 'coachId'
 *      programId: // value for 'programId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useGenerateProgramMutation(baseOptions?: Apollo.MutationHookOptions<GenerateProgramMutation, GenerateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateProgramMutation, GenerateProgramMutationVariables>(GenerateProgramDocument, options);
      }
export type GenerateProgramMutationHookResult = ReturnType<typeof useGenerateProgramMutation>;
export type GenerateProgramMutationResult = Apollo.MutationResult<GenerateProgramMutation>;
export type GenerateProgramMutationOptions = Apollo.BaseMutationOptions<GenerateProgramMutation, GenerateProgramMutationVariables>;
export const GenerateSessionProfileDocument = gql`
    mutation GenerateSessionProfile($periodicity: Periodicity!, $id: String!) {
  generateSessionProfile(periodicity: $periodicity, id: $id)
}
    `;
export type GenerateSessionProfileMutationFn = Apollo.MutationFunction<GenerateSessionProfileMutation, GenerateSessionProfileMutationVariables>;

/**
 * __useGenerateSessionProfileMutation__
 *
 * To run a mutation, you first call `useGenerateSessionProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateSessionProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateSessionProfileMutation, { data, loading, error }] = useGenerateSessionProfileMutation({
 *   variables: {
 *      periodicity: // value for 'periodicity'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGenerateSessionProfileMutation(baseOptions?: Apollo.MutationHookOptions<GenerateSessionProfileMutation, GenerateSessionProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateSessionProfileMutation, GenerateSessionProfileMutationVariables>(GenerateSessionProfileDocument, options);
      }
export type GenerateSessionProfileMutationHookResult = ReturnType<typeof useGenerateSessionProfileMutation>;
export type GenerateSessionProfileMutationResult = Apollo.MutationResult<GenerateSessionProfileMutation>;
export type GenerateSessionProfileMutationOptions = Apollo.BaseMutationOptions<GenerateSessionProfileMutation, GenerateSessionProfileMutationVariables>;
export const GenerateUploadUrlDocument = gql`
    mutation GenerateUploadUrl($fileType: String, $fileName: String, $isNew: Boolean) {
  generateUploadUrl(fileType: $fileType, fileName: $fileName, isNew: $isNew) {
    uploadUrl
    fileName
  }
}
    `;
export type GenerateUploadUrlMutationFn = Apollo.MutationFunction<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;

/**
 * __useGenerateUploadUrlMutation__
 *
 * To run a mutation, you first call `useGenerateUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUploadUrlMutation, { data, loading, error }] = useGenerateUploadUrlMutation({
 *   variables: {
 *      fileType: // value for 'fileType'
 *      fileName: // value for 'fileName'
 *      isNew: // value for 'isNew'
 *   },
 * });
 */
export function useGenerateUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>(GenerateUploadUrlDocument, options);
      }
export type GenerateUploadUrlMutationHookResult = ReturnType<typeof useGenerateUploadUrlMutation>;
export type GenerateUploadUrlMutationResult = Apollo.MutationResult<GenerateUploadUrlMutation>;
export type GenerateUploadUrlMutationOptions = Apollo.BaseMutationOptions<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;
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
export const PasteTrainingDocument = gql`
    mutation PasteTraining($day: Float!, $ids: [String!]!) {
  pasteTraining(day: $day, ids: $ids)
}
    `;
export type PasteTrainingMutationFn = Apollo.MutationFunction<PasteTrainingMutation, PasteTrainingMutationVariables>;

/**
 * __usePasteTrainingMutation__
 *
 * To run a mutation, you first call `usePasteTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasteTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pasteTrainingMutation, { data, loading, error }] = usePasteTrainingMutation({
 *   variables: {
 *      day: // value for 'day'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePasteTrainingMutation(baseOptions?: Apollo.MutationHookOptions<PasteTrainingMutation, PasteTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasteTrainingMutation, PasteTrainingMutationVariables>(PasteTrainingDocument, options);
      }
export type PasteTrainingMutationHookResult = ReturnType<typeof usePasteTrainingMutation>;
export type PasteTrainingMutationResult = Apollo.MutationResult<PasteTrainingMutation>;
export type PasteTrainingMutationOptions = Apollo.BaseMutationOptions<PasteTrainingMutation, PasteTrainingMutationVariables>;
export const ReactivateProfileSubscriptionDocument = gql`
    mutation ReactivateProfileSubscription {
  reactivateProfileSubscription
}
    `;
export type ReactivateProfileSubscriptionMutationFn = Apollo.MutationFunction<ReactivateProfileSubscriptionMutation, ReactivateProfileSubscriptionMutationVariables>;

/**
 * __useReactivateProfileSubscriptionMutation__
 *
 * To run a mutation, you first call `useReactivateProfileSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactivateProfileSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactivateProfileSubscriptionMutation, { data, loading, error }] = useReactivateProfileSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useReactivateProfileSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<ReactivateProfileSubscriptionMutation, ReactivateProfileSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactivateProfileSubscriptionMutation, ReactivateProfileSubscriptionMutationVariables>(ReactivateProfileSubscriptionDocument, options);
      }
export type ReactivateProfileSubscriptionMutationHookResult = ReturnType<typeof useReactivateProfileSubscriptionMutation>;
export type ReactivateProfileSubscriptionMutationResult = Apollo.MutationResult<ReactivateProfileSubscriptionMutation>;
export type ReactivateProfileSubscriptionMutationOptions = Apollo.BaseMutationOptions<ReactivateProfileSubscriptionMutation, ReactivateProfileSubscriptionMutationVariables>;
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
export const SubscribeProgramDocument = gql`
    mutation SubscribeProgram($startDate: DateTimeISO!, $coachId: String!, $programId: String!, $politic: Boolean!) {
  subscribeProgram(
    startDate: $startDate
    coachId: $coachId
    programId: $programId
    politic: $politic
  )
}
    `;
export type SubscribeProgramMutationFn = Apollo.MutationFunction<SubscribeProgramMutation, SubscribeProgramMutationVariables>;

/**
 * __useSubscribeProgramMutation__
 *
 * To run a mutation, you first call `useSubscribeProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeProgramMutation, { data, loading, error }] = useSubscribeProgramMutation({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      coachId: // value for 'coachId'
 *      programId: // value for 'programId'
 *      politic: // value for 'politic'
 *   },
 * });
 */
export function useSubscribeProgramMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeProgramMutation, SubscribeProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeProgramMutation, SubscribeProgramMutationVariables>(SubscribeProgramDocument, options);
      }
export type SubscribeProgramMutationHookResult = ReturnType<typeof useSubscribeProgramMutation>;
export type SubscribeProgramMutationResult = Apollo.MutationResult<SubscribeProgramMutation>;
export type SubscribeProgramMutationOptions = Apollo.BaseMutationOptions<SubscribeProgramMutation, SubscribeProgramMutationVariables>;
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
export const UpdateExerciceModelDocument = gql`
    mutation UpdateExerciceModel($data: ExerciceModelData!, $deleteVideo: Boolean, $addVideo: Boolean) {
  updateExerciceModel(data: $data, deleteVideo: $deleteVideo, addVideo: $addVideo)
}
    `;
export type UpdateExerciceModelMutationFn = Apollo.MutationFunction<UpdateExerciceModelMutation, UpdateExerciceModelMutationVariables>;

/**
 * __useUpdateExerciceModelMutation__
 *
 * To run a mutation, you first call `useUpdateExerciceModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciceModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciceModelMutation, { data, loading, error }] = useUpdateExerciceModelMutation({
 *   variables: {
 *      data: // value for 'data'
 *      deleteVideo: // value for 'deleteVideo'
 *      addVideo: // value for 'addVideo'
 *   },
 * });
 */
export function useUpdateExerciceModelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciceModelMutation, UpdateExerciceModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciceModelMutation, UpdateExerciceModelMutationVariables>(UpdateExerciceModelDocument, options);
      }
export type UpdateExerciceModelMutationHookResult = ReturnType<typeof useUpdateExerciceModelMutation>;
export type UpdateExerciceModelMutationResult = Apollo.MutationResult<UpdateExerciceModelMutation>;
export type UpdateExerciceModelMutationOptions = Apollo.BaseMutationOptions<UpdateExerciceModelMutation, UpdateExerciceModelMutationVariables>;
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
export const UpdatePreferenceNotificationDocument = gql`
    mutation UpdatePreferenceNotification($data: [NotificationType!]!) {
  updatePreferenceNotification(data: $data)
}
    `;
export type UpdatePreferenceNotificationMutationFn = Apollo.MutationFunction<UpdatePreferenceNotificationMutation, UpdatePreferenceNotificationMutationVariables>;

/**
 * __useUpdatePreferenceNotificationMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceNotificationMutation, { data, loading, error }] = useUpdatePreferenceNotificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePreferenceNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferenceNotificationMutation, UpdatePreferenceNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferenceNotificationMutation, UpdatePreferenceNotificationMutationVariables>(UpdatePreferenceNotificationDocument, options);
      }
export type UpdatePreferenceNotificationMutationHookResult = ReturnType<typeof useUpdatePreferenceNotificationMutation>;
export type UpdatePreferenceNotificationMutationResult = Apollo.MutationResult<UpdatePreferenceNotificationMutation>;
export type UpdatePreferenceNotificationMutationOptions = Apollo.BaseMutationOptions<UpdatePreferenceNotificationMutation, UpdatePreferenceNotificationMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: UpdateProfile!) {
  updateProfile(data: $data) {
    id
    email
    firstname
    lastname
    sex
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
export const UpdateProgressDocument = gql`
    mutation UpdateProgress($data: progressInput!) {
  updateProgress(data: $data)
}
    `;
export type UpdateProgressMutationFn = Apollo.MutationFunction<UpdateProgressMutation, UpdateProgressMutationVariables>;

/**
 * __useUpdateProgressMutation__
 *
 * To run a mutation, you first call `useUpdateProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProgressMutation, { data, loading, error }] = useUpdateProgressMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProgressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProgressMutation, UpdateProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProgressMutation, UpdateProgressMutationVariables>(UpdateProgressDocument, options);
      }
export type UpdateProgressMutationHookResult = ReturnType<typeof useUpdateProgressMutation>;
export type UpdateProgressMutationResult = Apollo.MutationResult<UpdateProgressMutation>;
export type UpdateProgressMutationOptions = Apollo.BaseMutationOptions<UpdateProgressMutation, UpdateProgressMutationVariables>;
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
export const CancelProfileSubscriptionDocument = gql`
    mutation CancelProfileSubscription {
  cancelProfileSubscription
}
    `;
export type CancelProfileSubscriptionMutationFn = Apollo.MutationFunction<CancelProfileSubscriptionMutation, CancelProfileSubscriptionMutationVariables>;

/**
 * __useCancelProfileSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelProfileSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelProfileSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelProfileSubscriptionMutation, { data, loading, error }] = useCancelProfileSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelProfileSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelProfileSubscriptionMutation, CancelProfileSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelProfileSubscriptionMutation, CancelProfileSubscriptionMutationVariables>(CancelProfileSubscriptionDocument, options);
      }
export type CancelProfileSubscriptionMutationHookResult = ReturnType<typeof useCancelProfileSubscriptionMutation>;
export type CancelProfileSubscriptionMutationResult = Apollo.MutationResult<CancelProfileSubscriptionMutation>;
export type CancelProfileSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelProfileSubscriptionMutation, CancelProfileSubscriptionMutationVariables>;
export const GetPermissionAdminDocument = gql`
    query GetPermissionAdmin {
  getPermissionAdmin {
    id
    key
    description
  }
}
    `;

/**
 * __useGetPermissionAdminQuery__
 *
 * To run a query within a React component, call `useGetPermissionAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPermissionAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPermissionAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>(GetPermissionAdminDocument, options);
      }
export function useGetPermissionAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>(GetPermissionAdminDocument, options);
        }
export function useGetPermissionAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>(GetPermissionAdminDocument, options);
        }
export type GetPermissionAdminQueryHookResult = ReturnType<typeof useGetPermissionAdminQuery>;
export type GetPermissionAdminLazyQueryHookResult = ReturnType<typeof useGetPermissionAdminLazyQuery>;
export type GetPermissionAdminSuspenseQueryHookResult = ReturnType<typeof useGetPermissionAdminSuspenseQuery>;
export type GetPermissionAdminQueryResult = Apollo.QueryResult<GetPermissionAdminQuery, GetPermissionAdminQueryVariables>;
export const GetProfileAdminDocument = gql`
    query GetProfileAdmin {
  getProfileAdmin {
    id
    name
    permissions {
      id
      key
      description
    }
  }
}
    `;

/**
 * __useGetProfileAdminQuery__
 *
 * To run a query within a React component, call `useGetProfileAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileAdminQuery, GetProfileAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileAdminQuery, GetProfileAdminQueryVariables>(GetProfileAdminDocument, options);
      }
export function useGetProfileAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileAdminQuery, GetProfileAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileAdminQuery, GetProfileAdminQueryVariables>(GetProfileAdminDocument, options);
        }
export function useGetProfileAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProfileAdminQuery, GetProfileAdminQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileAdminQuery, GetProfileAdminQueryVariables>(GetProfileAdminDocument, options);
        }
export type GetProfileAdminQueryHookResult = ReturnType<typeof useGetProfileAdminQuery>;
export type GetProfileAdminLazyQueryHookResult = ReturnType<typeof useGetProfileAdminLazyQuery>;
export type GetProfileAdminSuspenseQueryHookResult = ReturnType<typeof useGetProfileAdminSuspenseQuery>;
export type GetProfileAdminQueryResult = Apollo.QueryResult<GetProfileAdminQuery, GetProfileAdminQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    email
    firstname
    lastname
    roles
    avatar
    sex
    coach {
      firstname
      lastname
      email
      avatar
      id
    }
    profile {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
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
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  getCoachProfile {
    id
    name
    description
    specialisation
    stripeAccountId
    chargesEnabled
    payoutsEnabled
    detailsSubmitted
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
export const GetStudentsDocument = gql`
    query getStudents($input: String, $id: String!, $crewId: String, $offerId: String, $sortRemaining: Boolean, $status: String, $page: Float, $limit: Float) {
  getStudents(
    input: $input
    id: $id
    crewId: $crewId
    offerId: $offerId
    sortRemaining: $sortRemaining
    status: $status
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
 *      status: // value for 'status'
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
export const GetAllExercicesModelDocument = gql`
    query GetAllExercicesModel($input: String, $id: String, $getFavorite: Boolean, $muscles: [String!]) {
  getAllExercicesModel(
    input: $input
    id: $id
    getFavorite: $getFavorite
    muscles: $muscles
  ) {
    id
    title
    image
    description
    image
    videoType
    video
    user {
      id
    }
    muscles {
      id
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
 *      input: // value for 'input'
 *      id: // value for 'id'
 *      getFavorite: // value for 'getFavorite'
 *      muscles: // value for 'muscles'
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
export const GetExerciceInfoDocument = gql`
    query GetExerciceInfo($id: String!) {
  getExerciceInfo(id: $id) {
    link
    description
    title
    muscles {
      id
      label
    }
  }
}
    `;

/**
 * __useGetExerciceInfoQuery__
 *
 * To run a query within a React component, call `useGetExerciceInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciceInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciceInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExerciceInfoQuery(baseOptions: Apollo.QueryHookOptions<GetExerciceInfoQuery, GetExerciceInfoQueryVariables> & ({ variables: GetExerciceInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>(GetExerciceInfoDocument, options);
      }
export function useGetExerciceInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>(GetExerciceInfoDocument, options);
        }
export function useGetExerciceInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>(GetExerciceInfoDocument, options);
        }
export type GetExerciceInfoQueryHookResult = ReturnType<typeof useGetExerciceInfoQuery>;
export type GetExerciceInfoLazyQueryHookResult = ReturnType<typeof useGetExerciceInfoLazyQuery>;
export type GetExerciceInfoSuspenseQueryHookResult = ReturnType<typeof useGetExerciceInfoSuspenseQuery>;
export type GetExerciceInfoQueryResult = Apollo.QueryResult<GetExerciceInfoQuery, GetExerciceInfoQueryVariables>;
export const GetFavoriteExercicesIdDocument = gql`
    query GetFavoriteExercicesId {
  getFavoriteExercicesId
}
    `;

/**
 * __useGetFavoriteExercicesIdQuery__
 *
 * To run a query within a React component, call `useGetFavoriteExercicesIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoriteExercicesIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoriteExercicesIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavoriteExercicesIdQuery(baseOptions?: Apollo.QueryHookOptions<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>(GetFavoriteExercicesIdDocument, options);
      }
export function useGetFavoriteExercicesIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>(GetFavoriteExercicesIdDocument, options);
        }
export function useGetFavoriteExercicesIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>(GetFavoriteExercicesIdDocument, options);
        }
export type GetFavoriteExercicesIdQueryHookResult = ReturnType<typeof useGetFavoriteExercicesIdQuery>;
export type GetFavoriteExercicesIdLazyQueryHookResult = ReturnType<typeof useGetFavoriteExercicesIdLazyQuery>;
export type GetFavoriteExercicesIdSuspenseQueryHookResult = ReturnType<typeof useGetFavoriteExercicesIdSuspenseQuery>;
export type GetFavoriteExercicesIdQueryResult = Apollo.QueryResult<GetFavoriteExercicesIdQuery, GetFavoriteExercicesIdQueryVariables>;
export const GetOneExericeModelDocument = gql`
    query GetOneExericeModel($id: String!) {
  getOneExericeModel(id: $id) {
    id
    title
    image
    description
    muscles {
      id
    }
  }
}
    `;

/**
 * __useGetOneExericeModelQuery__
 *
 * To run a query within a React component, call `useGetOneExericeModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneExericeModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneExericeModelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneExericeModelQuery(baseOptions: Apollo.QueryHookOptions<GetOneExericeModelQuery, GetOneExericeModelQueryVariables> & ({ variables: GetOneExericeModelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>(GetOneExericeModelDocument, options);
      }
export function useGetOneExericeModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>(GetOneExericeModelDocument, options);
        }
export function useGetOneExericeModelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>(GetOneExericeModelDocument, options);
        }
export type GetOneExericeModelQueryHookResult = ReturnType<typeof useGetOneExericeModelQuery>;
export type GetOneExericeModelLazyQueryHookResult = ReturnType<typeof useGetOneExericeModelLazyQuery>;
export type GetOneExericeModelSuspenseQueryHookResult = ReturnType<typeof useGetOneExericeModelSuspenseQuery>;
export type GetOneExericeModelQueryResult = Apollo.QueryResult<GetOneExericeModelQuery, GetOneExericeModelQueryVariables>;
export const GetFeedbacksDocument = gql`
    query GetFeedbacks($id: String!, $rangeDate: RangeDate!) {
  getFeedbacks(id: $id, rangeDate: $rangeDate) {
    id
    intensity
    feeling
    satisfaction
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
export const GetStudentFeedbackDocument = gql`
    query GetStudentFeedback($id: String!, $rangeDate: RangeDate!) {
  getStudentFeedback(id: $id, rangeDate: $rangeDate) {
    id
    title
    intensity
    feeling
    satisfaction
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
export const GetMeDocument = gql`
    query GetMe {
  GetMe
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMyMembershipDocument = gql`
    query GetMyMembership {
  getMembership {
    id
    startDate
    endDate
    isActive
    offer {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetMyMembershipQuery__
 *
 * To run a query within a React component, call `useGetMyMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMembershipQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyMembershipQuery(baseOptions?: Apollo.QueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMembershipQuery, GetMyMembershipQueryVariables>(GetMyMembershipDocument, options);
      }
export function useGetMyMembershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMembershipQuery, GetMyMembershipQueryVariables>(GetMyMembershipDocument, options);
        }
export function useGetMyMembershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyMembershipQuery, GetMyMembershipQueryVariables>(GetMyMembershipDocument, options);
        }
export type GetMyMembershipQueryHookResult = ReturnType<typeof useGetMyMembershipQuery>;
export type GetMyMembershipLazyQueryHookResult = ReturnType<typeof useGetMyMembershipLazyQuery>;
export type GetMyMembershipSuspenseQueryHookResult = ReturnType<typeof useGetMyMembershipSuspenseQuery>;
export type GetMyMembershipQueryResult = Apollo.QueryResult<GetMyMembershipQuery, GetMyMembershipQueryVariables>;
export const GetProgressDocument = gql`
    query GetProgress {
  getProgress {
    id
    profile
    training
    program
    offer
    searchCoach
    searchProgram
    createConnect
  }
}
    `;

/**
 * __useGetProgressQuery__
 *
 * To run a query within a React component, call `useGetProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProgressQuery(baseOptions?: Apollo.QueryHookOptions<GetProgressQuery, GetProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProgressQuery, GetProgressQueryVariables>(GetProgressDocument, options);
      }
export function useGetProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgressQuery, GetProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProgressQuery, GetProgressQueryVariables>(GetProgressDocument, options);
        }
export function useGetProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProgressQuery, GetProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProgressQuery, GetProgressQueryVariables>(GetProgressDocument, options);
        }
export type GetProgressQueryHookResult = ReturnType<typeof useGetProgressQuery>;
export type GetProgressLazyQueryHookResult = ReturnType<typeof useGetProgressLazyQuery>;
export type GetProgressSuspenseQueryHookResult = ReturnType<typeof useGetProgressSuspenseQuery>;
export type GetProgressQueryResult = Apollo.QueryResult<GetProgressQuery, GetProgressQueryVariables>;
export const GetInvoicesDocument = gql`
    query GetInvoices {
  getInvoices {
    id
    status
    amountPaid
    currency
    invoicePdf
    hostedInvoicePdf
    paidAt
    nextPaymentAt
    profileSubscription {
      profile {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetInvoicesQuery__
 *
 * To run a query within a React component, call `useGetInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvoicesQuery(baseOptions?: Apollo.QueryHookOptions<GetInvoicesQuery, GetInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(GetInvoicesDocument, options);
      }
export function useGetInvoicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoicesQuery, GetInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(GetInvoicesDocument, options);
        }
export function useGetInvoicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInvoicesQuery, GetInvoicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(GetInvoicesDocument, options);
        }
export type GetInvoicesQueryHookResult = ReturnType<typeof useGetInvoicesQuery>;
export type GetInvoicesLazyQueryHookResult = ReturnType<typeof useGetInvoicesLazyQuery>;
export type GetInvoicesSuspenseQueryHookResult = ReturnType<typeof useGetInvoicesSuspenseQuery>;
export type GetInvoicesQueryResult = Apollo.QueryResult<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetAllMuscleGroupDocument = gql`
    query GetAllMuscleGroup {
  getAllMuscleGroup {
    id
    key
    label
  }
}
    `;

/**
 * __useGetAllMuscleGroupQuery__
 *
 * To run a query within a React component, call `useGetAllMuscleGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMuscleGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMuscleGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMuscleGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>(GetAllMuscleGroupDocument, options);
      }
export function useGetAllMuscleGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>(GetAllMuscleGroupDocument, options);
        }
export function useGetAllMuscleGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>(GetAllMuscleGroupDocument, options);
        }
export type GetAllMuscleGroupQueryHookResult = ReturnType<typeof useGetAllMuscleGroupQuery>;
export type GetAllMuscleGroupLazyQueryHookResult = ReturnType<typeof useGetAllMuscleGroupLazyQuery>;
export type GetAllMuscleGroupSuspenseQueryHookResult = ReturnType<typeof useGetAllMuscleGroupSuspenseQuery>;
export type GetAllMuscleGroupQueryResult = Apollo.QueryResult<GetAllMuscleGroupQuery, GetAllMuscleGroupQueryVariables>;
export const GetNotificationDocument = gql`
    query GetNotification($unread: Boolean!, $group: String) {
  getNotification(unread: $unread, group: $group) {
    totalUnread
    total
    notifications {
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
      feedback {
        title
        id
        comment
        user {
          id
          firstname
          lastname
          email
          avatar
        }
      }
      membership {
        id
        student {
          id
          email
          firstname
          lastname
          avatar
        }
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
 *      unread: // value for 'unread'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useGetNotificationQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables> & ({ variables: GetNotificationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const GetPreferenceNotificationDocument = gql`
    query GetPreferenceNotification {
  getPreferenceNotification {
    id
    disabledTypes
  }
}
    `;

/**
 * __useGetPreferenceNotificationQuery__
 *
 * To run a query within a React component, call `useGetPreferenceNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreferenceNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreferenceNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPreferenceNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>(GetPreferenceNotificationDocument, options);
      }
export function useGetPreferenceNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>(GetPreferenceNotificationDocument, options);
        }
export function useGetPreferenceNotificationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>(GetPreferenceNotificationDocument, options);
        }
export type GetPreferenceNotificationQueryHookResult = ReturnType<typeof useGetPreferenceNotificationQuery>;
export type GetPreferenceNotificationLazyQueryHookResult = ReturnType<typeof useGetPreferenceNotificationLazyQuery>;
export type GetPreferenceNotificationSuspenseQueryHookResult = ReturnType<typeof useGetPreferenceNotificationSuspenseQuery>;
export type GetPreferenceNotificationQueryResult = Apollo.QueryResult<GetPreferenceNotificationQuery, GetPreferenceNotificationQueryVariables>;
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
export const GetMyOffersDocument = gql`
    query GetMyOffers($status: OfferStatus) {
  getCoachOffers(status: $status) {
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
 *      status: // value for 'status'
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
      avatar
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
export const GetCurrentProfileSubscriptionDocument = gql`
    query GetCurrentProfileSubscription {
  getCurrentProfileSubscription {
    id
    status
    currentPeriodEnd
  }
}
    `;

/**
 * __useGetCurrentProfileSubscriptionQuery__
 *
 * To run a query within a React component, call `useGetCurrentProfileSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentProfileSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentProfileSubscriptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentProfileSubscriptionQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>(GetCurrentProfileSubscriptionDocument, options);
      }
export function useGetCurrentProfileSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>(GetCurrentProfileSubscriptionDocument, options);
        }
export function useGetCurrentProfileSubscriptionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>(GetCurrentProfileSubscriptionDocument, options);
        }
export type GetCurrentProfileSubscriptionQueryHookResult = ReturnType<typeof useGetCurrentProfileSubscriptionQuery>;
export type GetCurrentProfileSubscriptionLazyQueryHookResult = ReturnType<typeof useGetCurrentProfileSubscriptionLazyQuery>;
export type GetCurrentProfileSubscriptionSuspenseQueryHookResult = ReturnType<typeof useGetCurrentProfileSubscriptionSuspenseQuery>;
export type GetCurrentProfileSubscriptionQueryResult = Apollo.QueryResult<GetCurrentProfileSubscriptionQuery, GetCurrentProfileSubscriptionQueryVariables>;
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
    category {
      id
      label
    }
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
export const GetOneProgramMarketPlaceDocument = gql`
    query GetOneProgramMarketPlace($id: String!) {
  getOneProgramMarketPlace(id: $id) {
    program {
      id
      title
      description
      duration
      price
      level
      category {
        label
        id
      }
      coach {
        id
        email
        firstname
        lastname
        avatar
        coachProfile {
          specialisation
          name
        }
      }
    }
    trainingsCount
  }
}
    `;

/**
 * __useGetOneProgramMarketPlaceQuery__
 *
 * To run a query within a React component, call `useGetOneProgramMarketPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneProgramMarketPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneProgramMarketPlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneProgramMarketPlaceQuery(baseOptions: Apollo.QueryHookOptions<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables> & ({ variables: GetOneProgramMarketPlaceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>(GetOneProgramMarketPlaceDocument, options);
      }
export function useGetOneProgramMarketPlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>(GetOneProgramMarketPlaceDocument, options);
        }
export function useGetOneProgramMarketPlaceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>(GetOneProgramMarketPlaceDocument, options);
        }
export type GetOneProgramMarketPlaceQueryHookResult = ReturnType<typeof useGetOneProgramMarketPlaceQuery>;
export type GetOneProgramMarketPlaceLazyQueryHookResult = ReturnType<typeof useGetOneProgramMarketPlaceLazyQuery>;
export type GetOneProgramMarketPlaceSuspenseQueryHookResult = ReturnType<typeof useGetOneProgramMarketPlaceSuspenseQuery>;
export type GetOneProgramMarketPlaceQueryResult = Apollo.QueryResult<GetOneProgramMarketPlaceQuery, GetOneProgramMarketPlaceQueryVariables>;
export const GetProgramsMarketPlaceDocument = gql`
    query GetProgramsMarketPlace {
  getProgramsMarketPlace {
    id
    title
    duration
    price
    level
    category {
      id
      label
    }
    coach {
      id
      email
      firstname
      lastname
      avatar
    }
  }
}
    `;

/**
 * __useGetProgramsMarketPlaceQuery__
 *
 * To run a query within a React component, call `useGetProgramsMarketPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgramsMarketPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgramsMarketPlaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProgramsMarketPlaceQuery(baseOptions?: Apollo.QueryHookOptions<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>(GetProgramsMarketPlaceDocument, options);
      }
export function useGetProgramsMarketPlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>(GetProgramsMarketPlaceDocument, options);
        }
export function useGetProgramsMarketPlaceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>(GetProgramsMarketPlaceDocument, options);
        }
export type GetProgramsMarketPlaceQueryHookResult = ReturnType<typeof useGetProgramsMarketPlaceQuery>;
export type GetProgramsMarketPlaceLazyQueryHookResult = ReturnType<typeof useGetProgramsMarketPlaceLazyQuery>;
export type GetProgramsMarketPlaceSuspenseQueryHookResult = ReturnType<typeof useGetProgramsMarketPlaceSuspenseQuery>;
export type GetProgramsMarketPlaceQueryResult = Apollo.QueryResult<GetProgramsMarketPlaceQuery, GetProgramsMarketPlaceQueryVariables>;
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
      tempo
      repFormat
      weightFormat
      intensityFormat
      position
      exerciceModel {
        id
        image
      }
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
export const GetUserProgramsDocument = gql`
    query GetUserPrograms {
  getUserPrograms {
    id
    price
    commissionRate
    createdAt
    startDate
    paidAt
    status
    receip
    user {
      id
      email
      firstname
      lastname
      avatar
    }
    coach {
      id
      email
      firstname
      lastname
      avatar
    }
    program {
      id
      title
    }
  }
}
    `;

/**
 * __useGetUserProgramsQuery__
 *
 * To run a query within a React component, call `useGetUserProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProgramsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProgramsQuery, GetUserProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProgramsQuery, GetUserProgramsQueryVariables>(GetUserProgramsDocument, options);
      }
export function useGetUserProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProgramsQuery, GetUserProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProgramsQuery, GetUserProgramsQueryVariables>(GetUserProgramsDocument, options);
        }
export function useGetUserProgramsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProgramsQuery, GetUserProgramsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProgramsQuery, GetUserProgramsQueryVariables>(GetUserProgramsDocument, options);
        }
export type GetUserProgramsQueryHookResult = ReturnType<typeof useGetUserProgramsQuery>;
export type GetUserProgramsLazyQueryHookResult = ReturnType<typeof useGetUserProgramsLazyQuery>;
export type GetUserProgramsSuspenseQueryHookResult = ReturnType<typeof useGetUserProgramsSuspenseQuery>;
export type GetUserProgramsQueryResult = Apollo.QueryResult<GetUserProgramsQuery, GetUserProgramsQueryVariables>;
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
export const GetTotalRequestsDocument = gql`
    query GetTotalRequests {
  getTotalRequests
}
    `;

/**
 * __useGetTotalRequestsQuery__
 *
 * To run a query within a React component, call `useGetTotalRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>(GetTotalRequestsDocument, options);
      }
export function useGetTotalRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>(GetTotalRequestsDocument, options);
        }
export function useGetTotalRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>(GetTotalRequestsDocument, options);
        }
export type GetTotalRequestsQueryHookResult = ReturnType<typeof useGetTotalRequestsQuery>;
export type GetTotalRequestsLazyQueryHookResult = ReturnType<typeof useGetTotalRequestsLazyQuery>;
export type GetTotalRequestsSuspenseQueryHookResult = ReturnType<typeof useGetTotalRequestsSuspenseQuery>;
export type GetTotalRequestsQueryResult = Apollo.QueryResult<GetTotalRequestsQuery, GetTotalRequestsQueryVariables>;
export const GetConnectUrlDocument = gql`
    query GetConnectUrl {
  getConnectUrl
}
    `;

/**
 * __useGetConnectUrlQuery__
 *
 * To run a query within a React component, call `useGetConnectUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConnectUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetConnectUrlQuery, GetConnectUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectUrlQuery, GetConnectUrlQueryVariables>(GetConnectUrlDocument, options);
      }
export function useGetConnectUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectUrlQuery, GetConnectUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectUrlQuery, GetConnectUrlQueryVariables>(GetConnectUrlDocument, options);
        }
export function useGetConnectUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConnectUrlQuery, GetConnectUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConnectUrlQuery, GetConnectUrlQueryVariables>(GetConnectUrlDocument, options);
        }
export type GetConnectUrlQueryHookResult = ReturnType<typeof useGetConnectUrlQuery>;
export type GetConnectUrlLazyQueryHookResult = ReturnType<typeof useGetConnectUrlLazyQuery>;
export type GetConnectUrlSuspenseQueryHookResult = ReturnType<typeof useGetConnectUrlSuspenseQuery>;
export type GetConnectUrlQueryResult = Apollo.QueryResult<GetConnectUrlQuery, GetConnectUrlQueryVariables>;
export const GetProfilePricingDocument = gql`
    query GetProfilePricing {
  getProfilePricing {
    id
    name
    monthlyAmount
    yearlyAmount
  }
}
    `;

/**
 * __useGetProfilePricingQuery__
 *
 * To run a query within a React component, call `useGetProfilePricingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePricingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePricingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfilePricingQuery(baseOptions?: Apollo.QueryHookOptions<GetProfilePricingQuery, GetProfilePricingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilePricingQuery, GetProfilePricingQueryVariables>(GetProfilePricingDocument, options);
      }
export function useGetProfilePricingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilePricingQuery, GetProfilePricingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilePricingQuery, GetProfilePricingQueryVariables>(GetProfilePricingDocument, options);
        }
export function useGetProfilePricingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProfilePricingQuery, GetProfilePricingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfilePricingQuery, GetProfilePricingQueryVariables>(GetProfilePricingDocument, options);
        }
export type GetProfilePricingQueryHookResult = ReturnType<typeof useGetProfilePricingQuery>;
export type GetProfilePricingLazyQueryHookResult = ReturnType<typeof useGetProfilePricingLazyQuery>;
export type GetProfilePricingSuspenseQueryHookResult = ReturnType<typeof useGetProfilePricingSuspenseQuery>;
export type GetProfilePricingQueryResult = Apollo.QueryResult<GetProfilePricingQuery, GetProfilePricingQueryVariables>;
export const GetPortailStripDocument = gql`
    query GetPortailStrip {
  getPortailStrip
}
    `;

/**
 * __useGetPortailStripQuery__
 *
 * To run a query within a React component, call `useGetPortailStripQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPortailStripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPortailStripQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPortailStripQuery(baseOptions?: Apollo.QueryHookOptions<GetPortailStripQuery, GetPortailStripQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPortailStripQuery, GetPortailStripQueryVariables>(GetPortailStripDocument, options);
      }
export function useGetPortailStripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPortailStripQuery, GetPortailStripQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPortailStripQuery, GetPortailStripQueryVariables>(GetPortailStripDocument, options);
        }
export function useGetPortailStripSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPortailStripQuery, GetPortailStripQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPortailStripQuery, GetPortailStripQueryVariables>(GetPortailStripDocument, options);
        }
export type GetPortailStripQueryHookResult = ReturnType<typeof useGetPortailStripQuery>;
export type GetPortailStripLazyQueryHookResult = ReturnType<typeof useGetPortailStripLazyQuery>;
export type GetPortailStripSuspenseQueryHookResult = ReturnType<typeof useGetPortailStripSuspenseQuery>;
export type GetPortailStripQueryResult = Apollo.QueryResult<GetPortailStripQuery, GetPortailStripQueryVariables>;
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
export const GetMyCoachDocument = gql`
    query GetMyCoach {
  getMyCoach {
    id
    email
    firstname
    lastname
    avatar
  }
}
    `;

/**
 * __useGetMyCoachQuery__
 *
 * To run a query within a React component, call `useGetMyCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCoachQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCoachQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCoachQuery, GetMyCoachQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCoachQuery, GetMyCoachQueryVariables>(GetMyCoachDocument, options);
      }
export function useGetMyCoachLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCoachQuery, GetMyCoachQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCoachQuery, GetMyCoachQueryVariables>(GetMyCoachDocument, options);
        }
export function useGetMyCoachSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyCoachQuery, GetMyCoachQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyCoachQuery, GetMyCoachQueryVariables>(GetMyCoachDocument, options);
        }
export type GetMyCoachQueryHookResult = ReturnType<typeof useGetMyCoachQuery>;
export type GetMyCoachLazyQueryHookResult = ReturnType<typeof useGetMyCoachLazyQuery>;
export type GetMyCoachSuspenseQueryHookResult = ReturnType<typeof useGetMyCoachSuspenseQuery>;
export type GetMyCoachQueryResult = Apollo.QueryResult<GetMyCoachQuery, GetMyCoachQueryVariables>;
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
    exercices {
      title
      id
      serie
      rep
      intensity
      weight
      tempo
      repFormat
      weightFormat
      intensityFormat
      notes
      position
      exerciceModel {
        id
        image
        title
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
      tempo
      repFormat
      weightFormat
      intensityFormat
      notes
      position
      exerciceModel {
        id
        image
        title
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
    exercices {
      title
      id
      serie
      rep
      intensity
      weight
      tempo
      repFormat
      weightFormat
      intensityFormat
      notes
      position
      exerciceModel {
        id
        image
        title
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
    feedback {
      title
      id
      comment
      user {
        id
        firstname
        lastname
        email
        avatar
      }
    }
    membership {
      id
      student {
        id
        email
        firstname
        lastname
        avatar
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