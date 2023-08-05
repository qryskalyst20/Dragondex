import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";
import axios from "axios";
import { load } from "cheerio";
import LoadingScreen from "../components/LoadingScreen";

SplashScreen.preventAutoHideAsync();

export default function DragonsScreen({ navigation }) {
  const [dragonData, setDragonData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dragons",
      headerBackTitle: "Back",
      headerTransparent: true,
      headerLargeTitle: true,
      headerTitleStyle: {
        color: "#fff",
      },
      headerSearchBarOptions: {
        hideWhenScrolling: true,
        textColor: "#fff",
        onChangeText: (event) => handleFilter(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  function handleFilter(searchTerm) {
    const filteredDragons = dragonData.filter((dragon) =>
      dragon.dragonName.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setDragonData(filteredDragons);
  }

  React.useEffect(() => {
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

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  React.useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

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
            contentInsetAdjustmentBehavior="automatic"
            initialNumToRender={4}
            windowSize={4}
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
