import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList
  } from "react-native";
import FileDownloader from 'ServiceProviders/FileDownloader';
  
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

  download = () => {
    const {attachment} = this.props
    FileDownloader(attachment)
  }

  render() {
    const {title,desc,attachment} = this.props
    return (

        <Card
        dividerStyle={{ height: 0 }}
        titleStyle={{ padding: 0, marginBottom: 0 }}
        containerStyle={{...cardStyle}}
        >

        <View style={styles.descContainer}>
        

      <View style={{width:'91%'}} >
      <CustomText
            text={title}
            singleLine
            style={{ maxWidth: "91%", }}
            size={15}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
            />


            {desc.length > 0 && 
          <CustomText
            text={desc}
            singleLine
            style={{ maxWidth: "91%", }}
            size={15}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
            />
        }

      </View>
          {attachment && 
          <TouchableOpacity onPress={this.download} >
            <Icons lib="Entypo" name="attachment" size={16} />
          </TouchableOpacity>
          }
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

  