import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
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
      {/* <ScrollView
        // contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={"#fff"}
            tintColor={"#fff"}
          />
        }
      > */}
      <TouchableOpacity
        className="mt-[30px] ml-5 self-start"
        onPress={() => navigation.navigate("homescreen")}
      >
        <Icon type="antdesign" name="arrowleft" color={"#fff"} size={30} />
      </TouchableOpacity>

      <View className="w-[90%] flex items-start mt-5 ml-5">
        <Text className="text-white text-4xl" style={{ fontFamily: "SF-Bold" }}>
          Dragons
        </Text>
      </View>

      <View className="w-screen flex-1 mt-5">
        <FlatList
          data={dragonNames}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          renderItem={({ item }) => (
            <View className="bg-[#515151] mb-3 flex-1 h-[150px] items-center justify-center rounded-2xl">
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
      </View>
      {/* <Text style={{ fontSize: 42, marginHorizontal: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
