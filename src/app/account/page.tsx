"use client";

import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { lexend } from "../fonts";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSeparator from "../components/CustomSeparator";

export default function AccountPage() {
  const { data: session } = useSession({ required: true });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    hytaleUsername: "",
  });

  // Initialize form data when session loads
  useState(() => {
    if (session?.user) {
      setFormData({
        email: session.user.email || "",
        hytaleUsername: "", // Add default value from session if available
      });
    }
  });

  const handleEdit = () => {
    if (isEditing) {
      // Save logic here - you can add API call to save the data
      console.log("Saving data:", formData);
      // Add your save API call here
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (session?.user) {
      setFormData({
        email: session.user.email || "",
        hytaleUsername: "",
      });
    }
    setIsEditing(false);
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
    <div className="container mx-auto px-6 max-w-xl py-12">
      <h1
        className={`text-5xl text-transparent bg-clip-text bg-(image:--text-gradient) font-bold text-center mb-12 ${lexend.className}`}
      >
        ACCOUNT
      </h1>
      <Card className="gap-0 justify-between bg-[#322059] border-0 relative rounded-xs inset-ring-2 inset-ring-border shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
        <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />

        <CardContent>
          {/* <div className="flex justify-center">
            {session.user?.image && (
              <div className="border-0 relative rounded-xs inset-ring-2 inset-ring-border shadow-[0_0_20px_rgba(0,0,0,0.3)] w-[96px] h-[96px] flex items-center justify-center">
                <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
                <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />

                <Image
                  width={92}
                  height={92}
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                />
              </div>
            )}
          </div> */}
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
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
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
              >
                CANCEL
              </Button>
              <Button
                className="flex-1"
                variant={"hytale"}
                onClick={handleEdit}
              >
                SAVE CHANGES
              </Button>
            </>
          ) : (
            <Button className="w-full" variant={"hytale"} onClick={handleEdit}>
              EDIT ACCOUNT
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
