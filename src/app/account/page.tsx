"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession, signOut } from "next-auth/react";
import { lexend } from "../fonts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSeparator from "../components/CustomSeparator";

export default function AccountPage() {
  const { data: session } = useSession({ required: true });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    hytaleUsername: "",
  });
  const [originalData, setOriginalData] = useState({
    email: "",
    hytaleUsername: "",
  });

  // Load user data when session loads
  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/user/profile");
          const data = await response.json();

          const userData = {
            email: session.user.email || "",
            hytaleUsername: data.hytaleUsername || "",
          };

          setFormData(userData);
          setOriginalData(userData);
        } catch (error) {
          console.error("Failed to load user data:", error);
          const userData = {
            email: session.user.email || "",
            hytaleUsername: "",
          };
          setFormData(userData);
          setOriginalData(userData);
        }
      }
    };

    loadUserData();
  }, [session]);

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes
      setIsSaving(true);
      setMessage(null);

      try {
        const response = await fetch("/api/user/update-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hytaleUsername: formData.hytaleUsername.trim() || null,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage({
            type: "error",
            text: data.error || "Failed to update username",
          });
          setIsSaving(false);
          return;
        }

        // Update original data to reflect saved state
        setOriginalData(formData);
        setMessage({ type: "success", text: "Username updated successfully!" });
        setIsEditing(false);

        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error("Save error:", error);
        setMessage({ type: "error", text: "Failed to update username" });
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
      setMessage(null);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setMessage(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!session) {
    return <div className="p-8 text-center">Loading secure content...</div>;
  }

  return (
    <div className="container mx-auto px-6 max-w-xl pt-12 -mb-20 flex flex-col gap-6 min-h-screen">
      <h1
        className={`text-5xl text-transparent bg-clip-text bg-(image:--text-gradient) font-bold text-center mb-6 ${lexend.className}`}
      >
        ACCOUNT
      </h1>
      <Card
        variant={"hytale"}
        className="gap-0 justify-between bg-[#322059]  shadow-[0_0_20px_rgba(0,0,0,0.3)]"
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
                <p>Manage your accounts email for invoices.</p>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                disabled={true}
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Label className="text-xl text-foreground" htmlFor="username">
                  Hytale Username
                </Label>
                <p>
                  Link your Hytale account so purchases from the store go to the
                  correct account.
                </p>
              </div>
              <Input
                id="username"
                type="text"
                placeholder="Hytaleuser223"
                value={formData.hytaleUsername}
                onChange={(e) =>
                  handleInputChange("hytaleUsername", e.target.value)
                }
                disabled={!isEditing}
              />
              <p className="text-sm text-muted-foreground">
                3-16 characters: letters, numbers, and underscores only
              </p>
            </div>
          </div>
        </CardContent>
        <CustomSeparator className="my-12" />
        <CardFooter className={isEditing ? "gap-4 flex" : ""}>
          {isEditing ? (
            <>
              <Button
                className="flex-1"
                variant={"outline"}
                onClick={handleCancel}
                disabled={isSaving}
              >
                CANCEL
              </Button>
              <Button
                className="flex-1"
                variant={"hytale"}
                onClick={handleEdit}
                disabled={isSaving}
              >
                {isSaving ? "SAVING..." : "SAVE CHANGES"}
              </Button>
            </>
          ) : (
            <Button className="w-full" variant={"hytale"} onClick={handleEdit}>
              EDIT ACCOUNT
            </Button>
          )}
        </CardFooter>
      </Card>
      <Button
        variant={"outline"}
        className="w-fit self-center"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </div>
  );
}
