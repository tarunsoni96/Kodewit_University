import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import Icons from "AppLevelComponents/UI/Icons";
import HelperMethods from 'Helpers/Methods'

import { Colors } from "UIProps/Colors";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import Carousel from "react-native-snap-carousel";
import "Helpers/global";
import UserCard from "../components/UserCard";
import InfoTeacher from "../components/InfoTeacher";
import InfoStudent from "../components/InfoStudent";
import InfoParent from "../components/InfoParent";
import NextBtn from "../components/NextBtn";
import {
  PersonaBuildConsumer,
  CxtPersonaBuild,
} from "AppLevelComponents/Contexts/CxtPersonaBuild";


let currentContext
let data = [
  {
    user: "Teacher",
    img: require("assets/img/teacher.png"),
    imgSelected: require("assets/img/teacher_selected.png"),
  },
  {
    user: "Student",
    img: require("assets/img/student.png"),
    imgSelected: require("assets/img/student_selected.png"),
  },

  {
    user: "Parent",
    img: require("assets/img/parent.png"),
    imgSelected: require("assets/img/parent_selected.png"),
  }

];

let bgColor = "#f7f7f9";
class UserSelection extends Component {
  state = {
    selected: "Teacher"
  };

  _renderItem({ item, index }) {
    const { selected } = this.state;
    return (
      <UserCard
        user={item.user}
        selected={selected == item.user}
        imgUnselected={item.img}
        img={item.imgSelected}
      />
    );
  }

  componentDidMount() {
    currentContext.setUserType(this.state.selected)
  }

  setUserSelection(index) {
    let user = data[index].user;
    currentContext.setUserType(user)
    this.setState({ selected: user });
  }

  renderUserInfo() {
    // HelperMethods.animateLayout()
    switch (this.state.selected) {
      case "Teacher":
        return <InfoTeacher />;

        case 'Student':
            return <InfoStudent />;

            case 'Parent':
            return <InfoParent />;

    }
  }

  render() {
    return (
      <CxtPersonaBuild
      navigation={this.props.navigation}
      onBackPress={this.onBackPress}
    >

<PersonaBuildConsumer>
          {context => {
            currentContext = context
            
            return (
          
      
      <Container style={{backgroundColor:bgColor,marginBottom:35}} scroll={true} padding={0}>
        <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
        <View style={styles.subContainer}>
         
          

          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Carousel
              layoutCardOffset={50}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              onSnapToItem={i => {
                this.setUserSelection(i);
              }}
              activeAnimationType="spring"
              ref={c => {
                this._carousel = c;
              }}
              data={data}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={global.deviceWidth}
              itemWidth={230}
            />
          </View>

          <View style={{ alignItems: "flex-start", marginTop: 35 }}>
            <CustomText
              text={`A ${this.state.selected} can:`}
              color={Colors.black}
              size={17}
              font={Fonts.heavy}
            />

            <View style={[{ padding: 5, marginTop: 10 }]}>
              {this.renderUserInfo()}
            </View>

            
          </View>

        </View>
             
      </Container>
  )
}}
      </PersonaBuildConsumer>
     
      </CxtPersonaBuild>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  subContainer: {
    
    padding: 14,
    width: "100%",
    backgroundColor: bgColor,
    // flex:1
  },

  containerInputs: {
    // alignSelf:'flex-start',
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
    flex: 1
  },

  containerNxtBtn:{
    elevation:20,
    width:'100%',
    backgroundColor:'#f6f6ff',
    paddingTop:10,
    
  }
});

export default withNavigation(UserSelection);
