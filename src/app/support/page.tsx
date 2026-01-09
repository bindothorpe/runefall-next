"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { lexend } from "../fonts";
import CustomSeparator from "../components/CustomSeparator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.email.trim() || !formData.message.trim()) {
      setMessage({
        type: "error",
        text: "Please fill in all fields",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/support/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          type: "error",
          text: data.error || "Failed to submit message",
        });
        setIsSubmitting(false);
        return;
      }

      setMessage({
        type: "success",
        text: "Message sent successfully! We'll get back to you soon.",
      });

      // Clear form on success
      setFormData({
        email: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Submit error:", error);
      setMessage({
        type: "error",
        text: "Failed to submit message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-xl pt-12 -mb-20 flex flex-col gap-6 min-h-screen">
      <h1
        className={`text-5xl text-transparent bg-clip-text bg-(image:--text-gradient) font-bold text-center mb-6 ${lexend.className}`}
      >
        SUPPORT
      </h1>
      <Card
        variant={"hytale"}
        className="gap-0 justify-between bg-[#322059] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <CardContent>
          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div>
                <Label className="text-xl text-foreground" htmlFor="email">
                  Email
                </Label>
                <p>We'll use this to get back to you.</p>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <Label className="text-xl text-foreground" htmlFor="message">
                  Message
                </Label>
                <p>Tell us about your questions, issues, or feedback.</p>
              </div>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                disabled={isSubmitting}
                rows={6}
              />
            </div>
          </div>
        </CardContent>
        <CustomSeparator className="my-12" />
        <CardFooter>
          <Button
            className="w-full"
            variant={"hytale"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
