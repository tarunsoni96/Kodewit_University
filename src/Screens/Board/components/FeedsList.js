import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView, Animated} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import HelperMethods from 'Helpers/Methods';
import Constants from 'Helpers/Constants';
import ContentContainer from 'AppLevelComponents/UI/ContentContainer';
import {withNavigation} from 'react-navigation';
import {getFeedsFromPhotos} from 'ServiceProviders/ApiCaller';
import {UserInfoConsumer} from 'AppLevelComponents/Contexts/CxtUserInfo';
import NetworkAwareContent from 'UniversityComponents/NetworkAwareContent';
import FeedsListItem from './FeedsListItem';

let currentContext;
export class FeedsList extends Component {
  state = {
    data: [],
    isApiCall: false,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {id, class_id} = currentContext.userData.section;
    const {session} = currentContext.userData.student_info;
    this.setState({isApiCall: true});

    getFeedsFromPhotos(class_id, id, session)
      .then(resp => {
        console.log(resp);
        this.setState({isApiCall: false, data: resp});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderItems = ({item, index}) => {
    return <FeedsListItem data={this.state.data} item={item} />;
  };

  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            <NetworkAwareContent
              data={this.state.data}
              isApiCall={this.state.isApiCall}
              apiFunc={this.getData}>
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index + ''}
                renderItem={this.renderItems}
              />
            </NetworkAwareContent>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

export default FeedsList;
