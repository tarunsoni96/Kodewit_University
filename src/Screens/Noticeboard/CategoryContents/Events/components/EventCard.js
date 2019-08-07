import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList
  } from "react-native";
  
import { Card } from "react-native-elements";
import Fonts from "UIProps/Fonts";
import {cardStyle} from "UIProps/Styles";
import {Colors} from "UIProps/Colors";
import Icons from "AppLevelComponents/UI/Icons";
import CustomText from "AppLevelComponents/UI/CustomText";
import EStyleSheet from 'react-native-extended-stylesheet';
import AntDesign from "react-native-vector-icons/AntDesign";
export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {title,desc} = this.props
    return (

        <Card
        dividerStyle={{ height: 0 }}
        titleStyle={{ padding: 0, marginBottom: 0 }}
        title={title}
        containerStyle={cardStyle}
        >

        <View style={styles.descContainer}>
          <CustomText
            text={desc}
            singleLine
            style={{ maxWidth: "88%" }}
            size={15}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
            />
          <TouchableOpacity>
            <Icons lib="Entypo" name="attachment" size={16} />
          </TouchableOpacity>
        </View>
      </Card>
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
    //   width: "100%"
    }
  });

  