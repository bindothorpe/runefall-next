import NextAuth from "next-auth"
import authConfig from "../auth.config"
 
// export const { auth: proxy } = NextAuth(authConfig)
import { NextRequest, NextResponse } from "next/server";
import { featureFlags, FeatureFlagKey } from "@/lib/featureFlags";

const { auth } = NextAuth(authConfig)

export async function proxy(request: NextRequest) {
	const path = request.nextUrl.pathname;
	
	// Check if path is behind a feature flag
	const blockedByFeatureFlag = checkFeatureFlags(path);
	if (blockedByFeatureFlag) {
		return NextResponse.redirect(new URL('/404', request.url));
		// Or return a custom "feature not available" page:
		// return NextResponse.redirect(new URL('/feature-unavailable', request.url));
	}
	
	const isProtectedPath = path.startsWith("/dashboard");
	
	// Get the token using the correct configuration
	const session = await auth();
	
	// If trying to access a protected route without authentication
	if (isProtectedPath && !session) {
		// Store the original URL to redirect back after login
		const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
		return NextResponse.redirect(new URL(`/?callbackUrl=${callbackUrl}`, request.url));
	}
	
	return NextResponse.next();
}

// Helper function to check if a path is blocked by feature flags
function checkFeatureFlags(path: string): boolean {
	// Check each feature flag
	for (const [key, flag] of Object.entries(featureFlags)) {
		// If feature is disabled and has paths defined
		if (!flag.enabled && flag.paths) {
			// Check if current path matches any of the blocked paths
			const isBlocked = flag.paths.some(blockedPath => 
				path.startsWith(blockedPath)
			);
			
			if (isBlocked) {
				return true;
			}
		}
	}
	
	return false;
}

// Config to apply middleware to all dashboard routes AND feature-flagged routes
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/store/:path*',
		'/checkout/:path*'
	]
};