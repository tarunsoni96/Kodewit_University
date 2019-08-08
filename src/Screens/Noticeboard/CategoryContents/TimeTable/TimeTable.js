import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import HelperMethods from 'Helpers/Methods'
import DayItem from "./components/DayItem";
import Timeline from "./components/Timeline";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";

let data = [
  { day: "Mo", data: [] },
  { day: "Tu", data: [] },
  { day: "We", data: [] },
  { day: "Th", data: [] },
  { day: "Fr", data: [] },
  { day: "Sa", data: [] },
  { day: "Su", data: [] }
];

let timelineData = [
  {'Mo':[
  { time: "09:00 AM", lectureLength: 3, subject: "Design Thinking" },
  { lectureLength: 3, subject: "Lab" },
  { lectureLength: 4, subject: "Break" },
  { lectureLength: 2, subject: "Physics" },
  { lectureLength: 1, subject: "Physics" }]},

  {'Tu':[
    { time: "10:00 AM", lectureLength: 6, subject: "Tuesday" },
    { lectureLength: 2, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},

  {'We':[
    { time: "10:00 AM", lectureLength: 1, subject: "Wednesday" },
    { lectureLength: 2, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},

  {'Th':[
    { time: "10:00 AM", lectureLength: 4, subject: "Thursday" },
    { lectureLength: 2, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},

  {'Fr':[
    { time: "10:00 AM", lectureLength: 4, subject: "Friday" },
    { lectureLength: 5, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},

  {'Sa':[
    { time: "10:00 AM", lectureLength: 1, subject: "Saturday" },
    { lectureLength: 4, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},

  {'Su':[
    { time: "10:00 AM", lectureLength: 3, subject: "Sunday" },
    { lectureLength: 2, subject: "Lab" },
    { lectureLength: 2, subject: "Break" },
    { lectureLength: 4, subject: "Physics" },
    { lectureLength: 2, subject: "Physics" }
  ]},
];

class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: "Mo",
      timelineData:timelineData[0].Mo,
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.setDay(item.day,index)}>
        <DayItem selected={this.state.selectedDay == item.day} day={item.day} />
      </TouchableWithoutFeedback>
    );
  };

  setDay(day,index) {
    HelperMethods.animateLayout()
    this.setState({ selectedDay: day,timelineData:timelineData[index][day] });
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
        <View style={{ alignItems: "center", paddingBottom: 30 }}>
          <FlatList
            data={data}
            horizontal
            extraData={this.state}
            renderItem={this.renderItem}
          />

              <Timeline timelineData={this.state.timelineData} />
          
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

export default withNavigation(TimeTable);
