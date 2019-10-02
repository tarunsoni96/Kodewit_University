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
import BottomsheetCircular from "./components/BottomsheetCircular";
import {getCircular} from 'ServiceProviders/ApiCaller'
import NetworkAwareContent from "UniversityComponents/NetworkAwareContent";
import { UserInfoConsumer } from "../../../../AppLevelComponents/Contexts/CxtUserInfo";
import EventCard from "../Events/components/EventCard";

let currentContext
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall:true,
      bottomSheetContent: undefined,
      data:[],
    };
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {
    this.setState({isApiCall:true})
    const {id, class_id} = currentContext.userData.section;
    const {session} = currentContext.userData.student_info;

    getCircular(class_id,id,session).then(resp => {
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

  renderItems = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.openBottomsheet(item)}>
        <View style={{ paddingBottom: 5 }}>
          <EventCard title={item.title} desc={item.summary} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <UserInfoConsumer>
        {context => {
        currentContext = context
                        return(
                            
                      

      <NetworkAwareContent data={this.state.data} isApiCall={this.state.isApiCall} apiFunc={this.getData} >

      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
        
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            keyExtractor={(item, index) => index + ""}
            renderItem={this.renderItems}
          />
        </View>

        {this.state.bottomSheetContent != undefined && (
          <BottomsheetCircular content={this.state.bottomSheetContent} />
        )}
      </View>
      </NetworkAwareContent>
      )
                    }}
      </UserInfoConsumer>
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
