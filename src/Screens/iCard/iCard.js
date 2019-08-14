import React, { Component } from "react";
import { Text, View, Image, ScrollView, Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from "Helpers/Methods";
import Constants from "Helpers/Constants";
import ContentContainerAnimated from "AppLevelComponents/UI/ContentContainerAnimated";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import "Helpers/global";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import { withNavigation } from "react-navigation";
import Icons from "AppLevelComponents/UI/Icons";
import EStyleSheet from "react-native-extended-stylesheet";
import BackBtnTransparent from "AppLevelComponents/UI/BackBtnTransparent";
class iCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeScreen() {
    this.props.navigation.pop();
  }
  render() {
    return (
      <Container style={{ flex: 1 }} padding={0}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.closeScreen()}>
            <View style={styles.container} />
          </TouchableWithoutFeedback>
          <View style={{ margin: 10 }}>
            <BackBtnTransparent />
          </View>
            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              onZoomAfter={this.logOutZoomState}
             
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={{
                  uri:
                    "http://www.schoolmarts.in/Img/Icard/2.jpg"
                }}
                resizeMode='contain'
                style={{ width:350, height: 350 }}
              />
            </ReactNativeZoomableView>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 1
  },

  container: {
    width: "100%",
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
    height: "100%",
    top: 0,
    zIndex: 2
  }
});
export default withNavigation(iCard);
