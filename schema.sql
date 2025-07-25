Commande: pg_dump -U $POSTGRES_USER -d $POSTGRES_DB --schema-only > schema.sql

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: exercice_info_videotype_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_info_videotype_enum AS ENUM (
    'YOUTUBE',
    'PERSO'
);


ALTER TYPE public.exercice_info_videotype_enum OWNER TO database;

--
-- Name: exercice_intensityformat_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_intensityformat_enum AS ENUM (
    'RPE',
    'RIR'
);


ALTER TYPE public.exercice_intensityformat_enum OWNER TO database;

--
-- Name: exercice_model_videotype_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_model_videotype_enum AS ENUM (
    'YOUTUBE',
    'PERSO'
);


ALTER TYPE public.exercice_model_videotype_enum OWNER TO database;

--
-- Name: exercice_repformat_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_repformat_enum AS ENUM (
    'STANDARD',
    'AMRAP',
    'TIME',
    'EMOM',
    'E2MOM'
);


ALTER TYPE public.exercice_repformat_enum OWNER TO database;

--
-- Name: exercice_video_videotype_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_video_videotype_enum AS ENUM (
    'YOUTUBE',
    'PERSO'
);


ALTER TYPE public.exercice_video_videotype_enum OWNER TO database;

--
-- Name: exercice_weightformat_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.exercice_weightformat_enum AS ENUM (
    'KG',
    'LBS',
    'PERCENTAGE',
    'BODYWEIGHT',
    'CHOICE'
);


ALTER TYPE public.exercice_weightformat_enum OWNER TO database;

--
-- Name: invoice_status_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.invoice_status_enum AS ENUM (
    'paid',
    'open',
    'void',
    'uncollectible'
);


ALTER TYPE public.invoice_status_enum OWNER TO database;

--
-- Name: notification_group_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.notification_group_enum AS ENUM (
    'TRAINING',
    'FOLLOW',
    'REQUEST'
);


ALTER TYPE public.notification_group_enum OWNER TO database;

--
-- Name: notification_type_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.notification_type_enum AS ENUM (
    'NEW_REQUEST',
    'ACCEPT_REQUEST',
    'NEW_FEEDBACK',
    'NEW_TRAINING',
    'ACTIVATE_MEMBERSHIP',
    'CANCEL_MEMBERSHIP'
);


ALTER TYPE public.notification_type_enum OWNER TO database;

--
-- Name: profile_subscription_periodicity_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.profile_subscription_periodicity_enum AS ENUM (
    'monthly',
    'yearly'
);


ALTER TYPE public.profile_subscription_periodicity_enum OWNER TO database;

--
-- Name: profile_subscription_status_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.profile_subscription_status_enum AS ENUM (
    'active',
    'canceled',
    'first_paid',
    'past_due',
    'incomplete',
    'incomplete_expired',
    'unpaid'
);


ALTER TYPE public.profile_subscription_status_enum OWNER TO database;

--
-- Name: profile_type_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.profile_type_enum AS ENUM (
    'STUDENT',
    'COACH',
    'ADMIN'
);


ALTER TYPE public.profile_type_enum OWNER TO database;

--
-- Name: program_level_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.program_level_enum AS ENUM (
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED'
);


ALTER TYPE public.program_level_enum OWNER TO database;

--
-- Name: program_status_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.program_status_enum AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public.program_status_enum OWNER TO database;

--
-- Name: user_program_status_enum; Type: TYPE; Schema: public; Owner: database
--

CREATE TYPE public.user_program_status_enum AS ENUM (
    'pending_payment',
    'paid',
    'completed',
    'expired'
);


ALTER TYPE public.user_program_status_enum OWNER TO database;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coach_profile; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.coach_profile (
    id integer NOT NULL,
    description character varying,
    "userId" integer,
    specialisation text[],
    facebook character varying,
    instagram character varying,
    linkedin character varying,
    name character varying
);


ALTER TABLE public.coach_profile OWNER TO database;

--
-- Name: coach_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.coach_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_profile_id_seq OWNER TO database;

--
-- Name: coach_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.coach_profile_id_seq OWNED BY public.coach_profile.id;


