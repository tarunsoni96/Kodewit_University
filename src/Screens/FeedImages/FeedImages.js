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
import { Transition } from "react-navigation-fluid-transitions";


class FeedImages extends Component {

  state ={
    selectedUriIndex:0
  }
  _renderItem({item, index}) {
    return (
      <>
      <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('photographs_FullView_feeds',{uri:item})}>
      
      <Image
        indicator={ProgressBar}
        source={{uri: item}}
        resizeMode="cover"
        style={{width: '100%', height: 400}}
      />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>FileDownloader(item)} >
      <View style={styles.imageDownload}>
        <CustomText text="Download" size={15} />
      </View>
      </TouchableWithoutFeedback>
      </>
    );
  }

  setImage(uri,index){
    this.setSlideActive(index)
    this._carousel.snapToItem(index)
  }

  setSlideActive(index){
    this.setState({selectedUriIndex:index})

  }

  renderThumbs(){
    const {thumbs} = this.props.navigation.state.params || {};
    let view = []
    thumbs.map((item,index) => {
      view.push(<TouchableWithoutFeedback onPress={()=>this.setImage(item,index)}>

      <View style={{paddingRight:15}}>
        <Image source={{uri:item}} style={{width:55,height:55,borderColor:Colors.accent,borderWidth:this.state.selectedUriIndex == index ? 1 : 0}} />
      </View>
      </TouchableWithoutFeedback>)
    })
return view
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
              onSnapToItem={index => this.setSlideActive(index)}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={global.deviceWidth}
              itemWidth={global.deviceWidth}
            />
          </View>
            <View style={{padding:10}} >
            <View style={{flexDirection:'row',alignItems:'center'}} >

            {this.renderThumbs()}                
            </View>
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
