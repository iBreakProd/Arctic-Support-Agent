import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "@repo/db";
import { usersTable } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../utils/errorClasses";

const googleCallbackURL =
  `${process.env.API_URL}/api/v1/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: googleCallbackURL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      console.log("[GOOGLE AUTH] Raw Profile received:", JSON.stringify(profile, null, 2));
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          console.error("[GOOGLE AUTH] Failed: No email found in profile");
          return done(new AppError("No email from Google", 400), undefined);
        }

        const [existing] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (existing) {
          console.log("[GOOGLE AUTH] Existing user found:", existing.id);
          return done(null, existing);
        }

        console.log("[GOOGLE AUTH] Creating new user for email:", email);

        const [user] = await db
          .insert(usersTable)
          .values({
            name: profile.displayName ?? "User",
            email,
            password: null,
            imageUrl: profile.photos?.[0]?.value ?? "https://example.com/avatar.png",
          })
          .returning();

        if (!user) {
          console.error("[GOOGLE AUTH] Failed: User insertion returned empty");
          return done(new AppError("Failed to create user", 500), undefined);
        }

        console.log("[GOOGLE AUTH] Successfully created new user:", user.id);
        return done(null, user);
      } catch (err) {
        console.error("[GOOGLE AUTH] Uncaught Error in verify callback:", err);
        return done(new AppError("Failed to authenticate with Google", 500), undefined);
      }
    }
  )
);

export default passport;