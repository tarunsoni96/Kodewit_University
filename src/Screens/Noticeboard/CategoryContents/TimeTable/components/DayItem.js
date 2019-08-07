import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
const DayItem = ({ day, selected }) => {
  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: selected ? Colors.accent : "#b1b1b1" }
      ]}
    >
      <CustomText font={Fonts.heavy} text={day} size={14} color="#fff" />
    </View>
  );
};

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  circle: {
    width: 36,
    height: 36,
    borderRadius: 100 / 2,
    backgroundColor: "#b1b1b1",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
    elevation: 5,
    marginBottom:  10,
    marginTop: 26,

    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2
  }
});
export default DayItem;
