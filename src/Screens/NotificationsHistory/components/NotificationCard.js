import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";

import { Card } from "react-native-elements";
import Fonts from "UIProps/Fonts";
import { cardStyle } from "UIProps/Styles";
import HelperMethods from 'Helpers/Methods'
import { Colors } from "UIProps/Colors";
import Icons from "AppLevelComponents/UI/Icons";
import CustomText from "AppLevelComponents/UI/CustomText";
import EStyleSheet from "react-native-extended-stylesheet";
import AntDesign from "react-native-vector-icons/AntDesign";
export default class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title,date, desc, fullView ,className} = this.props;
    return (
      <TouchableWithoutFeedback>

      <Card
        dividerStyle={{ height: 0 }}
        titleStyle={{ padding: 0, marginBottom: 0 }}
        containerStyle={[cardStyle,{marginVertical:0}]}
      >

      <View>
      <View style={{flexDirection:'row',marginBottom:13 ,alignItems:'center',justifyContent:'space-between'}} >
      
       <CustomText
              text={`Created: ${HelperMethods.formatDate_DMY(date)}`}
              size={11}
              textAlign='right'
              color="rgba(0,0,0,0.6)"
              font={Fonts.medium}
              />
      </View>


        <View style={styles.descContainer}>
          <CustomText
            text={`Class ${className}: `+desc + " "}
            singleLine={!fullView}
            style={{ maxWidth: "92%",width:'92%', marginRight: 5 }}
            size={15}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
          />

          <TouchableOpacity>
            <Icons
              lib="Material"
              name={
                !fullView  ? "unfold-more-horizontal" : "unfold-less-horizontal"
              }
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
      </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  descContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -6.5
  }
});
