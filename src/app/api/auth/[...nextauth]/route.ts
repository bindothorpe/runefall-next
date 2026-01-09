import { handlers } from "@/auth"
import { NextRequest } from "next/server";

// Export GET and POST from handlers
export const GET = handlers.GET
export const POST = handlers.POST

// Handle HEAD requests by converting them to GET
export async function HEAD(request: NextRequest) {
  console.log("⚠️ HEAD request intercepted, converting to GET");
  console.log("Original URL:", request.url);
  
  // Simply call the GET handler with the same request
  return GET(request);
}

export const runtime = 'nodejs';