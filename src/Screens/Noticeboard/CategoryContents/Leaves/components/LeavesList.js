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
import LeavesListItem from './LeavesListItem';
import HelperMethods from '../../../../../Helpers/Methods';
import {ContentConsumer} from '../../../../../AppLevelComponents/Contexts/CxtBoardContent';

let contentContext;
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

  getData = refresh => {
    contentContext.setContentRefresh('');

    this.setState({isApiCall: true});
    getLeaves(refresh)
      .then(resp => {
        this.setState({isApiCall: false, data: resp});
      })
      .catch(() => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderItems = ({item, index}) => {
    return (
      <LeavesListItem
        listRefresher={id => this.removeAndRefreshList(id)}
        item={item}
      />
    );
  };

  removeAndRefreshList(id) {
    let arr = [...this.state.data];
    let index = arr.findIndex(v => v.id == id);
    arr.splice(index, 1);
    HelperMethods.animateLayout();
    this.setState({data: arr},()=>{
      setTimeout(() => {
        
        this.getData(true)
      }, 500);
    })
  }

  render() {
    const {content} = this.props;
    return (
      <ContentConsumer>
        {context => {
          contentContext = context;
          if (contentContext.contentSetOnRefresh == 'Leaves') {
            this.getData(true);
          }
          return (
            <NetworkAwareContent
              data={this.state.data}
              isApiCall={this.state.isApiCall}
              apiFunc={this.getData}>
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index + ''}
                renderItem={this.renderItems}
                extraData={this.state}
              />
            </NetworkAwareContent>
          );
        }}
      </ContentConsumer>
    );
  }
}

export default withNavigation(LeavesList);
