import { TouchableOpacity, Text } from "react-native";

export default function OptionsButton({ bgColor, title }) {
  return (
    <TouchableOpacity
      className={`bg-${bgColor}-400 flex-1 h-[100px] rounded-2xl flex justify-end p-3`}
      //   onPress={() => navigation.navigate(screenName)}
    >
      <Text
        className="text-slate-100 text-2xl drop-shadow-4xl"
        // style={{ fontFamily: "SF-Bold" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
