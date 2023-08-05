import { ScrollView, SafeAreaView, View, Text, Image } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { load } from "cheerio";
import LoadingScreen from "./LoadingScreen";

export default function DragonInfoScreen({ route, navigation }) {
  const { link } = route.params;

  const [dragonData, setDragonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: link,
      headerBackTitle: "Back",
      headerTransparent: true,
      headerTitleStyle: {
        color: "#fff",
      },
    });
  });

  useEffect(() => {
    const scraper1 = async () => {
      const response = await axios.get(
        `https://dragoncity.fandom.com/wiki/${link.replace(/ /g, "_")}`
      );

      const $ = load(response.data);
      const structuredData = [];

      const dragonElement = $(
        "tbody tr:nth-child(4) td:nth-child(1) a img"
      ).attr("alt");
      const dragonImage = $("tbody tr:nth-child(2) img").attr("src");

      structuredData.push({ dragonElement, dragonImage });
      setIsLoading(false);
      setDragonData(structuredData);

      // console.log(structuredData);
    };

    scraper1();
  }, []);

  const getBackgroundColorClass = (element) => {
    if (element === "Element Nature") {
      return "bg-green-500";
    } else if (element === "Element Flame") {
      return "bg-red-500";
    } else if (element === "Element Terra") {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  return (
    <SafeAreaView className="bg-[#212121] flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {dragonData.map((data, index) => (
            <View
              key={index}
              className={`${getBackgroundColorClass(
                data.dragonElement
              )} w-screen flex items-center justify-center`}
            >
              <Image
                source={{ uri: data.dragonImage }}
                style={{ width: 200, height: 200, resizeMode: "contain" }}
              />
              <Text className="text-white">{link}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
