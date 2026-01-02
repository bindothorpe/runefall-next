"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession({ required: true });
  // This is only shown while loading or if not authenticated
  if (!session) {
    return <div className="p-8 text-center">Loading secure content...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">
        Welcome to your protected dashboard, {session.user?.name}!
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Profile Information</h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {session.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
          {session.user?.image && (
            <div>
              <p className="mb-2">
                <strong>Profile Image:</strong>
              </p>
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-24 h-24 rounded"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">How This Works</h2>
        <p className="mb-2">This page is protected by two different systems:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            <strong>Middleware Protection:</strong> Before the page even loads,
            Next.js checks if you're logged in using the middleware file
          </li>
          <li>
            <strong>Client-Side Protection:</strong> The{" "}
            <code>useSession({"{ required: true }"})</code> hook ensures only
            authenticated users see this content
          </li>
        </ol>
      </div>
    </div>
  );
}
