import "dotenv/config";

export const envChecker = () => {
  const { DATABASE_URL, FRONTEND_URL, NODE_ENV } = process.env;

  const missingVars: string[] = [];

  if (!DATABASE_URL) missingVars.push("DATABASE_URL");
  if (!FRONTEND_URL) missingVars.push("FRONTEND_URL");
  if (!NODE_ENV) missingVars.push("NODE_ENV");

  if (missingVars.length > 0) {
    throw new Error(
      `Missing environment variable(s): ${missingVars.join(", ")}`
    );
  }
};
