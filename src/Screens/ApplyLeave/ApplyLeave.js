import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import { withNavigation } from "react-navigation";
import {applyLeave} from 'ServiceProviders/ApiCaller'
class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isApiCall:false,
        
    };
  }

  render() {
    return (
      <Container style={{ flex: 1 }} padding={0}>
        <Header>
          <View>
            <SubHeader title="Apply Leave" type={Constants.header_back} />
          </View>
        </Header>
        <View style={{ width: "100%", flex: 1 }}>
          <ContentContainer animation={'undefined'} style={{paddingLeft:15}} >
          </ContentContainer>
        </View>
      </Container>
    );
  }
}

export default withNavigation(ApplyLeave);
