import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import {Colors} from 'UIProps/Colors';
import {Header} from 'AppLevelComponents/UI/Header';
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import ContentContainerAnimated from 'AppLevelComponents/UI/ContentContainerAnimated';
import {FloatingAction} from 'react-native-floating-action';

import {
  BoardContentProvider,
  ContentConsumer,
} from 'AppLevelComponents/Contexts/CxtBoardContent';
import CategoriesRenderer from './components/CategoriesRenderer';
import {withNavigation} from 'react-navigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icons from 'AppLevelComponents/UI/Icons';
import HelperMethods from 'Helpers/Methods';
const actions = [
  {
    text: 'Homework',
    name: 'bt_hw',
    icon: <Icons size={17} lib="Material" name="pencil-outline" color="#fff" />,
    position: 2,
  },
  {
    text: 'I-Card',
    name: 'bt_card',
    icon: <Icons size={17} lib="AntDesign" name="idcard" color="#fff" />,
    position: 1,
  },
  {
    text: 'Child Photographs',
    name: 'bt_photos',
    icon: <Icons size={17} lib="Fontisto" name="photograph" color="#fff" />,
    position: 3,
  },

  {
    text: 'Holiday Calendar',
    name: 'bt_hlCalendar',
    icon: <Icons size={17} lib="AntDesign" name="calendar" color="#fff" />,
    position: 3,
  },
];
class Noticeboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFabOpen: false,
    };
  }

  handleFabBtn(state, context) {
    const {isActive} = state;
    context.pauseContentContainerAnimation(undefined);
    this.setState({isFabOpen: !isActive});
  }

  onBackPress() {
    if (this.state.isFabOpen) {
      this.setState({isFabOpen: false});
    } else {
      HelperMethods.appExitPrompter();
    }
  }

  handleActionTap(name) {
    switch (name) {
      case 'bt_hw':
        alert('TBD');
        break;

      case 'bt_photos':
        this.props.navigation.navigate('Photos');
        break;

      case 'bt_card':
        this.props.navigation.navigate('iCard');
        break;

      case 'bt_hlCalendar':
        this.props.navigation.navigate('HolidayCalendar');

        break;
    }
  }
  componentWillMount(){
    
  }
  render() {
    return (
        <ContentConsumer>
          {context => {
            return (
              <Container
                onBackPress={() => this.onBackPress()}
                style={{flex: 1}}
                scroll={false}
                padding={0}>
                <Header headerType="main">
                  <SubHeader unreadNotifications={true} />
                  <CategoriesRenderer data={context.categoriesData} />
                </Header>
                <View style={{width: '100%', flex: 1, zIndex: 1}}>
                  <ContentContainerAnimated>
                    {context.contentView}
                  </ContentContainerAnimated>
                </View>

                <FloatingAction
                  actions={actions}
                  animated={true}
                  color={Colors.accent}
                  floatingIcon={
                    <Icons
                      size={17}
                      lib="Fontisto"
                      name={this.state.isFabOpen ? 'close-a' : 'more-v-a'}
                      color="#fff"
                    />
                  }
                  color={Colors.accent}
                  onStateChange={state => this.handleFabBtn(state, context)}
                  // openOnMount={true}
                  active={this.state.isFabOpen}
                  onPressItem={name => {
                    this.handleActionTap(name);
                  }}
                />
              </Container>
            );
          }}
        </ContentConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  categoryScroller: {
    marginTop: '22rem',
    paddingBottom: 10,
  },

  grid: {
    width: '100%',
  },
  gridCol: {
    marginHorizontal: '8rem',
    justifyContent: 'space-between',
  },

  row: {
    flex: 0,
  },

  msgTitle: {
    marginTop: '15rem',

    fontSize: 15,
  },
});
export default withNavigation(Noticeboard);
