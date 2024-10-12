/**
 * Start page component displayed at the root of the application.
 * - Displays a loading spinner centered on the screen.
 *
 * Key components:
 * 1. ActivityIndicator: Displays an animated spinner to indicate loading state.
 * 2. View: Acts as a container with styles for positioning.
 */

import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* Displays a large blue spinner in the center of the screen */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
