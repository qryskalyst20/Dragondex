import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";
import axios from "axios";
import { load } from "cheerio";
import LoadingScreen from "../components/LoadingScreen";

SplashScreen.preventAutoHideAsync();

export default function DragonsScreen({ navigation }) {
  const [dragonData, setDragonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scraper1 = async () => {
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

      setIsLoading(false);
      setDragonData(structuredData);
    };

    scraper1();
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

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [0, -110],
  });

  return (
    <SafeAreaView
      onLayout={onLayoutRootView}
      className="flex-1 min-h-screen bg-primary"
    >
      <View className="w-screen flex-1">
        {isLoading ? (
          <LoadingScreen text={"Loading dragon info..."} />
        ) : (
          <FlatList
            data={dragonData}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            initialNumToRender={4}
            windowSize={4}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-secondary m-1 flex-1 h-[130px] p-5 rounded-2xl"
                onPress={() =>
                  navigation.navigate("dragoninfoscreen", {
                    link: item.dragonName,
                  })
                }
              >
                <Text className="text-white" style={{ fontFamily: "SF-Bold" }}>
                  {item.dragonName}
                </Text>
                <Image
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                  source={{ uri: item.imageUrl }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
