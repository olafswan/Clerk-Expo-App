/**
 * Password Reset Component
 *
 * This component manages the password reset process.
 * It allows users to request a password reset and to reset their password using a code.
 *
 * Key Interactions:
 * - Utilizes Clerk's `useSignIn` hook for password reset functionalities.
 * - Manages user input for email, password, and reset code.
 * - Displays the appropriate UI depending on whether the user is in the request or reset stage.
 */

import { View, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState(""); // User's email input
  const [password, setPassword] = useState(""); // User's new password input
  const [code, setCode] = useState(""); // Code input for password reset
  const [successfulCreation, setSuccessfulCreation] = useState(false); // State to track success of request
  const { signIn, setActive } = useSignIn(); // Clerk's signIn hook

  // Request a password reset code by email
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true); // Update state to indicate reset code has been sent
    } catch (err: any) {
      alert(err.errors[0].message); // Display error message if request fails
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message); // Display error message if reset fails
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="john@doe.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <Button
            onPress={onRequestReset}
            title="Send Reset Email"
            color={"#6c47ff"}
          ></Button>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />
          </View>
          <Button
            onPress={onReset}
            title="Set new Password"
            color={"#6c47ff"}
          ></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default PwReset;
