"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceId = searchParams.get("priceId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (status === "unauthenticated") {
      router.push(
        `/signin?callbackUrl=${encodeURIComponent(
          `/checkout?priceId=${priceId}`
        )}`
      );
    }
  }, [status, router, priceId]);

  useEffect(() => {
    // Auto-initiate checkout when user is authenticated and priceId exists
    if (status === "authenticated" && priceId && !loading && !error) {
      handleCheckout();
    }
  }, [status, priceId]);

  const handleCheckout = async () => {
    if (!priceId) {
      setError("No price ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-lg">Redirecting to sign in...</p>
      </div>
    );
  }

  if (error) {
    const isHytaleError = error.includes("Hytale account");

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-md mx-auto p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h1 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">
            {isHytaleError ? "Hytale Account Required" : "Error"}
          </h1>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          <div className="flex gap-3">
            {isHytaleError ? (
              <>
                <Link href="/account" className="flex-1">
                  <Button variant="hytale" className="w-full">
                    Go to Account
                  </Button>
                </Link>
                <Link href="/store" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Store
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/store" className="w-full">
                <Button variant="hytale" className="w-full">
                  Back to Store
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Processing Checkout
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Please wait while we redirect you to Stripe Checkout...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
