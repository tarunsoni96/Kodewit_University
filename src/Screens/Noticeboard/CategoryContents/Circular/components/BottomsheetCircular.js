import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import Bottomsheet from "AppLevelComponents/UI/Bottomsheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import EStyleSheet from "react-native-extended-stylesheet";
import DownloadButton from "../../../../../AppLevelComponents/UI/DownloadButton";

export default class BottomsheetCircular extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAttachments = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.openBottomsheet(item)}>
        <View style={{ paddingVertical: 10, marginTop: 5 }}>
          <Attachments attachmentName={item.name} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  downloadAttachment = () => {
    const { content } = this.props
        
    
  };

  render() {
    const { content } = this.props
    return (
      <Bottomsheet>
        <View style={{ padding: 20, paddingBottom: 5, paddingTop: 10 }}>
        <View style={{padding:10}}>
        <CustomText
            text={content.title}
            singleLine={true}
            
            size={18}
            color="rgba(0,0,0,0.7)"
            font={Fonts.heavy}
            />

            <CustomText
            text={content.summary}
            style={{marginTop:5}}
            size={17}
            color="rgba(0,0,0,0.7)"
            font={Fonts.medium}
            />

        </View>
         
          <DownloadButton url={content.file_path} />
        </View>
      </Bottomsheet>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width: "100%",
    paddingBottom: 25,
    flexDirection: "row",
    alignItems: "center"
  },

  column: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    padding: 10,
    paddingRight: 0
  },

  infoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },

  colRight: {
    paddingLeft: 60,
    height: "100%"
  }
});
