/**
 * Root layout component for the application.
 * - Uses ClerkProvider for authentication and session management with Clerk.
 * - InitialLayout handles navigation flow based on the authentication status.
 * - Secures tokens using Expo SecureStore.
 *
 * Key components:
 * 1. ClerkProvider: Provides authentication context across the app.
 * 2. InitialLayout: Handles navigation logic based on the user’s authentication state.
 * 3. SecureStore: Handles secure storage of tokens for session management.
 */

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Publishable Clerk API key for authentication
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Token cache utility for storing and retrieving secure tokens
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth(); // Clerk's useAuth hook to get auth status
  const segments = useSegments(); // Get the current app navigation segments
  const router = useRouter(); // Expo-router's navigation hook

  useEffect(() => {
    if (!isLoaded) return; // Ensure the auth status is loaded before navigating

    const inTabsGroup = segments[0] === "(auth)"; // Check if user is in the (auth) tab group

    // Log when the user's authentication state changes
    console.log("User changed: ", isSignedIn);

    // Navigation based on authentication status
    if (isSignedIn && !inTabsGroup) {
      router.replace("/home"); // Redirect authenticated users to the home page
    } else if (!isSignedIn) {
      router.replace("/login"); // Redirect unauthenticated users to the login page
    }
  }, [isSignedIn]);

  return <Slot />; // Slot component acts as a placeholder for the current screen
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache} // Pass custom tokenCache for token management
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
