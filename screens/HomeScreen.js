import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";
import OptionsButton from "../components/OptionButton";
import * as SplashScreen from "expo-splash-screen";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "SF-Bold": require("../assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Regular": require("../assets/fonts/SF-Pro-Text-Regular.otf"),
  });

  const [placeholder, setPlaceholder] = useState(
    "Search dragons, elements, rarity..."
  );

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (placeholder === "") {
      setPlaceholder("Search dragons, elements, rarity...");
    }
  };

  const optionsimages = {
    elements: require("../assets/images/element.png"),
    rarity: require("../assets/images/rarity.png"),
    ability: require("../assets/images/ability.png"),
    source: require("../assets/images/source.png"),
  };

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
      className="flex-1 bg-[#212121]"
      contentContainerStyle={{ alignItems: "center" }}
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

        <View className="flex-row rounded-full my-5 border-[1px] py-4 px-5 bg-[#121212] text-slate-100">
          <Icon
            type="antdesign"
            name="search1"
            color={"#515151"}
            size={20}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ fontFamily: "SF-Regular", color: "#fff" }}
            placeholder={placeholder}
            placeholderTextColor="#515151"
            autoCorrect
            keyboardAppearance="dark"
            returnKeyType="search"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>

        <View id="screenOptions" className="flex flex-col">
          <View id="row1" className="mb-3">
            <TouchableOpacity
              className="bg-green-400 w-full h-[150px] rounded-2xl flex justify-end p-5 relative overflow-hidden"
              onPress={() => navigation.navigate("dragonsscreen")}
            >
              <Text
                className="text-slate-100 text-2xl"
                style={{
                  fontFamily: "SF-Bold",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 5.46,
                  elevation: 9,
                }}
              >
                Dragons
              </Text>
              <Image
                source={require("../assets/images/dragon.png")}
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: "stretch",
                  position: "absolute",
                  right: -80,
                  bottom: -150,
                  zIndex: -1,
                  opacity: 0.1,
                }}
              />
            </TouchableOpacity>
          </View>

          <View id="row2" className="flex flex-row mb-3" style={{ gap: 12 }}>
            <OptionsButton
              title="Elements"
              bgColor={"rgb(248 113 113)"}
              navigation={navigation}
              screenName="elementsscreen"
              imagelink={optionsimages.elements}
            />
            <OptionsButton
              title="Rarity"
              bgColor={"rgb(96 165 250)"}
              navigation={navigation}
              screenName="raritiesscreen"
              imagelink={optionsimages.rarity}
            />
          </View>

          <View id="row2" className="flex flex-row" style={{ gap: 12 }}>
            <OptionsButton
              title="Abilities"
              bgColor={"rgb(250 204 21)"}
              navigation={navigation}
              screenName="abilitiesscreen"
              imagelink={optionsimages.ability}
            />
            <OptionsButton
              title="Sources"
              bgColor={"rgb(192 132 252)"}
              navigation={navigation}
              screenName="abilitiesscreen"
              imagelink={optionsimages.source}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
