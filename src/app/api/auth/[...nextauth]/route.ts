import { handlers } from "@/auth"
import { NextRequest } from "next/server";

// Export GET and POST from handlers
export const GET = handlers.GET
export const POST = handlers.POST

// IGNORE HEAD requests completely - don't process them
export async function HEAD(request: Request) {
  console.log("⚠️ HEAD request from email scanner - ignoring to preserve token");
  console.log("URL:", request.url);
  
  // Return success without processing to avoid consuming the token
  return new Response(null, { 
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    }
  });
}

export const runtime = 'nodejs';