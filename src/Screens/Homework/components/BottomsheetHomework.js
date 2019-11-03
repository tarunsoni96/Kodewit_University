import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import HelperMethods from 'Helpers/Methods'
import Fonts from "UIProps/Fonts";
import Bottomsheet from "AppLevelComponents/UI/Bottomsheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import EStyleSheet from "react-native-extended-stylesheet";
import DownloadButton from "AppLevelComponents/UI/DownloadButton";

export default class BottomsheetHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  downloadAttachment = () => {
    const { content } = this.props
        
    
  };

  render() {
    const { content } = this.props
    return (
      <Bottomsheet>
        <View style={{ padding: 20, paddingBottom: 5, paddingTop: 10 }}>
        <View style={{padding:10}}>
       


<View style={styles.titleContainer} >

<CustomText
            text={content.description}
            singleLine={true}
            
            size={15}
            color="rgba(0,0,0,08)"
            font={Fonts.medium}
            />

<CustomText
      text={`Created: ${HelperMethods.formatDate_DMY(content.created_at)}`}
      size={12}
      textAlign='right'
      color="rgba(0,0,0,0.6)"
      font={Fonts.medium}
      />
</View>

        </View>
         
          <DownloadButton text='Download homework' containerStyle={{marginBottom:60}} url={content.file_path} />
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
  },

  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  }

});
