import {
  View,
  SafeAreaView,
  ScrollView,
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
// import "expect-puppeteer";
// import puppeteer from "puppeteer";
import axios from "axios";
import cheerio from "cheerio";
import dragonData from "../scraper/dragons.json";
// import scraper from "../scraper/scraper.js";

SplashScreen.preventAutoHideAsync();

export default function DragonsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // const [dragonNames, setDragonNames] = useState([]);
  // useEffect(() => {
  //   const names = dragonData.map((dragon) => ({
  //     dragonName: dragon.dragonName,
  //     imageUrl: dragon.imageUrl,
  //   }));
  //   setDragonNames(names);
  // }, []);

  // const [dragonData, setDragonData] = useState([]);
  // const url = "https://dragoncity.fandom.com/wiki/Dragons/All";

  // const scraper = async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(url);
  //   const allEggs = await page.evaluate(() => {
  //     const eggs = document.querySelectorAll(".bm_dragon_name");

  //     return Array.from(eggs)
  //       .slice(0, 10)
  //       .map((egg) => {
  //         const dragonName = egg.querySelector("span").innerText;
  //         const url = egg.querySelector("a").href;
  //         const imageUrl = egg.querySelector("img").src;
  //         return { dragonName, url, imageUrl };
  //       });
  //   });
  //   setDragonData(allEggs);
  // };

  // useEffect(() => {
  //   scraper();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await scraper();
  //     setDragonData(data);
  //   };

  //   fetchData();
  // }, []);

  const scraper = async () => {
    const response = await axios.get(
      "https://dragoncity.fandom.com/wiki/Dragons/All"
    );
    const html = response.data;

    const $ = cheerio.load(html);
    // Select all the elements with the class name "athing"
    const articles = $(".bm_dragon_name");

    // Loop through the selected elements
    for (const article of articles) {
      // Organize the extracted data in an object
      const structuredData = {
        imageUrl: decodeURIComponent(
          $(article).find(".bm_dragon_square a img").attr("data-src")
        ),
        dragonName: $(article).find("span").text(),
      };

      // Log each element's strcutured data results to the console
      console.log(structuredData);
    }
  };

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
        // onPress={() => navigation.navigate("homescreen")}
        onPress={scraper}
      >
        <Icon type="antdesign" name="arrowleft" color={"#fff"} size={30} />
      </TouchableOpacity>

      <View className="w-screen py-5 border-white border-b-2">
        <Text
          className="text-white text-4xl ml-5"
          style={{ fontFamily: "SF-Bold" }}
        >
          Dragonss
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
      </View>

      <View className="w-screen flex-1">
        {/* <FlatList
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
        /> */}
      </View>
    </SafeAreaView>
  );
}
