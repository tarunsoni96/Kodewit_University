import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from 'AppLevelComponents/UI/Icons';
import HelperMethods from 'Helpers/Methods'
import {Colors} from 'UIProps/Colors';
import CustomText from 'AppLevelComponents/UI/CustomText';
import Datepicker from 'AppLevelComponents/UI/Datepicker';
class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickDate: false,
      datePicked:''
    };
  }

  selectDate() {
    this.setState({pickDate: true});
  }

  closeDatePicker() {
    this.setState({pickDate: false});
  }

  setDate(date){
    const {title,format,dateGetter} = this.props;
    this.setState({pickDate:false})
    dateGetter(date)
  }

  render() {
    const {title,format,disabled} = this.props;
    return (
      <>
        <TouchableOpacity onPress={() => !disabled && this.selectDate()}>
          <View style={styles.container}>
            <CustomText text={title} color={Colors.lighter} size={13} />
            <Icons lib="AntDesign" color={Colors.accent} name="calendar" />
          </View>
        </TouchableOpacity>
        <Datepicker
          showIcon={false}
          showText={false}
          format={format}
          openModal={this.state.pickDate}
          dateGetter={dateSelected => this.setDate(dateSelected)}
        />
      </>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 6,
    width: 180,
    borderRadius: 10,
    borderColor: '#D2D2D2',
    borderWidth: 1,
  },
};

export default DateSelector;
