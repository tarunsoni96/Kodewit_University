import React, { Component } from "react";
import { Text, View, FlatList, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import ContentContainerAnimated from "AppLevelComponents/UI/ContentContainerAnimated";
import Bottomsheet from 'AppLevelComponents/UI/Bottomsheet';

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ContentContainer from "AppLevelComponents/UI/ContentContainer";
import NetworkAwareContent from "UniversityComponents/NetworkAwareContent";
import { UserInfoConsumer } from "AppLevelComponents/Contexts/CxtUserInfo";
import HomeworkListItem from "./components/HomeworkListItem";
import { getHomework } from "../../ServiceProviders/ApiCaller";
import BottomsheetHomework from "./components/BottomsheetHomework";
let currentContext
class Homework extends Component {


  state={
    selected:undefined,
    isApiCall:true,
    data:[],
    bottomSheetContent:undefined,
  }
  

  constructor(props) {
    super(props)
  
    this.itemScale = new Animated.Value(1)
  }
  

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {id, class_id} = currentContext.userData.section;
    const {session} = currentContext.userData.student_info;

    this.setState({isApiCall: true});
    getHomework(class_id, id, session)
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
      <TouchableWithoutFeedback onPress={()=>this.openBottomsheet(item)}>
        <Animated.View style={{ padding:20,paddingBottom: 5,transform:[{scale:selected ? this.itemScale : 1}] }}>
          <HomeworkListItem item={item} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  openBottomsheet(eventCard) {
    this.setState({ bottomSheetContent: eventCard }, () => {
      Bottomsheet.openBottomsheet();
    });
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
            <SubHeader title="Homework" type={Constants.header_back} />
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
          {this.state.bottomSheetContent != undefined && (
          <BottomsheetHomework content={this.state.bottomSheetContent} />
        )}
        </View>
      </Container>
      )
                    }}
      </UserInfoConsumer>
    );
  }
}

export default Homework;
