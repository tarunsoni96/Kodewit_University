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
import AntDesign from "react-native-vector-icons/AntDesign";
export default class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, desc, fullView } = this.props;
    return (
      <TouchableWithoutFeedback>

      <Card
        dividerStyle={{ height: 0 }}
        titleStyle={{ padding: 0, marginBottom: 0 }}
        title={title}
        containerStyle={[cardStyle,{marginVertical:0}]}
      >
        <View style={styles.descContainer}>
          <CustomText
            text={desc + " "}
            singleLine={!fullView}
            style={{ maxWidth: "95%", marginRight: 5 }}
            size={15}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
          />

          <TouchableOpacity>
            <Icons
              lib="Material"
              name={
                !fullView ? "unfold-more-horizontal" : "unfold-less-horizontal"
              }
              size={19}
            />
          </TouchableOpacity>
        </View>
      </Card>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  descContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -6.5
  }
});
