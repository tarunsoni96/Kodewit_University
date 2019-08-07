import React, { Component } from "react";
import { View, TouchableOpacity,FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import DayItem from "./components/DayItem";
import Timeline from "./components/Timeline";

let data=[
    {day:'Mo',data:[]},
    {day:'Tu',data:[]},
    {day:'We',data:[]},
    {day:'Th',data:[]},
    {day:'Fr',data:[]},
    {day:'Sa',data:[]},
    {day:'Su',data:[]},
    
]

let timelineData = [
  {time:'09:00 AM',lectureLength:1,subject:'Design Thinking'},
  {lectureLength:3,subject:'Lab'},
  { lectureLength:1,subject:'Break'},
  { lectureLength:1,subject:'Physics'},
  
]
class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay:'Mo',
    };
  }

  renderItem = ({item,index}) => {
    return(

        <TouchableOpacity onPress={()=>this.setDay(item.day)}>

        <DayItem selected={this.state.selectedDay == item.day} day={item.day} />
        </TouchableOpacity>
    )
  }

  setDay(day){
    this.setState({selectedDay:day})
    
  }
  render() {
    return (
      <View style={{ width: "100%",  }}>
        
<View style={{alignItems: 'center',paddingBottom:40}}>

        <FlatList 
        data={data}
        horizontal
        extraData={this.state}
        renderItem={this.renderItem}
        />

        <Timeline timelineData={timelineData} />
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
