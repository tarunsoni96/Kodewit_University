import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "react-native-elements";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import Constants from "Helpers/Constants";

import AntDesign from "react-native-vector-icons/AntDesign";

export default class CustomButton extends Component {
  onPress() {
    let { onPress } = this.props;
    if (!onPress) {
      alert("Provide onpress prop");
      return;
    }
    onPress();
    Keyboard.dismiss();
  }

  render() {
    let { text, isApiCall,font, width,isRightIcon,borderRadius, containerStyle, textColor } = this.props;

    return (
      <Button
        disabled={isApiCall}
        onPress={() => this.onPress()}
        title={text}
        textStyle={{fontFamily: font || Fonts.medium ,}}
        icon={
          isRightIcon && (
            <AntDesign
              name="arrowright"
              size={30 * global.rem}
              color="white"
              style={{ paddingHorizontal: 8 }}
            />
          )
        }
        textColor={textColor || Colors.white}
        containerStyle={{
          width: width || "100%",
          borderRadius: borderRadius || 60,
          ...containerStyle
        }}
        buttonStyle={[
          styles.button,
          { borderRadius: borderRadius || 60 }
        ]}
        loading={isApiCall}
      />
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  button: {
    
    height: "47rem",
    backgroundColor: Colors.accent,
    borderRadius: 4
  }
});
