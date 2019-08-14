import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import Constants from "Helpers/Constants";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import { withNavigation } from "react-navigation";
import HolidayTable from "./components/HolidayTable";

class HolidayCalendar extends Component {
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
            <SubHeader title="Holiday Calendar" type={Constants.header_back} />
          </View>
        </Header>
        <View style={{ width: "100%", flex: 1 }}>
          <ContentContainer animation={'undefined'} style={{}} >
            <View style={{marginTop:10}}>
              <HolidayTable />
            </View>
          </ContentContainer>
        </View>
      </Container>
    );
  }
}

export default withNavigation(HolidayCalendar);
