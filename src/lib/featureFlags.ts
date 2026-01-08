type FeatureFlagConfig = {
  store: FeatureFlag;
};

type FeatureFlag = {
	enabled: boolean;
	paths?: string[];
}

export const featureFlags: FeatureFlagConfig = {
  store: {
	enabled: process.env.NEXT_PUBLIC_FEATURE_STORE === "true",
	paths: ["/store", "/checkout"]
  }
} satisfies FeatureFlagConfig;

export function isFeatureEnabled(flag: keyof typeof featureFlags): boolean {
  return featureFlags[flag].enabled;
}

export function getPaths(flag: keyof typeof featureFlags): string[] | undefined {
	return featureFlags[flag].paths
}

export type FeatureFlagKey = keyof FeatureFlagConfig;