import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import OptionsButton from "../components/OptionButton";
import { SettingOutlined } from "@ant-design/icons";

export default function HomeScreen({ navigation }) {
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
      {/* <SettingOutlined /> */}
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
          className=" rounded-full my-5 border-[1px] py-4 px-5 bg-[#121212] text-slate-100"
          style={{ fontFamily: "SF-Regular" }}
          placeholder="Search dragons, elements, rarity..."
          placeholderTextColor="#515151"
          autoCorrect
          keyboardAppearance="dark"
          returnKeyType="search"
        />
        <View id="screenOptions" className="flex flex-col">
          <View id="row1" className="mb-3">
            <TouchableOpacity
              className="bg-green-400 w-full h-[150px] rounded-2xl flex justify-end p-5"
              onPress={() => navigation.navigate("dragonsscreen")}
            >
              <Text
                className="text-slate-100 text-2xl drop-shadow-4xl"
                style={{ fontFamily: "SF-Bold" }}
              >
                Dragons
              </Text>
            </TouchableOpacity>
          </View>

          <View id="row2" className="flex flex-row mb-3" style={{ gap: 12 }}>
            <OptionsButton
              title="Elements"
              bgColor={"rgb(248 113 113)"}
              navigation={navigation}
              screenName="elementsscreen"
            />
            <OptionsButton
              title="Rarity"
              bgColor={"rgb(96 165 250)"}
              navigation={navigation}
              screenName="raritiesscreen"
            />
          </View>

          <View id="row2" className="flex flex-row" style={{ gap: 12 }}>
            <OptionsButton
              title="Abilities"
              bgColor={"rgb(250 204 21)"}
              navigation={navigation}
              screenName="abilitiesscreen"
            />
            <OptionsButton
              title="test"
              bgColor={"rgb(192 132 252)"}
              navigation={navigation}
              screenName="abilitiesscreen"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
