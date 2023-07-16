import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";
// import puppeteer from "puppeteer";
import dragonData from "../scraper/dragons.json";
import scraper from "../scraper/scraper.js";

SplashScreen.preventAutoHideAsync();

export default function DragonsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [dragonNames, setDragonNames] = useState([]);
  useEffect(() => {
    const names = dragonData.map((dragon) => ({
      dragonName: dragon.dragonName,
      imageUrl: dragon.imageUrl,
    }));
    setDragonNames(names);
  }, []);

  // const [dragonData, setDragonData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await scraper();
  //     setDragonData(data);
  //   };

  //   fetchData();
  // }, []);

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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={"#fff"}
            tintColor={"#fff"}
          />
        }
      >
        <TouchableOpacity
          className="mt-[30px] ml-5 self-start"
          onPress={() => navigation.navigate("homescreen")}
        >
          <Icon type="antdesign" name="arrowleft" color={"#fff"} size={30} />
        </TouchableOpacity>
        <View className="w-[90%] flex items-start mt-5 ml-5">
          <Text
            className="text-white text-4xl"
            style={{ fontFamily: "SF-Bold" }}
          >
            Dragons
          </Text>
        </View>
        <View
          className="flex-1 flex-row flex-wrap justify-center mt-5"
          style={{ gap: 10 }}
        >
          {dragonNames.map((dragon, index) => (
            <View
              key={index}
              className="w-[45%] h-[60%] bg-[#515151] items-center rounded-2xl"
            >
              <Text>{dragon.dragonName}</Text>
              <Image
                style={{ width: 65, height: 65 }}
                source={{ uri: dragon.imageUrl }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