--
-- Name: conversation; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.conversation (
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.conversation OWNER TO database;

--
-- Name: conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversation_id_seq OWNER TO database;

--
-- Name: conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.conversation_id_seq OWNED BY public.conversation.id;


--
-- Name: conversation_participants_user; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.conversation_participants_user (
    "userId" integer NOT NULL,
    "conversationId" integer NOT NULL
);


ALTER TABLE public.conversation_participants_user OWNER TO database;

--
-- Name: crew; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.crew (
    id integer NOT NULL,
    name character varying NOT NULL,
    "coachId" integer
);


ALTER TABLE public.crew OWNER TO database;

--
-- Name: crew_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.crew_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crew_id_seq OWNER TO database;

--
-- Name: crew_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.crew_id_seq OWNED BY public.crew.id;


--
-- Name: exercice; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.exercice (
    id integer NOT NULL,
    title character varying NOT NULL,
    serie integer,
    rep integer,
    intensity integer,
    weight integer,
    "trainingId" integer,
    notes character varying,
    "trainingPlanId" integer,
    "position" integer,
    "intensityFormat" public.exercice_intensityformat_enum DEFAULT 'RPE'::public.exercice_intensityformat_enum,
    "weightFormat" public.exercice_weightformat_enum DEFAULT 'KG'::public.exercice_weightformat_enum,
    "repFormat" public.exercice_repformat_enum DEFAULT 'STANDARD'::public.exercice_repformat_enum,
    tempo integer,
    "exerciceModelId" integer
);


ALTER TABLE public.exercice OWNER TO database;

--
-- Name: exercice_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.exercice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercice_id_seq OWNER TO database;

--
-- Name: exercice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.exercice_id_seq OWNED BY public.exercice.id;


--
-- Name: exercice_info; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.exercice_info (
    id integer NOT NULL,
    description character varying,
    image character varying,
    "videoType" public.exercice_info_videotype_enum,
    video character varying,
    "exerciceModelId" integer,
    "exerciceId" integer
);


ALTER TABLE public.exercice_info OWNER TO database;

--
-- Name: exercice_info_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.exercice_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercice_info_id_seq OWNER TO database;

--
-- Name: exercice_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.exercice_info_id_seq OWNED BY public.exercice_info.id;


--
-- Name: exercice_model; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.exercice_model (
    id integer NOT NULL,
    title character varying NOT NULL,
    "userId" integer,
    "primaryMuscleId" integer,
    "secondaryMuscleId" integer,
    description character varying,
    "videoType" public.exercice_model_videotype_enum,
    image character varying,
    video character varying
);


ALTER TABLE public.exercice_model OWNER TO database;

--
-- Name: exercice_model_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.exercice_model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercice_model_id_seq OWNER TO database;

--
-- Name: exercice_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.exercice_model_id_seq OWNED BY public.exercice_model.id;


--
-- Name: exercice_model_muscles_muscle_group; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.exercice_model_muscles_muscle_group (
    "exerciceModelId" integer NOT NULL,
    "muscleGroupId" integer NOT NULL
);


ALTER TABLE public.exercice_model_muscles_muscle_group OWNER TO database;

--
-- Name: exercice_video; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.exercice_video (
    id integer NOT NULL,
    description character varying,
    "videoType" public.exercice_video_videotype_enum,
    video character varying,
    "exerciceModelId" integer,
    "exerciceId" integer,
    "userId" integer
);


ALTER TABLE public.exercice_video OWNER TO database;

--
-- Name: exercice_video_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.exercice_video_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercice_video_id_seq OWNER TO database;

--
-- Name: exercice_video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.exercice_video_id_seq OWNED BY public.exercice_video.id;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    comment character varying,
    "trainingId" integer,
    intensity integer NOT NULL,
    feeling integer NOT NULL,
    title character varying NOT NULL,
    date timestamp without time zone NOT NULL,
    "userId" integer,
    satisfaction integer DEFAULT 7
);


ALTER TABLE public.feedback OWNER TO database;

--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedback_id_seq OWNER TO database;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- Name: invoice; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.invoice (
    id integer NOT NULL,
    "stripeInvoiceId" character varying NOT NULL,
    status public.invoice_status_enum NOT NULL,
    "amountPaid" integer NOT NULL,
    currency character varying NOT NULL,
    "invoicePdf" character varying NOT NULL,
    "paidAt" timestamp with time zone NOT NULL,
    "nextPaymentAt" timestamp with time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "profileSubscriptionId" integer
);


ALTER TABLE public.invoice OWNER TO database;

--
-- Name: invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.invoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoice_id_seq OWNER TO database;

--
-- Name: invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.id;


--
-- Name: membership; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.membership (
    id integer NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "studentId" integer,
    "offerId" integer,
    "endDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.membership OWNER TO database;

--
-- Name: membership_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.membership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membership_id_seq OWNER TO database;

--
-- Name: membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.membership_id_seq OWNED BY public.membership.id;


--
-- Name: message; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.message (
    content character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "senderId" integer,
    "receiverId" integer,
    id integer NOT NULL,
    "conversationId" integer,
    "readAt" timestamp without time zone,
    "repliedMessageId" integer
);


ALTER TABLE public.message OWNER TO database;

--
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.message_id_seq OWNER TO database;

--
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- Name: muscle_group; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.muscle_group (
    id integer NOT NULL,
    key character varying NOT NULL,
    label character varying NOT NULL
);


ALTER TABLE public.muscle_group OWNER TO database;

--
-- Name: muscle_group_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.muscle_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.muscle_group_id_seq OWNER TO database;

--
-- Name: muscle_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.muscle_group_id_seq OWNED BY public.muscle_group.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    "hasBeenSeen" boolean DEFAULT false NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "requestId" integer,
    type public.notification_type_enum NOT NULL,
    "feedbackId" integer,
    "group" public.notification_group_enum NOT NULL,
    "membershipId" integer
);


