import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import EStyleSheet from "react-native-extended-stylesheet";
import "Helpers/global";
import {Colors} from "UIProps/Colors";
import { Transition } from "react-navigation-fluid-transitions";
import { withNavigation } from "react-navigation";
class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateFullView(uri) {
    this.props.navigation.navigate("photographs_FullView", { uri });
  }
  render() {
    const { uri } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.navigateFullView(uri)}>
          <View style={styles.container}>
            <Transition shared={uri}>
              <Image
              indicatorProps={{
                size:30,
                color:Colors.accent
              }}
                indicator={ProgressBar}
                source={{ uri: uri }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </Transition>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
    height: global.deviceHeight / 5
  }
});

export default withNavigation(PhotoItem);
