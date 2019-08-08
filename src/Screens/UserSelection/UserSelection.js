import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import { Colors } from "UIProps/Colors";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import Divider from "AppLevelComponents/UI/Divider";
import Fonts from "UIProps/Fonts";
import Carousel from 'react-native-snap-carousel';
import 'Helpers/global'
import UserCard from "./components/UserCard";

let valObj = {
  email: "dummy@g.com",
  password: "dummy"
};

let bgColor = '#f7f7f9'
 class UserSelection extends Component {
  state = {
    isApiCall: undefined
  };

  _renderItem ({item, index}) {
    return (
        <UserCard />
    );
}

  render() {
    return (
      <Container scroll={true} padding={0}>
        <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
        <View style={styles.subContainer}>
            <CustomText text="Build Profile" color={Colors.accent} size={17} font={Fonts.heavy} />
            <CustomText text="Select User type" color={Colors.black} size={17} font={Fonts.heavy} />

            <View style={{alignItems:'center',marginTop:40}}>
            <Carousel
            layoutCardOffset={50}
            inactiveSlideScale={1}
            onSnapToItem={(i)=>{}}
            activeAnimationType='spring'
              ref={(c) => { this._carousel = c; }}
              data={['s','s','2']}
              renderItem={this._renderItem}
              sliderWidth={global.deviceWidth}
              itemWidth={230}
            />
            </View>
            </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  subContainer: {
    flex:1,
    padding:14,
    width: "100%",
    backgroundColor:bgColor
  },

  containerInputs: {
    // alignSelf:'flex-start',
    width: "100%",
    alignItems: "flex-start",
    marginTop:20,
    flex: 1
  }
});

export default  withNavigation(UserSelection);
