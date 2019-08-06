import React, { Component } from "react";
import { View, Text,FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import CustomText from "AppLevelComponents/UI/CustomText";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NoticeMsgBox } from "../../components/NoticeMsgBox";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import ListItemSyllabus from "./components/ListItemSyllabus";

let data=[
    {courseNo:'342',name:'Product design'},
    {courseNo:'342',name:'Product design'},
    {courseNo:'342',name:'Design Issues'},
    {courseNo:'342',name:'Natural of Materials'},
    
]
class Syllabus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({item,index}) => {
    return(


        <ListItemSyllabus courseNo={item.courseNo} courseName={item.name} />
    )
  }
  render() {
    return (
      <View style={{ width: "100%", flex: 1, alignItems: "flex-start", }}>
        <CustomText
          paddingHorizontal={8}
          size={16}
          font="AvenirLTStd-Heavy"
          style={styles.msgTitle}
          color={Colors.lighter}
          text="Semester 1"
        />
        <View>

        <FlatList 
        data={data}
        renderItem={this.renderItem}
        numColumns={2}
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

export default withNavigation(Syllabus);
