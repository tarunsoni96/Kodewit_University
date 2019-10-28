import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import Carousel from 'react-native-snap-carousel';
import CustomText from 'AppLevelComponents/UI/CustomText'
import SubHeader from 'AppLevelComponents/UI/SubHeader';
import Constants from 'Helpers/Constants';
import 'Helpers/global';
import ContentContainer from 'AppLevelComponents/UI/ContentContainer';
import {withNavigation} from 'react-navigation';
import {Colors} from "UIProps/Colors";
import FileDownloader from 'ServiceProviders/FileDownloader';

class FeedImages extends Component {
  _renderItem({item, index}) {
    return (
      <>
      <Image
        indicator={ProgressBar}
        source={{uri: item}}
        resizeMode="cover"
        style={{width: '100%', height: 400}}
      />
      <TouchableWithoutFeedback onPress={()=>FileDownloader(item)} >
      <View style={styles.imageDownload}>
        <CustomText text="Download" size={15} />
      </View>
      </TouchableWithoutFeedback>
      </>
    );
  }

  render() {
    const {feedTitle, images} = this.props.navigation.state.params || {};
    return (
      <Container style={{flex: 1}} padding={0}>
        <Header>
          <View>
            <SubHeader title={'Class Feed'} type={Constants.header_back} />
          </View>
        </Header>
        <View style={{width: '100%', flex: 1}}>
          <ContentContainer animation={'undefined'} >
          <View>

            <Carousel
              layoutCardOffset={50}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              activeAnimationType="spring"
              ref={c => {
                this._carousel = c;
              }}
              data={images}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={global.deviceWidth}
              itemWidth={global.deviceWidth}
            />
          </View>
            <View style={{padding:10}} >

            <CustomText style={{marginTop:16}} text={feedTitle} color={Colors.black} size={15} />
            </View>
          </ContentContainer>
        </View>
      </Container>
    );
  }
}
const styles = {
  imageDownload:{
    position:'absolute',
    bottom:0,
    zIndex:100,
    width:'100%',
    padding:10,
    backgroundColor:'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
export default withNavigation(FeedImages);
