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
import ScreenMemory from "AppLevelComponents/UI/ScreenMemory";
import {getToken,getUser,getStudentInfo} from 'ServiceProviders/ApiCaller'
import {storeToken,storeUserInfo} from 'DataManagers/UserDataManager'
import { UserInfoConsumer } from "../../AppLevelComponents/Contexts/CxtUserInfo";

let valObj = {
  email: "tarsoni69@gmail.com",
  password: "qwerty"
};

let currentContext
class Login extends Component {
  state = {
    isApiCall: undefined
  };

  login = () => {
    this.setState({isApiCall:true})
    getToken(valObj.email,valObj.password).then(response => {
    const {access_token} = response
    if(access_token){
      storeToken(access_token).then(()=>{
        this.getUserObj()
      })
    }
    
    }).catch(err => {
    this.setState({isApiCall:'failed'})
    })
  };

  getUserObj(){
    getUser().then(resp => {
      const {id} = resp
      getStudentInfo(id).then(resp => {
        this.setState({isApiCall:false})
        currentContext.setUserData(resp)
        storeUserInfo(resp).then(()=>{
          this.props.navigation.navigate('AppStudent')
        })
      })
    })
  }

  navigateForgotPass = () => {
    this.props.navigation.navigate('forgotPassword')
  }


  render() {
    return (
      <UserInfoConsumer>
        {context => {
        currentContext = context
                        return(
                     
      <ScreenMemory screen='login' >

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
            <Email value={valObj.email}  marginBottom={7} inputValueGetter={text => (valObj.email = text)} />
            <Password value={valObj.password} inputValueGetter={text => (valObj.password = text)} />

            <CustomText
              text="Forgot password?"
              color={Colors.accent}
              onPress={this.navigateForgotPass}
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
      </ScreenMemory>
             
      )
                    }}
      </UserInfoConsumer>

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
