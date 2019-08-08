import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import HelperMethods from "Helpers/Methods";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ListItem from "./components/ListItem";


let data = [
  {
    sem: "Semester 1",
    fee: "52,323",
    status: "Paid",
    isLocked: false,
  },
  {
    sem: "Semester 2",
    fee: "22,323",
    status: "Paid",
    isLocked: false,
  },

  {
    sem: "Semester 3",
    fee: "50,323",
    status: "pending",
    isLocked: false,
  },

  {
    sem: "Semester 4",
    isLocked: true
  },

  {
    sem: "Semester 5",
    isLocked: true
  },

  {
    sem: "Semester 6",
    isLocked: true
  },

  {
    sem: "Semester 7",
    isLocked: true
  },
];

class Fees extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.setDay(item.fee, index)}>
          

        <ListItem sem={item.sem} fee={item.fee} status={item.status} isLocked={item.isLocked} />
          
      </TouchableWithoutFeedback>
    );
  };

  setDay(day, index) {
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
        <View style={{  padding: 20,paddingTop:0 }}>
          <FlatList
            data={data}
            extraData={this.state}
            renderItem={this.renderItem}
          />

        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  categoryScroller: {
    marginTop: "22rem",
    paddingBottom: 10
  },

  grid: {
    width: "100%"
  },
  gridCol: {
    marginHorizontal: "8rem",
    justifyContent: "space-between"
  },

  row: {
    flex: 0
  },

  msgTitle: {
    marginVertical: 10,

    fontSize: 15
  }
});

export default withNavigation(Fees);