ALTER TABLE public.notification OWNER TO database;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_id_seq OWNER TO database;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: notification_preference; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.notification_preference (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "disabledTypes" jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.notification_preference OWNER TO database;

--
-- Name: notification_preference_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.notification_preference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_preference_id_seq OWNER TO database;

--
-- Name: notification_preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.notification_preference_id_seq OWNED BY public.notification_preference.id;


--
-- Name: offer; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.offer (
    id integer NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL,
    description character varying NOT NULL,
    availability boolean NOT NULL,
    "categoryId" integer,
    "userId" integer,
    durability integer NOT NULL,
    "crewId" integer
);


ALTER TABLE public.offer OWNER TO database;

--
-- Name: offer_category; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.offer_category (
    id integer NOT NULL,
    label character varying NOT NULL
);


ALTER TABLE public.offer_category OWNER TO database;

--
-- Name: offer_category_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.offer_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_category_id_seq OWNER TO database;

--
-- Name: offer_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.offer_category_id_seq OWNED BY public.offer_category.id;


--
-- Name: offer_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_id_seq OWNER TO database;

--
-- Name: offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.offer_id_seq OWNED BY public.offer.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    key character varying NOT NULL,
    description character varying
);


ALTER TABLE public.permission OWNER TO database;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_id_seq OWNER TO database;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    name character varying NOT NULL,
    "stripeProductId" character varying,
    "stripePriceMonth" character varying,
    "stripePriceYear" character varying,
    type public.profile_type_enum
);


ALTER TABLE public.profile OWNER TO database;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_id_seq OWNER TO database;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- Name: profile_permissions_permission; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.profile_permissions_permission (
    "profileId" integer NOT NULL,
    "permissionId" integer NOT NULL
);


ALTER TABLE public.profile_permissions_permission OWNER TO database;

--
-- Name: profile_subscription; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.profile_subscription (
    id integer NOT NULL,
    "stripeSessionId" character varying,
    status public.profile_subscription_status_enum NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "canceledAt" timestamp with time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "profileId" integer,
    periodicity public.profile_subscription_periodicity_enum NOT NULL,
    "stripeSubscriptionId" character varying,
    "currentPeriodEnd" timestamp with time zone
);


ALTER TABLE public.profile_subscription OWNER TO database;

--
-- Name: profile_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.profile_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_subscription_id_seq OWNER TO database;

--
-- Name: profile_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.profile_subscription_id_seq OWNED BY public.profile_subscription.id;


--
-- Name: program; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.program (
    id integer NOT NULL,
    title character varying NOT NULL,
    "coachId" integer,
    description character varying,
    public boolean DEFAULT false NOT NULL,
    duration integer NOT NULL,
    price integer,
    status public.program_status_enum DEFAULT 'DRAFT'::public.program_status_enum NOT NULL,
    level public.program_level_enum,
    "categoryId" integer
);


ALTER TABLE public.program OWNER TO database;

--
-- Name: program_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_id_seq OWNER TO database;

--
-- Name: program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.program_id_seq OWNED BY public.program.id;


--
-- Name: progress_session; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.progress_session (
    id integer NOT NULL,
    profile boolean DEFAULT false NOT NULL,
    training boolean DEFAULT false NOT NULL,
    program boolean DEFAULT false NOT NULL,
    offer boolean DEFAULT false NOT NULL,
    "searchCoach" boolean DEFAULT false NOT NULL,
    "searchProgram" boolean DEFAULT false NOT NULL,
    "userId" integer
);


ALTER TABLE public.progress_session OWNER TO database;

--
-- Name: progress_session_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.progress_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_session_id_seq OWNER TO database;

--
-- Name: progress_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.progress_session_id_seq OWNED BY public.progress_session.id;


--
-- Name: request; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.request (
    id integer NOT NULL,
    status character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "senderId" integer,
    "receiverId" integer,
    description character varying,
    phone integer,
    "isRead" boolean DEFAULT false NOT NULL,
    "offerId" integer
);


ALTER TABLE public.request OWNER TO database;

--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.request_id_seq OWNER TO database;

--
-- Name: request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.request_id_seq OWNED BY public.request.id;


--
-- Name: training; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.training (
    id integer NOT NULL,
    title character varying NOT NULL,
    date timestamp without time zone NOT NULL,
    "userId" integer,
    notes character varying,
    editable boolean DEFAULT true NOT NULL,
    validate boolean DEFAULT false NOT NULL,
    "createdByCoach" character varying,
    "crewId" integer
);


ALTER TABLE public.training OWNER TO database;

--
-- Name: training_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.training_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.training_id_seq OWNER TO database;

--
-- Name: training_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.training_id_seq OWNED BY public.training.id;


