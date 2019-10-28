import React, {Component} from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from 'AppLevelComponents/UI/CustomButton';
import {Colors} from 'UIProps/Colors';
import CustomText from 'AppLevelComponents/UI/CustomText';
import Fonts from 'UIProps/Fonts';
import HelperMethods from 'Helpers/Methods';
import FileDownloader from 'ServiceProviders/FileDownloader';
import DownloadButton from '../../../../../AppLevelComponents/UI/DownloadButton';

export default class ListItemSyllabus extends Component {

  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <CustomText
            text={`Date: ${HelperMethods.formatDate_DMY(item.created_at)}`}
            size={15}
            color={Colors.dark}
            font={Fonts.regular}
          />
          <CustomText
            text={item.title}
            size={15}
            style={{marginTop: 5}}
            color={Colors.black}
            font={Fonts.heavy}
          />

          <View style={{marginTop: 14}}>
            <DownloadButton
            url={item.file_path}
              containerStyle={styles.buttonStyle}
              buttonStyle={styles.buttonStyle}
              textStyle={{fontSize: 12, textAlign: 'center'}}
              text="download curriculam"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  container: {
    padding: 10,
    width: '46.4%',
    margin: 7,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: Colors.noticeMsgBox,
  },

  buttonStyle: {
    height: 35,
    borderRadius: 5,
  },
});
