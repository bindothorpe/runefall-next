import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    console.log("Checkout session customer:", checkoutSession.customer);
    console.log("Session user email:", session.user.email);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("User stripeCustomerId:", user.stripeCustomerId);
    console.log("Comparison:", checkoutSession.customer, "===", user.stripeCustomerId);

    // Verify the session belongs to the logged-in user by checking the customer ID
    if (checkoutSession.customer !== user.stripeCustomerId) {
      console.log("Customer ID mismatch!");
      return NextResponse.json(
        { error: "This session does not belong to you" },
        { status: 403 }
      );
    }

    // Verify payment was successful
    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment was not successful" },
        { status: 400 }
      );
    }

    const lineItem = checkoutSession.line_items?.data[0];
    const price = lineItem?.price;
    const product = price?.product as any;

    return NextResponse.json({
      sessionId: checkoutSession.id,
      productName: product?.name || "Unknown Product",
      amount: checkoutSession.amount_total || 0,
      currency: checkoutSession.currency || "usd",
      paymentStatus: checkoutSession.payment_status,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}