--
-- Name: training_plan; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.training_plan (
    id integer NOT NULL,
    title character varying NOT NULL,
    "dayNumber" integer NOT NULL,
    notes character varying,
    "programId" integer
);


ALTER TABLE public.training_plan OWNER TO database;

--
-- Name: training_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.training_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.training_plan_id_seq OWNER TO database;

--
-- Name: training_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.training_plan_id_seq OWNED BY public.training_plan.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    password character varying NOT NULL,
    "coachId" integer,
    "crewId" integer,
    "studentOfferId" integer,
    avatar character varying,
    sex character varying,
    roles jsonb DEFAULT '[]'::jsonb NOT NULL,
    "profileId" integer,
    "stripeCustomerId" character varying
);


ALTER TABLE public."user" OWNER TO database;

--
-- Name: user_favorite_exercices_exercice_model; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.user_favorite_exercices_exercice_model (
    "userId" integer NOT NULL,
    "exerciceModelId" integer NOT NULL
);


ALTER TABLE public.user_favorite_exercices_exercice_model OWNER TO database;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO database;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_program; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.user_program (
    id integer NOT NULL,
    status public.user_program_status_enum DEFAULT 'pending_payment'::public.user_program_status_enum NOT NULL,
    price integer NOT NULL,
    "commissionRate" double precision DEFAULT '0'::double precision NOT NULL,
    "applicationFeeAmount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "startDate" timestamp without time zone,
    "stripeSessionId" character varying,
    "userId" integer,
    "programId" integer,
    "coachId" integer
);


ALTER TABLE public.user_program OWNER TO database;

--
-- Name: user_program_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.user_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_program_id_seq OWNER TO database;

--
-- Name: user_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.user_program_id_seq OWNED BY public.user_program.id;


--
-- Name: coach_profile id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.coach_profile ALTER COLUMN id SET DEFAULT nextval('public.coach_profile_id_seq'::regclass);


--
-- Name: conversation id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.conversation ALTER COLUMN id SET DEFAULT nextval('public.conversation_id_seq'::regclass);


--
-- Name: crew id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.crew ALTER COLUMN id SET DEFAULT nextval('public.crew_id_seq'::regclass);


--
-- Name: exercice id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice ALTER COLUMN id SET DEFAULT nextval('public.exercice_id_seq'::regclass);


--
-- Name: exercice_info id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info ALTER COLUMN id SET DEFAULT nextval('public.exercice_info_id_seq'::regclass);


--
-- Name: exercice_model id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model ALTER COLUMN id SET DEFAULT nextval('public.exercice_model_id_seq'::regclass);


