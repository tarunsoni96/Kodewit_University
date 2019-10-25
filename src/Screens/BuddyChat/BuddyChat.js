import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import {Colors} from 'UIProps/Colors';
import {Header} from 'AppLevelComponents/UI/Header';
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import ContentContainer from 'AppLevelComponents/UI/ContentContainer';
import {FloatingAction} from 'react-native-floating-action';
import Icons from 'AppLevelComponents/UI/Icons';
import HelperMethods from 'Helpers/Methods';
import CustomText from 'AppLevelComponents/UI/CustomText';

export default class BuddyChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ContentContainer>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Image
            source={require('assets/img/Chatbot.png')}
            style={{width: 140, height: 140}}
          />
          <CustomText
            text="This Feature is Coming Soon"
            style={{marginTop: 20}}
            size={16}
            color={Colors.black}
          />
        </View>
      </ContentContainer>
    );
  }
}
