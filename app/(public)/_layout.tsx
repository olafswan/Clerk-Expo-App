/**
 * PublicLayout component responsible for managing navigation for public (unauthenticated) routes.
 *
 * Key Features:
 * - Sets up the stack navigation for unauthenticated routes such as Login, Register, and Reset Password.
 * - Configures consistent header styles across all public screens.
 *
 * Components:
 * - `Stack.Screen`: Defines the routes for login, register, and reset password pages.
 */

import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff", // Sets header background color
        },
        headerTintColor: "#fff", // Sets header text color
        headerBackTitle: "Back", // Sets default back button text
      }}
    >
      {/* Screen for the login page */}
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Clerk Auth App", // Title for the login screen
        }}
      />

      {/* Screen for the registration page */}
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account", // Title for the register screen
        }}
      />

      {/* Screen for the password reset page */}
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: "Reset Password", // Title for the reset password screen
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
