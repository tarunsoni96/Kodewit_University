import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class HolidayCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> HolidayCalendar </Text>
      </View>
    );
  }
}

export default withNavigation(HolidayCalendar);
