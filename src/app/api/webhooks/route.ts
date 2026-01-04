import type { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    if (!(err instanceof Error)) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession status: ${session.payment_status}`);

          // Only process if payment was successful
          if (session.payment_status === "paid") {
            // Get the user ID and Hytale username from metadata
            const userId = session.metadata?.userId;
            const priceId = session.metadata?.priceId;
            const hytaleUsername = session.metadata?.hytaleUsername;

            if (!userId || !priceId) {
              console.error("Missing userId or priceId in session metadata");
              break;
            }

            // Retrieve the full session with line items
            const fullSession = await stripe.checkout.sessions.retrieve(
              session.id,
              {
                expand: ["line_items.data.price.product"],
              }
            );

            const lineItem = fullSession.line_items?.data[0];
            if (!lineItem) {
              console.error("No line items found in session");
              break;
            }

            const price = lineItem.price as Stripe.Price;
            const product = price?.product as Stripe.Product;

            // Create purchase record in database
            await prisma.purchase.create({
              data: {
                userId: userId,
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string,
                stripeCustomerId: session.customer as string,
                productId: product.id,
                productName: product.name,
                priceId: price.id,
                amount: session.amount_total || 0,
                currency: session.currency || "usd",
                hytaleUsername: hytaleUsername || null,
              },
            });

            console.log(`✅ Purchase recorded for user ${userId} (Hytale: ${hytaleUsername || 'N/A'})`);
          }
          break;

        case "payment_intent.payment_failed":
          const failedIntent = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${failedIntent.last_payment_error?.message}`);
          break;

        case "payment_intent.succeeded":
          const succeededIntent = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${succeededIntent.status}`);
          break;

        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error("Webhook handler error:", error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}