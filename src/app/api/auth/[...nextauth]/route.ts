import { handlers } from "@/auth"

export const { GET, POST } = handlers

// Add OPTIONS handler for CORS preflight
export async function OPTIONS(request: Request) {
  console.log("❌ OPTIONS request received at auth endpoint");
  console.log("URL:", request.url);
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Add HEAD handler to catch HEAD requests
export async function HEAD(request: Request) {
  console.log("❌ HEAD request received at auth endpoint");
  console.log("URL:", request.url);
  return new Response(null, { status: 200 });
}

// Add PUT handler to catch PUT requests
export async function PUT(request: Request) {
  console.log("❌ PUT request received at auth endpoint");
  console.log("URL:", request.url);
  return new Response(JSON.stringify({ error: "Method not allowed" }), { 
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Add DELETE handler to catch DELETE requests
export async function DELETE(request: Request) {
  console.log("❌ DELETE request received at auth endpoint");
  console.log("URL:", request.url);
  return new Response(JSON.stringify({ error: "Method not allowed" }), { 
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}