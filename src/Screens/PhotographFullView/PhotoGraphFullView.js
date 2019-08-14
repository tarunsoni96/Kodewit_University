import React, { Component } from "react";
import { Image, View, FlatList, ScrollView, Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import { Transition } from "react-navigation-fluid-transitions";
import { withNavigation } from "react-navigation";
import ZoomableView from "../../AppLevelComponents/UI/ZoomableView";
import BackBtnTransparent from "../../AppLevelComponents/UI/BackBtnTransparent";

class PhotoGraphFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { uri } = this.props.navigation.state.params;
    
    return (
      <Container style={{ flex: 1 }} padding={0}>
        <Transition appear="horizontal" shared={uri}>
          <View
            style={{
              width: "100%",
              position: "absolute",
              flex: 1,
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)"
            }}
          >
              
            <BackBtnTransparent />
            <ZoomableView>

              <Image
                source={{ uri: uri }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </ZoomableView>
          </View>
        </Transition>
      </Container>
    );
  }
}

export default withNavigation(PhotoGraphFullView);
