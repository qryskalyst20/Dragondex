import "expo-router/entry";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { GetDragons } from "../lib/GetDragons";
import { useState, useEffect, useTransition } from "react";
import { Link } from "expo-router";

const App = () => {
  const [dragonData, setDragonData] = useState([
    { dragon_name: "", dragon_image: "" },
  ]);
  const [filteredData, setFilteredData] = useState(dragonData);
  const [page, setPage] = useState(49); // Page number for pagination
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (() => {
      startTransition(() => {
        (async () => {
          const res = await GetDragons(0, page);
          console.log("running getDragon");
          if (res != null) {
            const formattedData = res.map((item) => ({
              dragon_name: item.dragon_name,
              dragon_image: item.dragon_image || "",
            }));
            setDragonData(formattedData);
            setFilteredData(formattedData);
          }
        })();
      });
    })();
  }, [page]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="text-4xl text-slate-100">Dragon List</Text>
      <View className="w-full flex-1 px-2">
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.dragon_name}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/[dragon]",
                params: { dragon: item.dragon_name },
              }}
              className="bg-zinc-900 m-1 flex-1 h-[130px] w-full p-5 rounded-2xl flex items-center justify-center"
            >
              <TouchableOpacity>
                <Text className="text-white">{item.dragon_name}</Text>
                {item.dragon_image == "" ? (
                  <Text className="text-white">No Image</Text>
                ) : (
                  <Image
                    style={{ width: 70, height: 70, resizeMode: "contain" }}
                    source={{ uri: item.dragon_image }}
                  />
                )}
              </TouchableOpacity>
            </Link>
          )}
        />
        <TouchableOpacity onPress={() => setPage(page + 49)}>
          <Text className="text-slate-100">Next Page</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
