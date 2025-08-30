import * as Sentry from "@sentry/nextjs";
export const logError = (err) => {
  console.error(err);
  Sentry.captureException(err);
}