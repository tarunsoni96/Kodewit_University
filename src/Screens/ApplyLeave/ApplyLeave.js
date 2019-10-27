import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView, Animated} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import HelperMethods from 'Helpers/Methods';
import moment from 'moment';

import CustomButton from 'AppLevelComponents/UI/CustomButton';
import Constants from 'Helpers/Constants';
import ContentContainer from 'AppLevelComponents/UI/ContentContainer';
import {withNavigation} from 'react-navigation';
import {applyLeave} from 'ServiceProviders/ApiCaller';
import DateSelector from './components/DateSelector';
import PlainText from '../../AppLevelComponents/UI/FormInputs/PlainText';
import {checkForEmptyKeys} from 'ServiceProviders/InputsNullChecker';
let valObj = {
  fromDate: '',
  toDate: '',
  reason: '',
};

class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall: false,
    };
  }

  submit = () => {
    const {anyEmptyInputs, errorString} = checkForEmptyKeys(valObj);
    if (anyEmptyInputs.length > 0) {
      alert(errorString);
      return;
    }
    this.setState({isApiCall: true});
    const {reason, fromDate, toDate} = valObj;
    applyLeave(reason, fromDate, toDate)
      .then(resp => {
        HelperMethods.snackbar('Leave applied successfully');
        valObj.fromDate=''
        valObj.toDate=''
        this.setState({})
        this.props.navigation.pop()
        this.setState({isApiCall: false, data: resp});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  setEndDate(date) {
    if (!valObj.fromDate) {
      alert('Please select from date first');
      return;
    }
    if (!moment(date).isAfter(valObj.fromDate)) {
      alert('Please select date greater then start date');
      return;
    } else {
      valObj.toDate = date;
      this.setState({});
    }
  }

  setStartDate(date) {
    valObj.fromDate = date;
    this.setState({});
  }
  render() {
    return (
      <Container style={{flex: 1}} padding={0}>
        <Header>
          <View>
            <SubHeader title="Apply Leave" type={Constants.header_back} />
          </View>
        </Header>
        <ContentContainer animation={'undefined'} >
        <View style={{padding: 25,paddingTop:0,paddingBottom:0}}>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              marginTop: 50,
              justifyContent: 'space-between',
            }}>
            <DateSelector
              dateGetter={date => this.setStartDate(date)}
              format={'YYYY-MM-DD'}
              title={valObj.fromDate || 'From Date'}
            />
            <DateSelector
              dateGetter={date => this.setEndDate(date)}
              title={valObj.toDate || 'To Date'}
              disabled={!valObj.fromDate}
              format={'YYYY-MM-DD'}
            />
          </View>

          <View style={{marginTop: 40}}>
            <PlainText
              multiline={true}
              containerStyleAdd={{
                height: 200,
                borderRadius: 10,
                borderColor: '#D2D2D2',
                borderWidth: 1,
              }}
              label="Leave Reason"
              value={valObj.reason}
              inputValueGetter={val => (valObj.reason = val)}
            />
          </View>

          <CustomButton
            onPress={this.submit}
            text="Apply Leave"
            containerStyle={{marginVertical: 20}}
            isApiCall={this.state.isApiCall}
          />

        </View>

        </ContentContainer>
      </Container>
    );
  }
}

export default withNavigation(ApplyLeave);
