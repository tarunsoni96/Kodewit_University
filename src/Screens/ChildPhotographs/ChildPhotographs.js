import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import CustomText from 'AppLevelComponents/UI/CustomText'
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from 'Helpers/Methods'
import {getChildPhotos} from 'ServiceProviders/ApiCaller'
import Constants from "Helpers/Constants";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import Fonts from "UIProps/Fonts";
import { withNavigation } from "react-navigation";
import PhotoItem from "./components/PhotoItem";
import EStyleSheet from 'react-native-extended-stylesheet';
import 'Helpers/global'
import { UserInfoConsumer } from "../../AppLevelComponents/Contexts/CxtUserInfo";
import NetworkAwareContent from "../../UniversityComponents/NetworkAwareContent";
let data = [
  {uri:'https://images.theconversation.com/files/245935/original/file-20181116-194488-19it793.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip'},
  {uri:'https://cdn-01.belfasttelegraph.co.uk/incoming/article37346473.ece/ed9eb/AUTOCROP/w620h342/19238165-1.jpg'},
  {uri:'http://www.shipraamit.com/wp-content/uploads/2014/12/Child-Photography-Delhi-India-320x240.jpg'},
  {uri:'https://rukminim1.flixcart.com/image/704/704/poster/m/j/c/cute-baby-poster-2-pcs-poster-smiling-new-born-infant-child-love-original-imaea2epeytqj8wv.jpeg?q=70'},
  {uri:'https://childdevelopment.com.au/wp-content/uploads/what-is-child-development.jpg'},
  {uri:'https://usercontent1.hubstatic.com/13707636_f520.jpg'},
  {uri:'https://c.ndtvimg.com/2018-10/r5ja5kds_girl-child_625x300_06_October_18.jpg'},

]

let currentContext
let numColumns = 3
const formatData = (data,columns) => {
    const numberOfFullRows = Math.floor(data.length / columns)
    let numberOfEleLastRow = data.length - (numberOfFullRows * columns)
    while(numberOfEleLastRow !== columns && numberOfEleLastRow !== 0){
      data.push({uri:`blank`,})
      numberOfEleLastRow +=1
    }
  return data
} 

class ChildPhotographs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isApiCall:true
    };
  }

  componentWillMount = () => {
    setTimeout(()=>{
      this.setState({})
    },1000)
  };
  
  componentDidMount(){
    this.getData()
  }

  getData = () => {
    const {id,class_id} = currentContext.userData.section
    const {session} = currentContext.userData.student_info;
    this.setState({isApiCall: true});

    getChildPhotos(class_id,id,session).then(resp => {
      alert(JSON.stringify( resp))
      this.setState({isApiCall: false});
    }).catch(err => {
      this.setState({isApiCall: 'failed'});
      
    })
  }

  renderItem = ({item,index}) =>{
    if(item.uri === 'blank'){
      return <View style={[styles.itemStyle,styles.invisibleView]} />
    } else {

      return(
        <PhotoItem uri={item.uri} />
        )
      }
  }

  
  render() {
    return (
      <UserInfoConsumer>
        {context => {
        currentContext = context
                        return(
                            
                            <>
                            <Header>
          <View>
            <SubHeader title="Child Photographs" type={Constants.header_back} />
          </View>
        </Header>
                      <NetworkAwareContent isApiCall={this.state.isApiCall} apiFunc={this.getData} data={this.state.data} >

      <Container style={{ flex: 1 ,}} padding={0}>
        
        <View style={{ width: "100%", flex: 1,}}>
          <ContentContainer animation={'undefined'} style={{}} >
            <CustomText text="June 23" padding={5} paddingHorizontal={10} color='#000' font={Fonts.medium} size={15} />
            <FlatList 
            style={{flex:1}}
            data={formatData(data,numColumns)}
            renderItem={this.renderItem}
            numColumns={numColumns}
            />
          </ContentContainer>
        </View>
      </Container>
      </NetworkAwareContent>
</>
      )
                    }}
      </UserInfoConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  itemStyle:{
    flex:1,
    margin:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height:global.deviceHeight / 5
},

invisibleView:{
  backgroundColor:'transparent'
}
})

export default withNavigation(ChildPhotographs);
