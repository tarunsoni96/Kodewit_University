import React, { Component } from "react";
import {Keyboard,View} from 'react-native'
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "react-native-elements";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import {Colors} from "UIProps/Colors";
import Constants from 'Helpers/Constants'

import AntDesign from 'react-native-vector-icons/AntDesign'

export default class CustomButton extends Component {

  onPress(){
    let { onPress} = this.props
    if(!onPress){
      alert('Provide onpress prop')
      return
    }
    onPress(); Keyboard.dismiss()
  }

  render() {
    let isRightIcon 
    let isTransparent
    let { text, isApiCall,width,containerStyle,textColor,color,type,screenSource } = this.props;
    let rightArrowBtnStyle = {
      justifyContent:'space-between',
      alignItems: 'center',
      paddingLeft: 17,
      
    }
    switch(type){
      case Constants.RIGHTARROWBTN_SQUARE:
        case Constants.RIGHTARROWBTN :
          isRightIcon = true
          break

          case Constants.BTNTRANSPARENT:
            isTransparent = true
            break

          default:
            isRightIcon= false
            break

    }
      let borderRadius = type == Constants.RIGHTARROWBTN_SQUARE ? 7 : styles.button.borderRadius
    return (
      <Button
      screenSource={screenSource}
        disabled={isApiCall}
        onPress={() => this.onPress() }
        title={text}
        icon={isRightIcon&&
          <AntDesign
            name="arrowright"
            size={30*global.rem}
            color="white"
            style={{paddingHorizontal:8}}
          />
        }
        textColor={textColor || Colors.white}
        iconRight={isRightIcon}
        raised={HelperMethods.isPlatformAndroid()}
        containerStyle={{width:width*global.rem || '100%',borderRadius:borderRadius,...containerStyle }}
        buttonStyle={[styles.button,{backgroundColor:color ||  styles.button.backgroundColor },isTransparent && {backgroundColor:'transparent',color:Colors.darker} ,isRightIcon && {...rightArrowBtnStyle,borderRadius:borderRadius,}]}
        textAlign='center'
        
        loading={isApiCall}
      />
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  button: {
    width: "$columnWidth",
    height: "44rem",
    backgroundColor: Colors.accent,
    borderRadius: 4,
    
  }
});