--
-- Name: exercice_video id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video ALTER COLUMN id SET DEFAULT nextval('public.exercice_video_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: invoice id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.invoice ALTER COLUMN id SET DEFAULT nextval('public.invoice_id_seq'::regclass);


--
-- Name: membership id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.membership ALTER COLUMN id SET DEFAULT nextval('public.membership_id_seq'::regclass);


--
-- Name: message id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- Name: muscle_group id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.muscle_group ALTER COLUMN id SET DEFAULT nextval('public.muscle_group_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: notification_preference id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification_preference ALTER COLUMN id SET DEFAULT nextval('public.notification_preference_id_seq'::regclass);


--
-- Name: offer id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer ALTER COLUMN id SET DEFAULT nextval('public.offer_id_seq'::regclass);


--
-- Name: offer_category id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer_category ALTER COLUMN id SET DEFAULT nextval('public.offer_category_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- Name: profile_subscription id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_subscription ALTER COLUMN id SET DEFAULT nextval('public.profile_subscription_id_seq'::regclass);


--
-- Name: program id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.program ALTER COLUMN id SET DEFAULT nextval('public.program_id_seq'::regclass);


--
-- Name: progress_session id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.progress_session ALTER COLUMN id SET DEFAULT nextval('public.progress_session_id_seq'::regclass);


--
-- Name: request id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.request ALTER COLUMN id SET DEFAULT nextval('public.request_id_seq'::regclass);


--
-- Name: training id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training ALTER COLUMN id SET DEFAULT nextval('public.training_id_seq'::regclass);


--
-- Name: training_plan id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training_plan ALTER COLUMN id SET DEFAULT nextval('public.training_plan_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_program id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_program ALTER COLUMN id SET DEFAULT nextval('public.user_program_id_seq'::regclass);


--
-- Name: offer_category PK_0a5e12233c4acc6faffbee423e2; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer_category
    ADD CONSTRAINT "PK_0a5e12233c4acc6faffbee423e2" PRIMARY KEY (id);


--
-- Name: training_plan PK_120d1ea63cbd602a8f68f941a50; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training_plan
    ADD CONSTRAINT "PK_120d1ea63cbd602a8f68f941a50" PRIMARY KEY (id);


--
-- Name: invoice PK_15d25c200d9bcd8a33f698daf18; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY (id);


--
-- Name: request PK_167d324701e6867f189aed52e18; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY (id);


--
-- Name: exercice_model PK_219b14f2c8831fd5977ebefc462; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model
    ADD CONSTRAINT "PK_219b14f2c8831fd5977ebefc462" PRIMARY KEY (id);


--
-- Name: conversation_participants_user PK_25e9241137cdb0f2336d267cc99; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "PK_25e9241137cdb0f2336d267cc99" PRIMARY KEY ("userId", "conversationId");


--
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- Name: program PK_3bade5945afbafefdd26a3a29fb; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY (id);


--
-- Name: profile PK_3dd8bfc97e4a77c70971591bdcb; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY (id);


--
-- Name: exercice_model_muscles_muscle_group PK_3ffd2825ef127072472a2ee9026; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model_muscles_muscle_group
    ADD CONSTRAINT "PK_3ffd2825ef127072472a2ee9026" PRIMARY KEY ("exerciceModelId", "muscleGroupId");


--
-- Name: offer PK_57c6ae1abe49201919ef68de900; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY (id);


--
-- Name: notification PK_705b6c7cdf9b2c2ff7ac7872cb7; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY (id);


--
-- Name: feedback PK_8389f9e087a57689cd5be8b2b13; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY (id);


--
-- Name: membership PK_83c1afebef3059472e7c37e8de8; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY (id);


--
-- Name: conversation PK_864528ec4274360a40f66c29845; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY (id);


--
-- Name: user_favorite_exercices_exercice_model PK_91076df4d995d5bdfa61fd7dc5d; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_favorite_exercices_exercice_model
    ADD CONSTRAINT "PK_91076df4d995d5bdfa61fd7dc5d" PRIMARY KEY ("userId", "exerciceModelId");


--
-- Name: exercice_video PK_9a63a937c4b8e6597cfcfdf9268; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "PK_9a63a937c4b8e6597cfcfdf9268" PRIMARY KEY (id);


--
-- Name: user_program PK_ab02fb05fe2e9b1e6ebaead78ed; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "PK_ab02fb05fe2e9b1e6ebaead78ed" PRIMARY KEY (id);


--
-- Name: progress_session PK_ad1201045ffb375edca9f614269; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.progress_session
    ADD CONSTRAINT "PK_ad1201045ffb375edca9f614269" PRIMARY KEY (id);


--
-- Name: exercice PK_b084e90a604d8b0560393b99f56; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice
    ADD CONSTRAINT "PK_b084e90a604d8b0560393b99f56" PRIMARY KEY (id);


--
-- Name: message PK_ba01f0a3e0123651915008bc578; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY (id);


--
-- Name: notification_preference PK_ba8d816b10f3dcfcd2e71ce5776; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification_preference
    ADD CONSTRAINT "PK_ba8d816b10f3dcfcd2e71ce5776" PRIMARY KEY (id);


--
-- Name: profile_permissions_permission PK_bade127ec58cfd9237f38418551; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_permissions_permission
    ADD CONSTRAINT "PK_bade127ec58cfd9237f38418551" PRIMARY KEY ("profileId", "permissionId");


--
-- Name: muscle_group PK_be821e8e246d694ce78e4bd61f9; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.muscle_group
    ADD CONSTRAINT "PK_be821e8e246d694ce78e4bd61f9" PRIMARY KEY (id);


--
-- Name: coach_profile PK_c176049225401d3efb7097e1d4f; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.coach_profile
    ADD CONSTRAINT "PK_c176049225401d3efb7097e1d4f" PRIMARY KEY (id);


--
-- Name: training PK_c436c96be3adf1aa439ef471427; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY (id);


--
-- Name: profile_subscription PK_c43747af81d3fd16d602eec2cda; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_subscription
    ADD CONSTRAINT "PK_c43747af81d3fd16d602eec2cda" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: crew PK_cc72b429996b3476dbaac59f1c2; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.crew
    ADD CONSTRAINT "PK_cc72b429996b3476dbaac59f1c2" PRIMARY KEY (id);


--
-- Name: exercice_info PK_f8828b655de7e3e4a8145e0d729; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info
    ADD CONSTRAINT "PK_f8828b655de7e3e4a8145e0d729" PRIMARY KEY (id);


--
-- Name: exercice_video REL_7dce64e34bb25d5c517f018521; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "REL_7dce64e34bb25d5c517f018521" UNIQUE ("exerciceId");


--
-- Name: exercice_info REL_b885f030db4c4931959561ecf4; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info
    ADD CONSTRAINT "REL_b885f030db4c4931959561ecf4" UNIQUE ("exerciceId");


--
-- Name: exercice_info REL_c25f1d354369c67ad7a04e2df1; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info
    ADD CONSTRAINT "REL_c25f1d354369c67ad7a04e2df1" UNIQUE ("exerciceModelId");


--
-- Name: exercice_video REL_f1992769b83767c5a92e2a8ac9; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "REL_f1992769b83767c5a92e2a8ac9" UNIQUE ("exerciceModelId");


--
-- Name: coach_profile REL_f4dee32cd2470455b4b063cebf; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.coach_profile
    ADD CONSTRAINT "REL_f4dee32cd2470455b4b063cebf" UNIQUE ("userId");


--
-- Name: feedback REL_fdf13453a184e0151ec2024f5f; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "REL_fdf13453a184e0151ec2024f5f" UNIQUE ("trainingId");


--
-- Name: profile UQ_0046bf0859cceb5f1744df2a360; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "UQ_0046bf0859cceb5f1744df2a360" UNIQUE (name);


--
-- Name: user UQ_009bb2a77de07b0bafcc83048eb; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_009bb2a77de07b0bafcc83048eb" UNIQUE (lastname);


--
-- Name: permission UQ_20ff45fefbd3a7c04d2572c3bbd; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "UQ_20ff45fefbd3a7c04d2572c3bbd" UNIQUE (key);


--
-- Name: user UQ_3c93ab6480cb85339c10c8c5fea; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_3c93ab6480cb85339c10c8c5fea" UNIQUE (firstname);


--
-- Name: offer UQ_69e9ab7ed4b55fb2ebac2cd95ef; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "UQ_69e9ab7ed4b55fb2ebac2cd95ef" UNIQUE ("crewId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_01d19942cfc73f57ec22a00599; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_01d19942cfc73f57ec22a00599" ON public.exercice_model_muscles_muscle_group USING btree ("exerciceModelId");


--
-- Name: IDX_1b35eeefe685f303015b43c4de; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_1b35eeefe685f303015b43c4de" ON public.user_favorite_exercices_exercice_model USING btree ("userId");


--
-- Name: IDX_398f5588c01201edc3ac8ecde8; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_398f5588c01201edc3ac8ecde8" ON public.profile_permissions_permission USING btree ("permissionId");


--
-- Name: IDX_41bdd028c5760ceaa885a0e674; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_41bdd028c5760ceaa885a0e674" ON public.user_favorite_exercices_exercice_model USING btree ("exerciceModelId");


--
-- Name: IDX_4928ef292e3fb48783034b82f7; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_4928ef292e3fb48783034b82f7" ON public.conversation_participants_user USING btree ("conversationId");


--
-- Name: IDX_5d93fb1843f96fbdefea37dae8; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_5d93fb1843f96fbdefea37dae8" ON public.conversation_participants_user USING btree ("userId");


--
-- Name: IDX_c9e0459ee7306bd764d40f9f86; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_c9e0459ee7306bd764d40f9f86" ON public.exercice_model_muscles_muscle_group USING btree ("muscleGroupId");


--
-- Name: IDX_fccb5a0bf35c780158080b4c04; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX "IDX_fccb5a0bf35c780158080b4c04" ON public.profile_permissions_permission USING btree ("profileId");


--
-- Name: exercice_model_muscles_muscle_group FK_01d19942cfc73f57ec22a00599b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model_muscles_muscle_group
    ADD CONSTRAINT "FK_01d19942cfc73f57ec22a00599b" FOREIGN KEY ("exerciceModelId") REFERENCES public.exercice_model(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: request FK_042236fdd0adec7c0b325bf58a2; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_042236fdd0adec7c0b325bf58a2" FOREIGN KEY ("offerId") REFERENCES public.offer(id) ON DELETE SET NULL;


--
-- Name: user FK_0c38c1867f47460324917674e4b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_0c38c1867f47460324917674e4b" FOREIGN KEY ("studentOfferId") REFERENCES public.offer(id);


--
-- Name: user_program FK_14d5d44520b10d1476b16a5dd0f; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "FK_14d5d44520b10d1476b16a5dd0f" FOREIGN KEY ("coachId") REFERENCES public."user"(id);


--
-- Name: user_program FK_1b1ba12685cf3cd9c46cdbb99df; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "FK_1b1ba12685cf3cd9c46cdbb99df" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user_favorite_exercices_exercice_model FK_1b35eeefe685f303015b43c4ded; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_favorite_exercices_exercice_model
    ADD CONSTRAINT "FK_1b35eeefe685f303015b43c4ded" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile_subscription FK_1bad80b988cc25d0eef51939cfc; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_subscription
    ADD CONSTRAINT "FK_1bad80b988cc25d0eef51939cfc" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: notification FK_1ced25315eb974b73391fb1c81b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: profile_subscription FK_1f742822be77bf7d228a0a42049; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_subscription
    ADD CONSTRAINT "FK_1f742822be77bf7d228a0a42049" FOREIGN KEY ("profileId") REFERENCES public.profile(id);


--
-- Name: training_plan FK_210d03bca2040fc825a3e757cde; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training_plan
    ADD CONSTRAINT "FK_210d03bca2040fc825a3e757cde" FOREIGN KEY ("programId") REFERENCES public.program(id) ON DELETE CASCADE;


--
-- Name: exercice_model FK_250a5d95940e7ed482176b4c451; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model
    ADD CONSTRAINT "FK_250a5d95940e7ed482176b4c451" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: message FK_2772d4f0bb9aa0d265b40caf26a; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT "FK_2772d4f0bb9aa0d265b40caf26a" FOREIGN KEY ("repliedMessageId") REFERENCES public.message(id) ON DELETE SET NULL;


--
-- Name: notification FK_34e3b7d10ab6765b1abd638c91e; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_34e3b7d10ab6765b1abd638c91e" FOREIGN KEY ("requestId") REFERENCES public.request(id) ON DELETE CASCADE;


--
-- Name: profile_permissions_permission FK_398f5588c01201edc3ac8ecde86; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_permissions_permission
    ADD CONSTRAINT "FK_398f5588c01201edc3ac8ecde86" FOREIGN KEY ("permissionId") REFERENCES public.permission(id);


--
-- Name: notification FK_3a5d9598cf6449a901ef252f3d1; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_3a5d9598cf6449a901ef252f3d1" FOREIGN KEY ("feedbackId") REFERENCES public.feedback(id) ON DELETE CASCADE;


--
-- Name: user_favorite_exercices_exercice_model FK_41bdd028c5760ceaa885a0e6741; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_favorite_exercices_exercice_model
    ADD CONSTRAINT "FK_41bdd028c5760ceaa885a0e6741" FOREIGN KEY ("exerciceModelId") REFERENCES public.exercice_model(id);


--
-- Name: exercice FK_46cdbc3a7ae052d966c2d814f13; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice
    ADD CONSTRAINT "FK_46cdbc3a7ae052d966c2d814f13" FOREIGN KEY ("trainingPlanId") REFERENCES public.training_plan(id) ON DELETE CASCADE;


--
-- Name: conversation_participants_user FK_4928ef292e3fb48783034b82f7a; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "FK_4928ef292e3fb48783034b82f7a" FOREIGN KEY ("conversationId") REFERENCES public.conversation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: feedback FK_4a39e6ac0cecdf18307a365cf3c; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: program FK_509990a43111b507a484116e0e5; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT "FK_509990a43111b507a484116e0e5" FOREIGN KEY ("categoryId") REFERENCES public.offer_category(id);


--
-- Name: conversation_participants_user FK_5d93fb1843f96fbdefea37dae86; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "FK_5d93fb1843f96fbdefea37dae86" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: exercice_model FK_6384e54f0710e931fcd94d03062; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model
    ADD CONSTRAINT "FK_6384e54f0710e931fcd94d03062" FOREIGN KEY ("secondaryMuscleId") REFERENCES public.muscle_group(id);


--
-- Name: user_program FK_641e773faade4cf868cb953d2aa; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "FK_641e773faade4cf868cb953d2aa" FOREIGN KEY ("programId") REFERENCES public.program(id);


--
-- Name: offer FK_69e9ab7ed4b55fb2ebac2cd95ef; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_69e9ab7ed4b55fb2ebac2cd95ef" FOREIGN KEY ("crewId") REFERENCES public.crew(id);


--
-- Name: message FK_71fb36906595c602056d936fc13; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT "FK_71fb36906595c602056d936fc13" FOREIGN KEY ("receiverId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: message FK_7cf4a4df1f2627f72bf6231635f; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES public.conversation(id) ON DELETE CASCADE;


--
-- Name: exercice_video FK_7dce64e34bb25d5c517f018521b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "FK_7dce64e34bb25d5c517f018521b" FOREIGN KEY ("exerciceId") REFERENCES public.exercice(id) ON DELETE CASCADE;


--
-- Name: membership FK_88a783ee3fcfef00e1385d72b2a; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_88a783ee3fcfef00e1385d72b2a" FOREIGN KEY ("studentId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: crew FK_8967a262bfdbff2f29d9853de93; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.crew
    ADD CONSTRAINT "FK_8967a262bfdbff2f29d9853de93" FOREIGN KEY ("coachId") REFERENCES public."user"(id);


--
-- Name: user FK_92cf50d670181dfa234bacd02e7; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_92cf50d670181dfa234bacd02e7" FOREIGN KEY ("crewId") REFERENCES public.crew(id) ON DELETE SET NULL;


--
-- Name: user FK_9466682df91534dd95e4dbaa616; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES public.profile(id);


--
-- Name: exercice_model FK_a21bf8ee07e8bdb726ae17822d5; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model
    ADD CONSTRAINT "FK_a21bf8ee07e8bdb726ae17822d5" FOREIGN KEY ("primaryMuscleId") REFERENCES public.muscle_group(id);


--
-- Name: exercice FK_a82b3302447723fc0fe94cb4fd0; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice
    ADD CONSTRAINT "FK_a82b3302447723fc0fe94cb4fd0" FOREIGN KEY ("trainingId") REFERENCES public.training(id) ON DELETE CASCADE;


--
-- Name: membership FK_acef4f59daa55848c7127dd1584; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT "FK_acef4f59daa55848c7127dd1584" FOREIGN KEY ("offerId") REFERENCES public.offer(id) ON DELETE CASCADE;


--
-- Name: training FK_b3a3040656df21433bb88f1e568; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "FK_b3a3040656df21433bb88f1e568" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: notification FK_b8617bca9a10907d193688d86c6; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_b8617bca9a10907d193688d86c6" FOREIGN KEY ("membershipId") REFERENCES public.membership(id) ON DELETE CASCADE;


--
-- Name: exercice_info FK_b885f030db4c4931959561ecf45; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info
    ADD CONSTRAINT "FK_b885f030db4c4931959561ecf45" FOREIGN KEY ("exerciceId") REFERENCES public.exercice(id) ON DELETE CASCADE;


--
-- Name: message FK_bc096b4e18b1f9508197cd98066; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: exercice_video FK_c0b7eeedc7c8121b5d3fc0bb8b9; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "FK_c0b7eeedc7c8121b5d3fc0bb8b9" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE SET NULL;


--
-- Name: exercice_info FK_c25f1d354369c67ad7a04e2df11; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_info
    ADD CONSTRAINT "FK_c25f1d354369c67ad7a04e2df11" FOREIGN KEY ("exerciceModelId") REFERENCES public.exercice_model(id) ON DELETE CASCADE;


--
-- Name: notification_preference FK_c8721bd56ae600308745ad49744; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.notification_preference
    ADD CONSTRAINT "FK_c8721bd56ae600308745ad49744" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: exercice_model_muscles_muscle_group FK_c9e0459ee7306bd764d40f9f86b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_model_muscles_muscle_group
    ADD CONSTRAINT "FK_c9e0459ee7306bd764d40f9f86b" FOREIGN KEY ("muscleGroupId") REFERENCES public.muscle_group(id);


--
-- Name: invoice FK_cb335d67535860f8a9d56952a21; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT "FK_cb335d67535860f8a9d56952a21" FOREIGN KEY ("profileSubscriptionId") REFERENCES public.profile_subscription(id);


--
-- Name: exercice FK_d122f049eefc365a7cb40a66c07; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice
    ADD CONSTRAINT "FK_d122f049eefc365a7cb40a66c07" FOREIGN KEY ("exerciceModelId") REFERENCES public.exercice_model(id) ON DELETE SET NULL;


--
-- Name: request FK_e474c30f189e7757e3db67126a1; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_e474c30f189e7757e3db67126a1" FOREIGN KEY ("receiverId") REFERENCES public."user"(id);


--
-- Name: user FK_e5eab302deb1aded146a15984e7; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_e5eab302deb1aded146a15984e7" FOREIGN KEY ("coachId") REFERENCES public."user"(id);


--
-- Name: offer FK_e8100751be1076656606ae045e3; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: progress_session FK_efe39ca35c97c76646ceca7360f; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.progress_session
    ADD CONSTRAINT "FK_efe39ca35c97c76646ceca7360f" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: request FK_f0b36dd5420aa9165e74fef75ab; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_f0b36dd5420aa9165e74fef75ab" FOREIGN KEY ("senderId") REFERENCES public."user"(id);


--
-- Name: exercice_video FK_f1992769b83767c5a92e2a8ac9b; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.exercice_video
    ADD CONSTRAINT "FK_f1992769b83767c5a92e2a8ac9b" FOREIGN KEY ("exerciceModelId") REFERENCES public.exercice_model(id) ON DELETE CASCADE;


--
-- Name: program FK_f3da3fbdc7189fd3c3765761f04; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT "FK_f3da3fbdc7189fd3c3765761f04" FOREIGN KEY ("coachId") REFERENCES public."user"(id);


--
-- Name: offer FK_f458a1bb3bbe09b95afa896ecea; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_f458a1bb3bbe09b95afa896ecea" FOREIGN KEY ("categoryId") REFERENCES public.offer_category(id);


--
-- Name: coach_profile FK_f4dee32cd2470455b4b063cebf2; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.coach_profile
    ADD CONSTRAINT "FK_f4dee32cd2470455b4b063cebf2" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: training FK_f78425483a5297f96e53c77fe05; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "FK_f78425483a5297f96e53c77fe05" FOREIGN KEY ("crewId") REFERENCES public.crew(id);


--
-- Name: invoice FK_f8e849201da83b87f78c7497dde; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT "FK_f8e849201da83b87f78c7497dde" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: profile_permissions_permission FK_fccb5a0bf35c780158080b4c04e; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.profile_permissions_permission
    ADD CONSTRAINT "FK_fccb5a0bf35c780158080b4c04e" FOREIGN KEY ("profileId") REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: feedback FK_fdf13453a184e0151ec2024f5fd; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "FK_fdf13453a184e0151ec2024f5fd" FOREIGN KEY ("trainingId") REFERENCES public.training(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

