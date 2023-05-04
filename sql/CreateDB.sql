
DROP TABLE IF EXISTS public."Users" CASCADE;

DROP TABLE IF EXISTS public."UX_Researchers" CASCADE;

DROP TABLE IF EXISTS public."Tests" CASCADE;

DROP TABLE IF EXISTS public."Testers" CASCADE;

DROP TABLE IF EXISTS public."Selection_Criteria" CASCADE;

DROP TABLE IF EXISTS public."Sections" CASCADE;

DROP TABLE IF EXISTS public."Questions" CASCADE;

DROP TABLE IF EXISTS public."Options" CASCADE;

DROP TABLE IF EXISTS public."Contacted_Users" CASCADE;

DROP TABLE IF EXISTS  public."Answers" CASCADE;



-- Table: public.Users

CREATE TABLE IF NOT EXISTS public."Users"
(
    id serial NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    career text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    "profilePhoto" bytea,
    "facebookUrl" text COLLATE pg_catalog."default",
    "linkedinUrl" text COLLATE pg_catalog."default",
    "instagramUrl" text COLLATE pg_catalog."default",
    "twitterUrl" text COLLATE pg_catalog."default",
    type smallint NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to akcjoyip;


    -- Table: public.UX_Researchers

CREATE TABLE IF NOT EXISTS public."UX_Researchers"
(
    "userId" serial NOT NULL,
    "isCompany" boolean NOT NULL,
    website text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT "UX_Researchers_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "UX_Researchers" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UX_Researchers"
    OWNER to akcjoyip;


    -- Table: public.Tests

CREATE TABLE IF NOT EXISTS public."Tests"
(
    id serial NOT NULL,
    "userId" serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    deadline_date date NOT NULL,
    deadline_time time without time zone,
    "isPublic" boolean NOT NULL,
    payment numeric,
    CONSTRAINT "Tests_pkey" PRIMARY KEY (id),
    CONSTRAINT "Tests" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tests"
    OWNER to akcjoyip;


    -- Table: public.Testers

CREATE TABLE IF NOT EXISTS public."Testers"
(
    "userId" serial NOT NULL,
    "birthDate" date,
    gender character(1) COLLATE pg_catalog."default",
    hobbies text[] COLLATE pg_catalog."default",
    "digitalSavviness" integer,
    CONSTRAINT "Testers_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "Testers" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Testers"
    OWNER to akcjoyip;


    -- Table: public.Selection_Criteria

CREATE TABLE IF NOT EXISTS public."Selection_Criteria"
(
    "testId" serial NOT NULL,
    "ageRange" numrange,
    gender character(1) COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    career text COLLATE pg_catalog."default",
    hobbies text[] COLLATE pg_catalog."default",
    "digitalSavviness" integer,
    CONSTRAINT "Selection_Criteria_pkey" PRIMARY KEY ("testId"),
    CONSTRAINT "Selection_Criteria" FOREIGN KEY ("testId")
        REFERENCES public."Tests" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Selection_Criteria"
    OWNER to akcjoyip;


    -- Table: public.Sections

CREATE TABLE IF NOT EXISTS public."Sections"
(
    id serial NOT NULL,
    "testId" serial NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT "Sections_pkey" PRIMARY KEY (id),
    CONSTRAINT "Sections" FOREIGN KEY ("testId")
        REFERENCES public."Tests" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Sections"
    OWNER to akcjoyip;


    -- Table: public.Questions

CREATE TABLE IF NOT EXISTS public."Questions"
(
    id serial NOT NULL,
    "sectionId" serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Questions_pkey" PRIMARY KEY (id),
    CONSTRAINT "Questions" FOREIGN KEY ("sectionId")
        REFERENCES public."Sections" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Questions"
    OWNER to akcjoyip;


    -- Table: public.Options

CREATE TABLE IF NOT EXISTS public."Options"
(
    id serial NOT NULL,
    "questionId" serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    image bytea NOT NULL,
    CONSTRAINT "Options" FOREIGN KEY ("questionId")
        REFERENCES public."Questions" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Options"
    OWNER to akcjoyip;


    -- Table: public.Contacted_Users

CREATE TABLE IF NOT EXISTS public."Contacted_Users"
(
    id serial NOT NULL,
    "userId" serial NOT NULL,
    "testId" serial NOT NULL,
    CONSTRAINT "Contacted_Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Contacted_Users" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Contacted_Users_2" FOREIGN KEY ("testId")
        REFERENCES public."Tests" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Contacted_Users"
    OWNER to akcjoyip;


    -- Table: public.Answers

CREATE TABLE IF NOT EXISTS public."Answers"
(
    id serial NOT NULL,
    "userId" serial NOT NULL,
    "questionId" serial NOT NULL,
    answer text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Answers_pkey" PRIMARY KEY (id),
    CONSTRAINT "Answers" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Answers_2" FOREIGN KEY ("questionId")
        REFERENCES public."Questions" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Answers"
    OWNER to akcjoyip;