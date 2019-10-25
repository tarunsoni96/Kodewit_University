import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';
import {getLeaves} from 'ServiceProviders/ApiCaller';
import NetworkAwareContent from 'UniversityComponents/NetworkAwareContent';

let currentContext;
 class LeavesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall: true,
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({isApiCall: true});
    getLeaves()
      .then(resp => {
        console.log(resp);
        this.setState({isApiCall: false, data: resp});
      })
      .catch(() => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderItems = ({item, index}) => {
    return (
      <View />
    );
  };

  render() {
    const {content} = this.props;
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
  }
}

export default withNavigation(LeavesList)