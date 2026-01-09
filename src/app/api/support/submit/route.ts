import { NextRequest, NextResponse } from "next/server";
import { sendSupportMessage } from "@/utils/send-support-message";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be less than 5000 characters" },
        { status: 400 }
      );
    }

    // Send the support message using your existing utility
    await sendSupportMessage({
      sender: email,
      message: message,
    });

    return NextResponse.json(
      { success: true, message: "Support message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending support message:", error);
    return NextResponse.json(
      { error: "Failed to send support message. Please try again later." },
      { status: 500 }
    );
  }
}