import { error, json } from "@sveltejs/kit";

import {
  GEMINI_API_KEY,
} from "$env/static/private";

export const GET = async ({ url }: { url: URL }) => {
  const secretKey = url.searchParams.get("key");
  if (!secretKey) return error(403, "Not Authorized");
  try {
    return json({
      response: secretKey
    })
  } catch (err) {
    throw error(500, "Internal Server Error");
  }
};

