import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";

import { Card } from "react-native-elements";
import Fonts from "UIProps/Fonts";
import { cardStyle } from "UIProps/Styles";
import { Colors } from "UIProps/Colors";
import Icons from "AppLevelComponents/UI/Icons";
import CustomText from "AppLevelComponents/UI/CustomText";
import EStyleSheet from "react-native-extended-stylesheet";
export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderStatus() {
    const { sem, fee, status, isLocked } = this.props;

    switch (status) {
      case "Paid":
        return (
          <>
            <Icons
              lib="Ionicons"
              name="md-checkmark"
              size={17}
              color="#5d8e47"
            />
            <CustomText
              text={status}
              singleLine
              style={{ maxWidth: "88%", marginLeft: 5 }}
              size={15}
              color="#5d8e47"
              font={Fonts.heavy}
            />
          </>
        );

      case "pending":
        return (
          <>
            <Icons
              lib="AntDesign"
              name="exclamation"
              size={17}
              color="#ff9548"
            />
            <CustomText
              text={
                status.charAt(0).toUpperCase() + status.slice(1, status.length)
              }
              singleLine
              style={{ maxWidth: "88%", marginLeft: 5 }}
              size={15}
              color="#ff9548"
              font={Fonts.heavy}
            />
          </>
        );
    }
  }

  renderListItem() {
    const { sem, fee, status, isLocked } = this.props;
    if (isLocked) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center",marginTop: 15, }}>
          <CustomText
            text={sem}
            singleLine
            style={{ maxWidth: "88%",marginRight: 15, }}
            size={14}
            color="#948d8d"
            font={Fonts.heavy}
          />

          <Icons lib="AntDesign" name="lock" size={14} color="#948d8d" />
        </View>
      );
    } else {

    
    return (
      <>
        <CustomText
          text={sem}
          singleLine
          style={{ marginTop: 20, marginBottom: 0 }}
          size={15}
          color="rgba(0,0,0,0.7)"
          font={Fonts.heavy}
        />
        <Card
          dividerStyle={{ height: 0 }}
          containerStyle={[cardStyle, { width: "100%", flex: 1, elevation: 0,backgroundColor: status == 'pending' ? 'rgba(222,222,222,0.3)' : cardStyle.backgroundColor,borderRadius: 8,  }]}
        >
          <View style={styles.descContainer}>
            <CustomText
              text={`INR ${fee}`}
              singleLine
              style={{ maxWidth: "88%" }}
              size={15}
              color="rgba(0,0,0,0.7)"
              font={Fonts.heavy}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              {this.renderStatus()}
            </View>
          </View>
        </Card>
      </>
    );
            }
  }
  render() {
    return <>{this.renderListItem()}</>;
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  descContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
});
