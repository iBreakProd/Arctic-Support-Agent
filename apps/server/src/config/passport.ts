import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "@repo/db";
import { usersTable } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../utils/errorClasses";

const AUTH_LOG = "[GoogleAuth:Strategy]";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log(`${AUTH_LOG} Profile received`, {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails?.map((e) => e.value),
          hasPhotos: !!profile.photos?.length,
        });
        const email = profile.emails?.[0]?.value;
        if (!email) {
          console.warn(`${AUTH_LOG} No email in profile`);
          return done(new AppError("No email from Google", 400), undefined);
        }

        const [existing] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (existing) {
          console.log(`${AUTH_LOG} Existing user found`, { userId: existing.id, email: existing.email });
          return done(null, existing);
        }

        console.log(`${AUTH_LOG} Creating new user`, { email, displayName: profile.displayName });
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
          console.error(`${AUTH_LOG} Insert returned no user`);
          return done(new AppError("Failed to create user", 500), undefined);
        }

        console.log(`${AUTH_LOG} New user created`, { userId: user.id, email: user.email });
        return done(null, user);
      } catch (err) {
        console.error(`${AUTH_LOG} Strategy error`, {
          message: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined,
        });
        return done(new AppError("Failed to authenticate with Google", 500), undefined);
      }
    }
  )
);

console.log("[GoogleAuth:Strategy] Config loaded", {
  clientID: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.slice(0, 20)}...` : "MISSING",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "MISSING",
  hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
});

export default passport;