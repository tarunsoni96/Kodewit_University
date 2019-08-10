import React, { Component, Fragment } from "react";
import { View, Picker } from "react-native";
import "Helpers/global";
import { PowerTranslator } from "react-native-power-translator";
import HelperMethods from "Helpers/Methods";
import { Colors } from "UIProps/Colors";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import { withNavigation } from "react-navigation";
import EStyleSheet from 'react-native-extended-stylesheet';
import {

  PersonaBuildConsumer,
} from "AppLevelComponents/Contexts/CxtPersonaBuild";


export default class NextBtn extends Component {
    render() {
        return (
          <PersonaBuildConsumer>
            {context => {
              
              let currentIndex = context.step
    
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    flex:1
                  }}
                >
                  {context.step > 0 && 
                  <CustomButton
                  containerStyle={{
                    flex:0.4,
                    height:30,
                      paddingLeft:  20,
                    }}
                    isRightIcon={true}
                    icon='arrowleft'
                    color={Colors.dark}
                    onPress={() => {context.handleBackBtn(); this.props.swipe('back') } }
                    
                  />
    
                  }
                  <CustomButton
                  isApiCall={undefined}
                    containerStyle={{
                      flex:1,
                      height:30,
                      paddingHorizontal:  20,
                    }}
                    onPress={() => {context.handleNxtBtn(); this.props.swipe('next') }}
                    text={'Next'}
                    width={170}
                  />
                </View>
              );
            }}
          </PersonaBuildConsumer>
        );
      }
    }

const styles = EStyleSheet.create({

})