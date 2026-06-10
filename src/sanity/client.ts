import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",
  apiVersion: "2024-06-01",
  useCdn: process.env.NODE_ENV === "production",
  // Use the read token only on the server (never exposed to client)
  token: process.env.SANITY_API_READ_TOKEN,
});

/** True when Sanity env vars are actually configured */
export const isSanityConfigured = () =>
  !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 4
  );
