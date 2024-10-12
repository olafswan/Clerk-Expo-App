/**
 * Layout for the authenticated group of screens using Expo Tabs.
 * - Contains two main tabs: "Home" and "Profile".
 * - Includes a logout button in the profile screen’s header.
 *
 * Key components:
 * 1. Tabs: Provides bottom tab navigation for authenticated screens.
 * 2. Ionicons: Icon library used for tab and button icons.
 * 3. LogoutButton: A button component to sign out the user.
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

// Logout button component that triggers user sign out
export const LogoutButton = () => {
  const { signOut } = useAuth(); // Clerk's signOut method

  const doLogout = () => {
    signOut(); // Call the signOut method to log out the user
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth(); // Check if the user is signed in

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff", // Tab bar header color
        },
        headerTintColor: "#fff", // Header text color
      }}
    >
      {/* Home tab screen */}
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home", // Label for the Home tab
        }}
        redirect={!isSignedIn} // Redirect if not signed in
      />

      {/* Profile tab screen */}
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile", // Label for the Profile tab
          headerRight: () => <LogoutButton />, // Adds a LogoutButton to the profile header
        }}
        redirect={!isSignedIn} // Redirect if not signed in
      />
    </Tabs>
  );
};

export default TabsPage;
