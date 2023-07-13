import { TouchableOpacity, Text, Image } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function OptionsButton({
  bgColor,
  title,
  screenName,
  navigation,
  imagelink,
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
      onLayout={onLayoutRootView}
      className={`flex-1 h-[100px] rounded-2xl flex justify-end p-3 overflow-hidden`}
      style={{ backgroundColor: bgColor, position: "relative" }}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text
        className="text-slate-100 text-xl drop-shadow-4xl"
        style={{
          fontFamily: "SF-Bold",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 5.46,
          elevation: 9,
        }}
      >
        {title}
      </Text>
      <Image
        source={imagelink}
        style={{
          width: 150,
          height: 150,
          resizeMode: "stretch",
          position: "absolute",
          right: -50,
          bottom: -30,
          zIndex: -1,
          opacity: 0.1,
        }}
      />
    </TouchableOpacity>
  );
}
