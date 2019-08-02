import React, { Component } from "react";
import { Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "UIProps/Colors";
export class Header extends Component {
  render() {
    return (
      <View style={styles.headerBG}>

      <LinearGradient colors={Colors.header} style={styles.header}>
        {this.props.children}
      </LinearGradient>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $borderRadius: 20,

  headerBG: {
    flex:0,
    width: "100%",
    backgroundColor:Colors.contentCard
  },

  header: {
    // height: "200rem",
    flex:0,
    width: "100%",
    borderBottomLeftRadius: "$borderRadius",
    borderBottomRightRadius: "$borderRadius"
  }
});

export default withNavigation(Header);
