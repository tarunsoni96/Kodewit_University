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
import Email from "AppLevelComponents/UI/FormInputs/Email";
import Password from "AppLevelComponents/UI/FormInputs/Password";

let valObj = {
  email: "dummy@g.com",
  password: "dummy"
};
 class Login extends Component {
  state = {
    isApiCall: undefined
  };

  login = () => {
    this.props.navigation.navigate('AppStudent')
  }
  render() {
    return (
      <Container scroll={true}>
        <StatusBar backgroundColor={Colors.contentCard} barStyle="dark-content" />
        {/* <View style={{flex:1,width:'100%',backgroundColor:'green',alignItems:'center'}}> */}
            
        <View style={styles.subContainer}>
          <Logo />
          <CustomText
            text="University"
            color={Colors.black}
            size={17}
            style={{ paddingTop: 10, marginBottom: 30 }}
            font={Fonts.heavy}
          />
          <Divider />
        </View>

        <View style={styles.containerInputs}>
          <CustomText
            text="Welcome"
            color={Colors.accent}
            size={22}
            font={Fonts.heavy}
            />
          <Divider width={20} />
          <Email inputValueGetter={text => (valObj.email = text)} />
          <Password inputValueGetter={text => (valObj.password = text)} />

            <CustomText text="Forgot password?" color={Colors.accent} font={Fonts.regular} style={{alignSelf:'flex-end',marginVertical:10}} />
          <CustomButton
            onPress={this.login}
            text="SIGN IN"
            containerStyle={{marginVertical: 30,}}
            isApiCall={this.state.isApiCall}
            />
        </View>
            {/* </View> */}
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  subContainer: {
    alignItems: "center",
    flex:1,
    width: "100%",
    
  },

  containerInputs: {
    // alignSelf:'flex-start',
    width: "100%",
    alignItems: "flex-start",
    marginTop:20,
    flex: 1
  }
});

export default  withNavigation(Login);
