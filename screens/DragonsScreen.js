import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";

export default function DragonsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "SF-Bold": require("../assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Regular": require("../assets/fonts/SF-Pro-Text-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView
      onLayout={onLayoutRootView}
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#212121",
      }}
    >
      <TouchableOpacity
        className="mt-[70px] ml-5 self-start"
        onPress={() => navigation.navigate("homescreen")}
      >
        <Icon type="antdesign" name="arrowleft" color={"#fff"} size={40} />
      </TouchableOpacity>

      <View className="w-[90%] flex items-start mt-[10px]">
        <Text className="text-white text-3xl" style={{ fontFamily: "SF-Bold" }}>
          Dragons
        </Text>
      </View>
    </ScrollView>
  );
}
