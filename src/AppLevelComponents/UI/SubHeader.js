import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Constants from "Helpers/Constants";
import Fonts from "UIProps/Fonts";
import ProfilePic from "./ProfilePic";
class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSubheader() {
    let { type } = this.props;

    switch (type) {
      case Constants.header_back_middle_right:
        return this.header_back_middle_right();

      default:
        return this.main();
    }
  }

  navigateProfile(){
    this.props.navigation.navigate('Profile')
  }

  goBack(){
    this.props.navigation.pop()
  }

  main() {
    return (
      <>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.navigateProfile()}>
              <View>
                <View style={styles.holoCirlce_small}>
                  <ProfilePic size={30} pic="https://images.pexels.com/photos/1877913/pexels-photo-1877913.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </View>
                <CustomText
                  font="AvenirLTStd-Heavy"
                  paddingHorizontal={40}
                  text="Hi, Winnie"
                />
              </View>
            </TouchableOpacity>
            {/* <View style={styles.holoCirlce_large} ></View> */}
          </View>
          <TouchableOpacity onPress={() => alert("Go to Notifications")}>
            <View>
              <FontAwesome name="bell-o" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  header_back_middle_right() {
    let { screenTitle } = this.props;
    return (
      <>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <TouchableOpacity onPress={() => this.goBack()}>
            <View>
              <Entypo name="chevron-thin-left" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <CustomText
            text="My Profile"
            font={Fonts.heavy}
            size={17}
            color="#fff"
          />
        </View>
        <TouchableOpacity onPress={() => alert("Go to Notifications")}>
          <View>
            <FontAwesome name="cog" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </>
    );
  }

  render() {
    let { type } = this.props;
    return <View style={styles.container}>{this.renderSubheader()}</View>;
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $smallCircle: 80,
  $largeCircle: 250,
  $borderRadius: 20,

  container: {
    width: "100%",

    height: "50rem",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "13rem",
    flexDirection: "row"
  },

  image: {
    width: "30rem",
    height: "30rem",
    borderRadius: "100rem"
  },

  holoCirlce_small: {
    width: "$smallCircle",
    position: "absolute",
    height: "$smallCircle",
    flexDirection: "row",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "rgba(109, 193, 254, 0.6)",
    left: "-25rem",
    top: "-30rem"
  },

  holoCirlce_large: {
    width: "$largeCircle",
    position: "absolute",
    height: "$largeCircle",
    flexDirection: "row",
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 20,
    borderColor: "rgba(109, 193, 254, 0.6)",
    left: "-135rem",
    top: "-50rem",
    transform: [{ rotate: "320deg" }]
  }
});

export default withNavigation(SubHeader);
