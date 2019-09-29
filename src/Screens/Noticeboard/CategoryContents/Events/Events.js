import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import { withNavigation } from "react-navigation";

import Bottomsheet from "AppLevelComponents/UI/Bottomsheet";
import BottomsheetEvents from "./components/BottomsheetEvents";
import EventCard from "./components/EventCard";
import {getEvents} from 'ServiceProviders/ApiCaller'
let data = [
  {
    title: "Title",
    description: "A good descripton looks good to read and see"
  },
  {
    title: "Title",
    description: "A good descripton looks good to read and see"
  }
];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall:false,
      bottomSheetContent: undefined
    };
  }

  getData(){
    this.setState({isApiCall:true})
    getEvents().then(resp => {
      this.setState({isApiCall:false})
    }).catch(()=>{
      this.setState({isApiCall:'failed'})
    })
  }


  downloadAttachment() {
    alert("dasd");
  }

  openBottomsheet(eventCard) {
    this.setState({ bottomSheetContent: eventCard }, () => {
      Bottomsheet.openBottomsheet();
    });
  }

  renderEvents = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.openBottomsheet(item)}>
        <View style={{ paddingBottom: 5 }}>
          <EventCard title={item.title} desc={item.description} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index + ""}
            renderItem={this.renderEvents}
          />
        </View>

        {this.state.bottomSheetContent != undefined && (
          <BottomsheetEvents content={this.state.bottomSheetContent} />
        )}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  card: {
    width: "100%",
    alignItems: "flex-start"
  },

  descContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default withNavigation(Events);
