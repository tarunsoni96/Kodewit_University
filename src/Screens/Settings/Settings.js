import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import ContentContainerAnimated from "AppLevelComponents/UI/ContentContainerAnimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import { withNavigation } from "react-navigation";
import ButtonRenderer from './components/ButtonsRenderer'
import Divider from "AppLevelComponents/UI/Divider";
import SettingsMiscBtns from "./components/SettingsMiscBtns";


let buttons = [
    // {name:'Notification Settings',btnInfo:'Choose which push notification to receive',icon:'bell',iconLib:'Entypo'},
    // {name:'Account Settings',btnInfo:'Change email, Password. Enhance Security.',icon:'lock',iconLib:'Entypo'},
    // {name:'Application Settings',btnInfo:'Customise application settings as per you.',icon:'cellphone-iphone',iconLib:'Material'},
    {name:'Logout',icon:'logout',iconLib:'Material'},
    
]

let buttonsMisc = [
    {name:'Privacy Policy'},
    {name:'Terms of Use'},
    {name:'App Version'},
    {name:'Report a Bug'},
    {name:'Support'},
    
]

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container style={{ flex: 1 }} padding={0}>
        <Header>
          <View>
            <SubHeader title="Settings" type={Constants.header_back} />
          </View>
        </Header>
        <View style={{ width: "100%", flex: 1 }}>
          <ContentContainer animation={'undefined'} style={{paddingLeft:15}} >
            <ButtonRenderer buttons={buttons} />
            <Divider style={{marginBottom: 15,}} />
            <SettingsMiscBtns buttons={buttonsMisc} />
          </ContentContainer>
        </View>
      </Container>
    );
  }
}

export default withNavigation(Settings);
