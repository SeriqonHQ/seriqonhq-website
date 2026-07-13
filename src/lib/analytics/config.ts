export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID.length > 0;
}
