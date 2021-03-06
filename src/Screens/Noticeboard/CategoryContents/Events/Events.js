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
import NetworkAwareContent from "../../../../UniversityComponents/NetworkAwareContent";
import { ContentConsumer } from "../../../../AppLevelComponents/Contexts/CxtBoardContent";

let currentContext
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall:false,
      bottomSheetContent: undefined,
      data:[],
    };
  }

  componentDidMount(){
    setTimeout(() => { //wait for split second to fetch from saved data
      this.getData()
    }, 0);
  }

  getData = (refresh) => {
    currentContext.setContentRefresh('')
    this.setState({isApiCall:true})
    getEvents(refresh).then(resp => {
      this.setState({isApiCall:false,data:resp})
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
          <EventCard date={item.created_at} attachment={item.file_path} title={item.event_name} desc={item.event_summary} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <ContentConsumer>
        {context => {
        currentContext = context
        if(context.contentSetOnRefresh == 'Events'){
          this.getData(true)
        }
                        return(
                            
                      
      <NetworkAwareContent data={this.state.data} isApiCall={this.state.isApiCall} apiFunc={this.getData} >

      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            keyExtractor={(item, index) => index + ""}
            renderItem={this.renderEvents}
          />
        </View>

        {this.state.bottomSheetContent != undefined && (
          <BottomsheetEvents content={this.state.bottomSheetContent} />
        )}
      </View>
      </NetworkAwareContent>
      )
                    }}
      </ContentConsumer>

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
