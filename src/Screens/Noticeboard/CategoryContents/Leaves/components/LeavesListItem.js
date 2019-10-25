import React, {Component} from 'react';
import {View} from 'react-native';

import {Card} from 'react-native-elements';
import Fonts from 'UIProps/Fonts';
import {cardStyle} from 'UIProps/Styles';
import {Colors} from 'UIProps/Colors';
import CustomText from 'AppLevelComponents/UI/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';

let approvedColor = '#4A9618';
export default class LeavesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDates() {
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
          text={`10/10/2019`}
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
          text={`10/10/2019`}
          size={11}
          textAlign="left"
          color={Colors.black}
          font={Fonts.light}
        />
      </>
    );
  }

  render() {
    const {title, desc, attachment, className, date} = this.props;
    return (
      <Card
        dividerStyle={{height: 0}}
        titleStyle={{padding: 0, marginBottom: 0}}
        wrapperStyle={{width: '100%'}}
        containerStyle={{width: '100%', ...cardStyle}}>
        <View style={styles.datesContainer}>{this.renderDates()}</View>

        <View style={styles.descContainer}>
          <CustomText
            text={`Winnie, Winnie Winnie Winnie Winnie Winnie`}
            size={11}
            textAlign="left"
            color={'#8D8D8D'}
            font={Fonts.medium}
          />
        </View>

        <View style={styles.status}>
          <View style={styles.circle} />
          <CustomText
            text={`Approved`}
            size={11}
            textAlign="left"
            color={approvedColor}
            paddingHorizontal={10}
            font={Fonts.medium}
          />
        </View>
      </Card>
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
});
