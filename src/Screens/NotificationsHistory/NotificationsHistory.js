import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import ContentContainerAnimated from "../../AppLevelComponents/UI/ContentContainerAnimated";
import NotificationCard from "./components/NotificationCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ContentContainer from "../../AppLevelComponents/UI/ContentContainer";
import NetworkAwareContent from "../../UniversityComponents/NetworkAwareContent";
import {getMessages} from 'ServiceProviders/ApiCaller'
import { UserInfoConsumer } from "../../AppLevelComponents/Contexts/CxtUserInfo";
let data = [
  {
    title: "Happy Birthday!",
    description: "A good descripton looks good to read and see, A good descripton looks good to read and see,A good descripton looks good to read and see"
  },
  {
    title: "Bacha ponch gya h",
    description: "A good descripton looks good to read and see, A good descripton looks good to read and see,,descripton looks good to read and see,descripton looks good to read and see"
  },

  {
    title: "New title animation test",
    description: "A good descripton looks good to read and see, A good descripton looks good to read and see,A good descripton looks good to read and see, A good descripton looks good to read and see,A good descripton looks good to read and see, A good descripton looks good to read and see"
  }
];

let currentContext
class NotificationsHistory extends Component {


  state={
    selected:undefined,
    isApiCall:true,
    data:[],

  }

  constructor(props) {
    super(props)
  
    this.itemScale = new Animated.Value(1)
  }
  

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {id} = currentContext.userData;
    this.setState({isApiCall: true});
    getMessages(id)
      .then(resp => {
        console.log(resp)
        this.setState({isApiCall: false, data: resp});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'})
      });
  };
  

  renderItems = ({ item, index }) => {
    let selected = item.title == this.state.selected
    return (
      <TouchableWithoutFeedback onPress={()=>this.toggleFullView(item.message)}>
        <Animated.View style={{ padding:20,paddingBottom: 5,transform:[{scale:selected ? this.itemScale : 1}] }}>
          <NotificationCard className={currentContext.userData.section.class.class_number} date={item.created_at} fullView={this.state.selected == item.message} title={item.title} desc={item.message} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  toggleFullView(title){
    let springConfig  = {
      friction:3,
      tension:30,
      toValue:1.044,
    }
    Animated.spring(this.itemScale,{
      toValue:1,
      duration:400,
    }).start()

    setTimeout(()=>{

    HelperMethods.animateLayout()
    this.setState({selected:this.state.selected == title ? '' : title},()=>{

      const {selected} = this.state
      const isSelected = selected == title
      if(!isSelected){
        Animated.spring(this.itemScale,{
          
          duration:1000,
          ...springConfig,
        }).start()
      } else {
        Animated.spring(this.itemScale,{
          duration:1000,
          ...springConfig,
        }).start()
      }
    })
  },130)
  }


  render() {
    return (

      <UserInfoConsumer>
        {context => {
        currentContext = context
                        return(
                            
                      
      <Container style={{ flex: 1 }} padding={0}>
        <Header>
          <View>
            <SubHeader title="Notifications" type={Constants.header_back} />
          </View>
        </Header>
        <View style={{ width: "100%", flex: 1 }}>
          
          <ContentContainer animation={'undefined'} style={{}} >
          <NetworkAwareContent data={this.state.data} isApiCall={this.state.isApiCall} apiFunc={this.getData}  >

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => index + ""}
            renderItem={this.renderItems}
          />
          </NetworkAwareContent>
          </ContentContainer>
        </View>
      </Container>
      )
                    }}
      </UserInfoConsumer>
    );
  }
}

export default NotificationsHistory;
