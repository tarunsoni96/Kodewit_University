import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomText from 'AppLevelComponents/UI/CustomText'
import Icons from 'AppLevelComponents/UI/Icons'
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import * as Animatable from 'react-native-animatable';

let iconSize = 15
const InfoTeacher = () => {
    return (
        <Animatable.View animation='fadeIn' useNativeDriver={true} duration={800}  style={{ flex:1,width:'100%'}}>
        <View style={styles.infoPoints}>
                <Icons
                  lib="Material"
                  name="account-group-outline"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Create groups for different tasks or events'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>


              <View style={styles.infoPoints}>
                <Icons
                  lib="AntDesign"
                  name="notification"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Create new announcements for students'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>



              <View style={styles.infoPoints}>
                <Icons
                  lib="Entypo"
                  name="documents"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Invite anyone in the group'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>


              </Animatable.View>
    )
}

const styles = EStyleSheet.create({
    infoPoints: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
      },
})

export default InfoTeacher
