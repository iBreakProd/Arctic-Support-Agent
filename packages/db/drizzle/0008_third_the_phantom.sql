ALTER TABLE "messages" ALTER COLUMN "sender" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."sender";--> statement-breakpoint
CREATE TYPE "public"."sender" AS ENUM('user', 'assistant');--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "sender" SET DATA TYPE "public"."sender" USING "sender"::"public"."sender";