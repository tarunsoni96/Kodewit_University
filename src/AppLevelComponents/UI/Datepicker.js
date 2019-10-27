import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import HelperMethods from 'Helpers/Methods';
import {Colors} from 'UIProps/Colors';
import moment from "moment";


export class Datepicker extends Component {
  state = {
    date: undefined,
  };

  constructor(props) {
    super(props);

    this.datepicker = null;
  }

  componentWillMount() {
    let date = HelperMethods.formatDate_DMY(new Date());
    this.setState({date});
  }

  componentWillReceiveProps(nextProps) {
    const {openModal} = nextProps;
    if (openModal) {
      this.datepicker.onPressDate();
    }
  }
  setDate(date) {
    const {dateGetter} = this.props;
    this.setState({date});
    dateGetter(date);
  }
  
  render() {
    const {format, showText, showIcon,dateGetter} = this.props;
    return (
      <DatePicker
        ref={datepicker => (this.datepicker = datepicker)}
        style={styles.calendarDob}
        mode="date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format={format || 'DD/MM/YYYY'}
        minDate={moment(new Date()).format(format)}
        hideText={true}
        showIcon={false}
        customStyles={{
          dateText: {
            color: '#000',
          },
          btnTextConfirm: {
            color: Colors.accent,
          },
        }}
        onDateChange={date => {
          this.setDate(date);
        }}
      />
    );
  }
}

const styles = {
  calendarDob: {
    borderWidth: 0,
  },
};

export default Datepicker;
