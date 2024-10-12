/**
 * Profile component for displaying and updating user profile information.
 *
 * Key Features:
 * - Displays the user's first and last name.
 * - Provides input fields for updating first and last name.
 * - Updates the user's profile when "Update account" button is pressed.
 * - Uses the Clerk `useUser` hook for fetching and modifying user details.
 *
 * Main Functions:
 * - `onSaveUser`: Handles the profile update and sends data to Clerk for updating user details.
 * - `useState`: Manages local states for first and last name input fields.
 */

import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  // Fetches current user details from Clerk
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName); // Local state for first name input
  const [lastName, setLastName] = useState(user?.lastName); // Local state for last name input

  // Function to handle updating user details in Clerk
  const onSaveUser = async () => {
    try {
      // Attempt to update the user's first and last name in Clerk
      const result = await user.update({
        firstName: firstName!, // Non-null assertion, as firstName cannot be null for update
        lastName: lastName!, // Non-null assertion, as lastName cannot be null for update
      });
      console.log("User updated successfully:", result);
    } catch (e) {
      // Handle error if the update fails
      console.error("Error updating user profile:", JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      {/* Displays a greeting with the user's first and last name */}
      <Text style={{ textAlign: "center" }}>
        Good morning {user.firstName} {user.lastName}!
      </Text>

      {/* Input field for updating the first name */}
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />

      {/* Input field for updating the last name */}
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />

      {/* Button to trigger the profile update */}
      <Button onPress={onSaveUser} title="Update account" color={"#6c47ff"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Profile;
