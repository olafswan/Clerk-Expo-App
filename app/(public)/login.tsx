/**
 * Login component that handles user authentication through Clerk.
 *
 * Key Features:
 * - Allows the user to input their email and password to log in.
 * - Provides links to the password reset and registration pages.
 * - Displays a spinner while the login process is in progress.
 *
 * Main Functions:
 * - `onSignInPress`: Handles the sign-in logic, authenticating the user via Clerk's API.
 *
 * UI Components:
 * - Input fields for email and password.
 * - Buttons for login, password reset, and registration.
 */

import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  // Local states for user input
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle user login process
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true); // Show loading spinner
    try {
      // Attempts to sign the user in via Clerk
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // Sets the user's session to active upon successful login
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      // Display an error if sign-in fails
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      {/* Shows loading spinner when logging in */}

      {/* Input field for user's email */}
      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />

      {/* Input field for user's password */}
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      {/* Login button */}
      <Button onPress={onSignInPress} title="Login" color={"#6c47ff"}></Button>

      {/* Links to the reset password page */}
      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
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

export default Login;
