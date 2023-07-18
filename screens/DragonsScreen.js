import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";
import axios from "axios";
import { load } from "cheerio";
import LoadingScreen from "../LoadingScreen";
// import { read } from "react-native-fs";

SplashScreen.preventAutoHideAsync();

export default function DragonsScreen({ navigation }) {
  const [dragonData, setDragonData] = useState([]);

  useEffect(() => {
    const scraper = async () => {
      const response = await axios.get(
        "https://dragoncity.fandom.com/wiki/Dragons/All"
      );

      const $ = load(response.data);
      const articles = $(".bm_dragon_name");

      const structuredData = [];

      for (const article of articles) {
        const imgElement = $(article).find(".bm_dragon_square a img");
        const imageUrl = imgElement.attr("data-src") || imgElement.attr("src");
        const dragonName = $(article).find("span").text();

        structuredData.push({ imageUrl, dragonName });
      }

      setDragonData(structuredData);

      // console.log("First three dragons:");
      // for (let i = 0; i < 4; i++) {
      //   console.log(structuredData[i]);
      // }
    };

    scraper();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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
    <SafeAreaView
      onLayout={onLayoutRootView}
      className="flex-1 min-h-screen bg-[#212121]"
    >
      {/* <TouchableOpacity
        className="mt-[30px] ml-5 self-start"
        onPress={() => navigation.navigate("homescreen")}
        // onPress={scraper}
      >
        <Icon type="antdesign" name="arrowleft" color={"#fff"} size={30} />
      </TouchableOpacity>

      <View className="w-screen py-5 border-white border-b-2">
        <Text
          className="text-white text-4xl ml-5"
          style={{ fontFamily: "SF-Bold" }}
        >
          Dragons
        </Text>
        <View className="w-[90%] mx-auto flex-row rounded-full mt-5 border-[1px] py-4 px-5 bg-[#121212] text-slate-100">
          <Icon
            type="antdesign"
            name="search1"
            color={"#515151"}
            size={20}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ fontFamily: "SF-Regular", color: "#fff" }}
            placeholder="Search dragons name"
            placeholderTextColor="#515151"
            autoCorrect
            keyboardAppearance="dark"
            returnKeyType="search"
          />
        </View>
      </View> */}

      <View className="w-screen flex-1">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <FlatList
            data={dragonData}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <View className="bg-[#515151] m-1 flex-1 h-[130px] items-center justify-center rounded-2xl">
                <Text className="text-white" style={{ fontFamily: "SF-Bold" }}>
                  {item.dragonName}
                </Text>
                <Image
                  style={{ width: 65, height: 65 }}
                  source={{ uri: item.imageUrl }}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
