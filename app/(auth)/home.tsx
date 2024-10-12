/**
 * Home Component
 *
 * This component displays a welcome message to the signed-in user.
 * It retrieves user information from Clerk and shows the user's email address.
 *
 * Key Interactions:
 * - Utilizes Clerk's `useUser` hook to access the current user's information.
 * - Displays a message that greets the user upon successful authentication.
 */

import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { user } = useUser(); // Get the current user's information

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
    </View>
  );
};

export default Home;
