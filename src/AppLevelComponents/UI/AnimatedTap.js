import React,{Component} from 'react'
import {View,Text,Image,TouchableWithoutFeedback,Animated} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { thisExpression } from '@babel/types';

let negativeScale = 0.8
let defaultScale = 1
let animDuration = 200
export default class AnimatedTap extends Component {


    state ={
        animatePress: new Animated.Value(1)
    }

    scaleInHold(){
        Animated.spring(this.state.animatePress,{
            toValue : negativeScale - 0.1,
            duration:animDuration,
            useNativeDriver:true,
        }).start(()=>{
            this.cutInAnimation()
        })
    }

    animateIn(){
        Animated.spring(this.state.animatePress,{
            toValue : negativeScale,
            duration:animDuration,
            useNativeDriver:true,
        }).start(()=>{
            
        })
        this.cutInAnimation()
       
    }
    
    cutInAnimation(){
        setTimeout(()=>{
            const {onPress} = this.props
            onPress()
            this.animateOut()
        },120)
    }
    animateOut(){
        // this.props.pressHandler()
        
        Animated.spring(this.state.animatePress,{
            toValue : defaultScale,
            friction:3,
            tension:40,
            useNativeDriver:true,
            duration:animDuration
        }).start(()=>{
            
        })
    }



    render(){
        return(
            <TouchableWithoutFeedback 
            onLongPress={()=>this.scaleInHold()}
            onPress={()=>this.animateIn()}
            
            >
            <Animated.View style={{
                transform: [{
                    scale:this.state.animatePress
                }]
            }}>

            {this.props.children}
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    container:{
        borderWidth:1,
        borderColor:global.primaryColor,
        margin:5,
        borderRadius:5,
        
    }
}