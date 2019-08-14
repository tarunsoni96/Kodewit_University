import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
const ListItemSyllabus = ({ courseNo, courseName }) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomText
          text={`Course No: ${courseNo}`}
          size={15}
          color={Colors.dark}
          font={Fonts.regular}
        />
        <CustomText
          text={courseName}
          size={15}
          style={{ marginTop: 5 }}
          color={Colors.black}
          font={Fonts.heavy}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    padding: 10,
    paddingBottom: 6,
    width: "46.4%",
    margin: 7,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: Colors.noticeMsgBox
  }
});

export default ListItemSyllabus;
