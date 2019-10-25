import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView, Animated} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import HelperMethods from 'Helpers/Methods';
import ContentContainer from 'AppLevelComponents/UI/ContentContainer';
import {UserInfoConsumer} from '../../AppLevelComponents/Contexts/CxtUserInfo';
import FeedsList from './components/FeedsList';

export class Board extends Component {

  
  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            <Container style={{flex: 1}} padding={0}>
              <Header headerType="main">
                <View>
                  <SubHeader unreadNotifications={true} />
                </View>
              </Header>
              <View style={{width: '100%', flex: 1}}>
                <ContentContainer style={{padding:15}} >
                    <FeedsList />
                </ContentContainer>
              </View>
            </Container>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

export default Board;
