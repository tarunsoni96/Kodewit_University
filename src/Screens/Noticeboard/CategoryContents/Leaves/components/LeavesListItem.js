import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {deleteLeaveReq} from 'ServiceProviders/ApiCaller';
import {Card} from 'react-native-elements';
import Fonts from 'UIProps/Fonts';
import {cardStyle} from 'UIProps/Styles';
import {Colors} from 'UIProps/Colors';
import CustomText from 'AppLevelComponents/UI/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import HelperMethods from '../../../../../Helpers/Methods';
import Loader from '../../../../../AppLevelComponents/UI/Loader';

let approvedColor = '#4A9618';
let pendingColor = '#ff9548';
let rejectedColor = 'red';
export default class LeavesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall: false,
    };
  }

  renderDates() {
    const {
      start_date,
      end_date,
      desc,
      attachment,
      className,
      date,
    } = this.props.item;

    return (
      <>
        <CustomText
          text={`From  `}
          size={11}
          textAlign="left"
          color="rgba(0,0,0,0.6)"
          font={Fonts.light}
        />

        <CustomText
          text={HelperMethods.formatDate_DMY(start_date)}
          size={11}
          textAlign="left"
          color={Colors.black}
          font={Fonts.heavy}
        />

        <CustomText
          text={`To  `}
          size={11}
          textAlign="left"
          style={{marginLeft: 36}}
          color="rgba(0,0,0,0.6)"
          font={Fonts.light}
        />

        <CustomText
          text={HelperMethods.formatDate_DMY(end_date)}
          size={11}
          textAlign="left"
          color={Colors.black}
          font={Fonts.heavy}
        />
      </>
    );
  }

  deleteLeave() {
    const {reason, status, id} = this.props.item;
    const {listRefresher} = this.props;
    if (status == 'Pending') {
      HelperMethods.snackbar('Delete this leave request?', 'Delete', () => {
        this.setState({isApiCall: true});
        deleteLeaveReq(id)
          .then(resp => {
            if (resp) {
              listRefresher(id);
            }
            this.setState({isApiCall: false});
          })
          .catch(err => {
            this.setState({isApiCall: 'failed'});
          });
      });
    }
  }

  getStatusColor() {
    const {status} = this.props.item;
    switch (status) {
      case 'Pending':
        return pendingColor;

      case 'Rejected':
        return rejectedColor;

      default:
        return approvedColor;
    }
  }
  render() {
    const {reason, status} = this.props.item;
    let statusColor = this.getStatusColor();
    return (
      <TouchableWithoutFeedback onPress={() => this.deleteLeave()}>
        <Card
          dividerStyle={{height: 0}}
          titleStyle={{padding: 0, marginBottom: 0}}
          wrapperStyle={{width: '100%'}}
          containerStyle={{width: '100%', ...cardStyle}}>

          {this.state.isApiCall && 
          <View style={styles.loaderOverlay}>
            <Loader />
          </View>
          }
          <View style={styles.datesContainer}>{this.renderDates()}</View>

          <View style={styles.descContainer}>
            <CustomText
              text={reason}
              size={13}
              textAlign="left"
              color={'#8D8D8D'}
              font={Fonts.medium}
            />
          </View>

          <View style={styles.status}>
            <View style={[styles.circle, {backgroundColor: statusColor}]} />
            <CustomText
              text={status}
              size={11}
              textAlign="left"
              color={statusColor}
              paddingHorizontal={10}
              font={Fonts.medium}
            />
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  descContainer: {
    width: '100%',
    padding: 13,
    borderRadius: 10,
    marginVertical: 13,
    backgroundColor: '#E9E9E9',
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: approvedColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loaderOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:7,

  },
});
