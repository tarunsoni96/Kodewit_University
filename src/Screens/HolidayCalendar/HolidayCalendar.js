import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import Constants from "Helpers/Constants";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import { withNavigation } from "react-navigation";
import HolidayTable from "./components/HolidayTable";
import {getHolidays} from 'ServiceProviders/ApiCaller'
import NetworkAwareContent from "../../UniversityComponents/NetworkAwareContent";
class HolidayCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isApiCall:true
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({isApiCall: true});
    getHolidays()
      .then(resp => {
        this.setState({isApiCall: false, data: resp});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'})
      });
  };


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
        <NetworkAwareContent data={this.state.data} isApiCall={this.state.isApiCall} apiFunc={this.getData} >
            <View style={{marginTop:10}}>
              <HolidayTable data={this.state.data} />
            </View>
        </NetworkAwareContent>
          </ContentContainer>
        </View>
      </Container>
    );
  }
}

export default withNavigation(HolidayCalendar);
