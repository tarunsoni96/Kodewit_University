import React, { Component } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { personaContainer,inputContainerStyle,labelStyle } from "UIProps/Styles";
import "Helpers/global";

import HelperMethods from "Helpers/Methods";
import {
  PersonaBuildConsumer,
} from "AppLevelComponents/Contexts/CxtPersonaBuild";
import Container from "AppLevelComponents/UI/Container";
import InputNoSpecialChars from "AppLevelComponents/UI/FormInputs/InputNoSpecialChars";
import PlainText from "AppLevelComponents/UI/FormInputs/PlainText";

let currentContext
let valObj = {
  designation:'',
department:'',
experience:'',
education:'',
almaMatter:'',
}
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderSwiper: false,
      designation:''
    };
  }

  componentWillMount = () => {
    this.renderSwiper();
  };

  renderSwiper() {
    setTimeout(() => {
      HelperMethods.animateLayout();
      this.setState({ renderSwiper: true });
    }, 400);
  }

  componentDidMount() {
    currentContext.setUserDetailObj(valObj)
  }
  

  render() {
    return (
      <PersonaBuildConsumer>
        {context => {
          currentContext = context
          return (
            <Container  padding={0} contentPadding={0}>
              <View style={[personaContainer,{padding:14}]} >
                <InputNoSpecialChars inputValueGetter={val => this.setState({designation:val})  } label='Designation' />
                <InputNoSpecialChars inputValueGetter={val => this.setState({department:val})  } label='Department' />
                <PlainText inputValueGetter={val => this.setState({experience:val})  } label='Experience' />
                <InputNoSpecialChars inputValueGetter={val => this.setState({education:val})  } label='Education' />
                <InputNoSpecialChars inputValueGetter={val => this.setState({almaMatter:val})  } label='Alma Matter' />
              </View>
            </Container>
          );
        }}
      </PersonaBuildConsumer>
    );
  }
}
