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
import {UserInfoConsumer} from '../../../../AppLevelComponents/Contexts/CxtUserInfo';
import EventCard from '../Events/components/EventCard';
import LeavesList from './components/LeavesList';
import LeavesListItem from './components/LeavesListItem';

let currentContext;
class Leaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

 
  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            
              <View style={{flex: 1,width:'100%',padding:13, alignItems: 'center'}}>
                <View style={{width:'100%'}} >
                <LeavesListItem />
                  <LeavesList />
                </View>
              </View>
            
          );
        }}
      </UserInfoConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  card: {
    width: '100%',
    alignItems: 'flex-start',
  },

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default withNavigation(Leaves);
