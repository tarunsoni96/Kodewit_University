import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import moment from "moment";

import {Colors} from "UIProps/Colors";
import {Card} from 'react-native-elements';
import Fonts from 'UIProps/Fonts';
import {cardStyle} from 'UIProps/Styles';
import CustomText from 'AppLevelComponents/UI/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import HelperMethods from '../../../Helpers/Methods';
import { withNavigation } from 'react-navigation';

let drawItem;
let currentTitle = '';
let currentDate
let targetDate
let days
 class FeedsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateFeed(item){
    const {title,image_path, thumbnail_image_path, created_at} = item;
    this.props.navigation.navigate('feedImages',{feedTitle:title,images:[image_path]})
  }

  render() {
    const {title, thumbnail_image_path, created_at} = this.props.item;

    if (currentTitle != title) {
      currentTitle = title;
      drawItem = true;
    } else {
      drawItem = false;
    }

    if (drawItem) {
        currentDate = new Date().getDate()
        targetDate = moment(created_at).format("DD")
        days = Math.abs(currentDate - targetDate)
      return (
        <TouchableWithoutFeedback onPress={()=>this.navigateFeed(this.props.item)}>
        <View>
          <CustomText size={13} text={HelperMethods.formatDate_Calendar(days)} style={{paddingVertical:12}} color={Colors.black} />
          <Card
            dividerStyle={{height: 0}}
            titleStyle={{padding: 0, marginBottom: 0}}
            containerStyle={{...cardStyle}}>
            <View style={styles.descContainer}>
              <View style={{width: '81%'}}>
                <CustomText
                  text={title}
                  singleLine
                  style={{maxWidth: '91%'}}
                  size={15}
                  color="rgba(0,0,0,0.7)"
                  font={Fonts.heavy}
                />
              </View>
              <Image
                source={{uri: thumbnail_image_path}}
                style={{width: 70, height: 70, borderRadius: 15}}
              />
            </View>
          </Card>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return <View />;
    }
  }
}



const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //   width: "100%"
  },
});
export default withNavigation(FeedsListItem)