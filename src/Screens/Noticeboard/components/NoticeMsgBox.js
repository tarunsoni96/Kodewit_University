import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation';
import CustomText from 'AppLevelComponents/UI/CustomText'
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from "UIProps/Colors";
export class NoticeMsgBox extends Component {
    render() {

        const {text} = this.props
        return (
            <View style={styles.noticeMsgBox}>

            <CustomText font={'AvenirLTStd-Medium'} style={{lineHeight:23}} size={16} textAlign='left' color={Colors.black} text={text} />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem : global.rem,

  noticeMsgBox:{
    backgroundColor:Colors.noticeMsgBox,
    marginTop:'15rem',
    padding:'10rem',
    
    
    borderRadius: '5rem',
  }

})

export default withNavigation(NoticeMsgBox)
