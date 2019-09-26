import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import { Colors } from "UIProps/Colors";
import { personaContainer } from "UIProps/Styles";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import Divider from "AppLevelComponents/UI/Divider";
import Fonts from "UIProps/Fonts";
import Email from "AppLevelComponents/UI/FormInputs/Email";
import Password from "AppLevelComponents/UI/FormInputs/Password";
import {getToken} from 'ServiceProviders/ApiCaller'

let valObj = {
  email: "dummy@g.com",
  password: "dummy"
};
class Login extends Component {
  state = {
    isApiCall: undefined
  };

  login = () => {
    this.setState({isApiCall:true})
    getToken().then(response => {
    this.setState({isApiCall:false})
    alert(response)
    })
    // this.props.navigation.navigate("AppStudent");
  };


  render() {
    return (
      <Container padding={0} contentPadding={0} scroll={true}>
        <StatusBar
          backgroundColor={Colors.contentCard}
          barStyle="dark-content"
        />
        <View style={[personaContainer, { padding: 15 }]}>
          <View style={styles.subContainer}>
            <Logo />
            <CustomText
              text="University"
              color={Colors.black}
              size={17}
              style={{ marginTop: 10, marginBottom: 30 }}
              font={Fonts.heavy}
            />
            <Divider style={{ width: "100%" }} />
          </View>

          <View style={styles.containerInputs}>
            <View style={{ marginTop: 15,marginBottom:13 }}>
              <CustomText
                text="Welcome"
                color={Colors.accent}
                size={22}
                font={Fonts.heavy}
              />
              <Divider style={{ width: 20 }} />
            </View>
            <Email marginBottom={7} inputValueGetter={text => (valObj.email = text)} />
            <Password inputValueGetter={text => (valObj.password = text)} />

            <CustomText
              text="Forgot password?"
              color={Colors.accent}
              font={Fonts.medium}
              style={{ alignSelf: "flex-end", marginVertical: 10 }}
            />
            <CustomButton
              onPress={this.login}
              text="Sign in"
              containerStyle={{ marginVertical: 20 }}
              isApiCall={this.state.isApiCall}
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
    alignItems: "center"
  },

});

export default withNavigation(Login);
