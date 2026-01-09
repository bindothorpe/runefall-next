"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useId, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { lexend } from "../fonts";
import CustomSeparator from "../components/CustomSeparator";
import BackgroundImage from "../components/BackgroundImage";

// Wrapper component for consistent layout
function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-24 relative flex flex-col items-center gap-10 w-full min-h-screen overflow-hidden">
      <BackgroundImage
        url="/images/background/home-background-2.png"
        alt="Games Background"
      />
      <div className="container mx-auto px-6 max-w-xl py-12 pt-32 z-10">
        <h1
          className={`z-10 text-5xl text-transparent bg-clip-text bg-(image:--text-gradient) font-bold text-center mb-12 ${lexend.className}`}
        >
          PURCHASE ACCOUNT
        </h1>
        {children}
      </div>
    </div>
  );
}

// Loading state component
function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <CheckoutLayout>
      <Card
        variant={"hytale"}
        className="max-w-md mx-auto gap-0 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">{message}</p>
        </CardContent>
      </Card>
    </CheckoutLayout>
  );
}

// Error state component
function ErrorState({
  title,
  message,
  showBackButton = true,
}: {
  title: string;
  message: string;
  showBackButton?: boolean;
}) {
  return (
    <CheckoutLayout>
      <Card
        variant={"hytale"}
        className="max-w-md mx-auto gap-0 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
            {title}
          </h2>
          <p className="text-red-600 dark:text-red-300 text-center">
            {message}
          </p>
        </CardContent>
        {showBackButton && (
          <>
            <CustomSeparator className="py-4" />
            <CardFooter>
              <Link href="/store" className="w-full">
                <Button variant="hytale" className="w-full">
                  Back to Store
                </Button>
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </CheckoutLayout>
  );
}

// No Hytale account component
function NoHytaleAccountState() {
  return (
    <CheckoutLayout>
      <Card
        variant={"hytale"}
        className="max-w-md mx-auto gap-0 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
            Hytale Account Required
          </h2>
          <p className="text-red-600 dark:text-red-300 text-center">
            Please link your Hytale account before making a purchase. Go to your
            Account page to add your Hytale username.
          </p>
        </CardContent>
        <CustomSeparator className="py-4" />
        <CardFooter className="flex gap-3">
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
        </CardFooter>
      </Card>
    </CheckoutLayout>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CheckoutPageComponent />
    </Suspense>
  );
}

export function CheckoutPageComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceId = searchParams.get("priceId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ hytaleUsername: string } | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const id = useId();

  // Gift options state
  const [purchaseFor, setPurchaseFor] = useState<"myself" | "friend">("myself");
  const [friendUsername, setFriendUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

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
    // Fetch user data to get Hytale username
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setUserLoading(false);
    }
  };

  const validateUsername = (username: string): string | null => {
    // Check format: 3-16 characters, letters, numbers, underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

    if (!username) {
      return null; // Empty is handled by button disable
    }

    if (!usernameRegex.test(username)) {
      return "3-16 characters: letters, numbers, and underscores only";
    }

    // Check if trying to gift to themselves
    if (
      user?.hytaleUsername &&
      username.toLowerCase() === user.hytaleUsername.toLowerCase()
    ) {
      return "You cannot gift to yourself - please select 'Myself' or enter a different username";
    }

    return null;
  };

  const handleFriendUsernameChange = (value: string) => {
    setFriendUsername(value);
    setUsernameError(validateUsername(value));
  };

  const isCheckoutDisabled = () => {
    if (purchaseFor === "myself") {
      return false; // Always enabled for myself
    }

    // For friend: disabled if empty or has validation error
    return !friendUsername || usernameError !== null;
  };

  const handleCheckout = async () => {
    if (!priceId) {
      setError("No price ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipientUsername =
        purchaseFor === "myself" ? undefined : friendUsername;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          recipientUsername,
        }),
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

  // Early returns using consistent components
  if (status === "loading" || userLoading) {
    return <LoadingState />;
  }

  if (status === "unauthenticated") {
    return <LoadingState message="Redirecting to sign in..." />;
  }

  if (!user?.hytaleUsername) {
    return <NoHytaleAccountState />;
  }

  if (error) {
    return <ErrorState title="Error" message={error} />;
  }

  if (loading) {
    return (
      <LoadingState message="Processing checkout. Redirecting to Stripe..." />
    );
  }

  // Main checkout form
  return (
    <CheckoutLayout>
      <Card
        variant={"hytale"}
        className="max-w-md mx-auto gap-0 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6">
            Complete Your Purchase
          </h2>
          <div>
            <Label className="text-base font-semibold mb-4 block">
              Make this purchase for:
            </Label>
            <RadioGroup
              value={purchaseFor}
              onValueChange={(value) => {
                setPurchaseFor(value as "myself" | "friend");
                if (value === "myself") {
                  setFriendUsername("");
                  setUsernameError(null);
                }
              }}
              className="space-y-3"
            >
              {/* Myself option */}
              <label
                htmlFor={`${id}-myself`}
                className={`relative flex items-center gap-3 rounded-lg border px-4 py-4 cursor-pointer transition-all outline-none focus-within:ring-2 focus-within:ring-ring/50 ${
                  purchaseFor === "myself"
                    ? "border-primary bg-primary/5"
                    : "border-input"
                }`}
              >
                <RadioGroupItem
                  id={`${id}-myself`}
                  value="myself"
                  aria-label="Purchase for myself"
                />
                <p className="text-sm font-medium flex-1">
                  Myself {user?.hytaleUsername && `(${user.hytaleUsername})`}
                </p>
              </label>
              {/* Friend option */}
              <div
                className={`relative rounded-lg border transition-all outline-none focus-within:ring-2 focus-within:ring-ring/50 ${
                  purchaseFor === "friend"
                    ? "border-primary bg-primary/5 pb-4"
                    : "border-input"
                }`}
              >
                <label
                  htmlFor={`${id}-friend`}
                  className="flex items-center gap-3 px-4 py-4 cursor-pointer"
                >
                  <RadioGroupItem
                    id={`${id}-friend`}
                    value="friend"
                    aria-label="Purchase for a friend"
                  />
                  <p className="text-sm font-medium">For a friend</p>
                </label>
                {purchaseFor === "friend" && (
                  <div className="px-4 mt-1">
                    <Input
                      type="text"
                      placeholder="Enter Hytale username"
                      value={friendUsername}
                      onChange={(e) =>
                        handleFriendUsernameChange(e.target.value)
                      }
                      className={usernameError ? "border-red-500" : ""}
                    />
                    {usernameError && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                        {usernameError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CustomSeparator className="py-8" />
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleCheckout}
            disabled={isCheckoutDisabled() || loading}
            className="w-full"
            variant="hytale"
          >
            Continue to Checkout
          </Button>
          <Link href="/store" className="w-full mt-4">
            <Button variant="outline" className="w-full">
              Back to Store
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </CheckoutLayout>
  );
}
