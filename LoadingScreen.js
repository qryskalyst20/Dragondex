import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" />
    <Text style={{ color: "white", fontWeight: "bold", margin: 10 }}>
      Loading...
    </Text>
  </View>
);

export default LoadingScreen;
