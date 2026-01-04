import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase" },
        { status: 401 }
      );
    }

    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Validate that the price exists in Stripe
    let price;
    try {
      price = await stripe.prices.retrieve(priceId, {
        expand: ["product"],
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

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

    // Check if user has a Hytale username
    if (!user.hytaleUsername) {
      return NextResponse.json(
        { error: "Please link your Hytale account before making a purchase. Go to your Account page to add your Hytale username." },
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          userId: user.id,
          hytaleUsername: user.hytaleUsername,
        },
      });

      stripeCustomerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    } else {
      // Update existing customer metadata with latest Hytale username
      await stripe.customers.update(stripeCustomerId, {
        metadata: {
          userId: user.id,
          hytaleUsername: user.hytaleUsername,
        },
      });
    }

    // Get the origin for redirect URLs
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      metadata: {
        userId: user.id,
        priceId: priceId,
        hytaleUsername: user.hytaleUsername,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}