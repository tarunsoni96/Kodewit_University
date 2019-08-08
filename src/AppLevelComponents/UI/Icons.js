import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

let iconSize = 23;
class Icons extends Component {
  returnIcon() {
    const { lib, name, color, size } = this.props;
    switch (lib) {
      case "AntDesign":
        return (
          <AntDesign
            name={name}
            size={size || iconSize}
            color={color || "#000"}
          />
        );

      case "FontAwesome":
        return (
          <FontAwesome
            name={name}
            size={size || iconSize}
            color={color || "#000"}
          />
        );

      case "Entypo":
        return (
          <Entypo name={name} size={size || iconSize} color={color || "#000"} />
        );

        case 'Ionicons':
            return (
              <Ionicons name={name} size={size || iconSize} color={color || "#000"} />
            );
          break
    }
  }

  render() {
    return <>{this.returnIcon()}</>;
  }
}

export default withNavigation(Icons);
