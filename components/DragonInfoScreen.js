import { ScrollView, SafeAreaView, View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { load } from "cheerio";

export default function DragonInfoScreen({ route, navigation }) {
  const { link } = route.params;

  const [dragonData, setDragonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <SafeAreaView className="bg-[#212121] flex-1">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dragonData.map((data, index) => (
          <View key={index}>
            <Image
              source={{ uri: data.dragonImage }}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-white">{`https://dragoncity.fandom.com/wiki/${link.replace(
              / /g,
              "_"
            )}`}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
