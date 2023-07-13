import { TouchableOpacity, Text } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function OptionsButton({
  bgColor,
  title,
  screenName,
  navigation,
}) {
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
    <TouchableOpacity
      className={`flex-1 h-[100px] rounded-2xl flex justify-end p-3`}
      style={{ backgroundColor: bgColor }}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text
        className="text-slate-100 text-xl drop-shadow-4xl"
        style={{ fontFamily: "SF-Bold" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
