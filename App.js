import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import DragonsScreen from "./screens/DragonsScreen";
import AbilitiesScreen from "./screens/AbilitiesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="homescreen" component={HomeScreen} />
          <Stack.Screen name="dragonsscreen" component={DragonsScreen} />
          <Stack.Screen name="abilitiesscreen" component={AbilitiesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
