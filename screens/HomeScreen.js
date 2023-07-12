import { Text, SafeAreaView, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

// import { SettingOutlined } from "@ant-design/icons";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "SF-Bold": require("../assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Regular": require("../assets/fonts/SF-Pro-Text-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      onLayout={onLayoutRootView}
      className="flex-1 bg-[#212121] items-center"
    >
      <View className="w-[90%] mt-[100px]">
        <View>
          <Text
            style={{ fontFamily: "SF-Bold" }}
            className="text-slate-100 text-4xl "
          >
            What are you looking for?
          </Text>
        </View>

        <TextInput
          className=" rounded-full mt-5 border-[1px] py-4 px-5 bg-[#121212] text-slate-100"
          style={{ fontFamily: "SF-Regular" }}
          placeholder="Search dragons, elements, rarity..."
          placeholderTextColor="#515151"
          autoCorrect
          keyboardAppearance="dark"
          returnKeyType="search"
        />
      </View>
    </SafeAreaView>
  );
}
