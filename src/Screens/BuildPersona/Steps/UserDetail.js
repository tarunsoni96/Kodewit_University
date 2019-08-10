import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Swiper from "react-native-page-swiper";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import { PersonaBuildConsumer,CxtPersonaBuild, } from "AppLevelComponents/Contexts/CxtPersonaBuild";
import Container from 'AppLevelComponents/UI/Container'
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderSwiper: false
    };
  }

  componentWillMount = () => {
    this.renderSwiper();
  };

  renderSwiper() {
    setTimeout(() => {
      HelperMethods.animateLayout();
      this.setState({ renderSwiper: true });
    }, 400);
  }

  render() {
    return (
      

      <PersonaBuildConsumer>
        {context => {
           let currentIndex = context.step
          return (
            <Container style={{flex:1}} padding={0} contentPadding={0}>
              <View
                style={{
                  flex: 1,
                  marginTop: 0,
                  width: "100%"
                }}
              >
                  </View>
                  </Container>
          );
        }}
      </PersonaBuildConsumer>
    );
  }
}
