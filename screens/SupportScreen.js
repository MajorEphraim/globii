import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard
    } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import PersonComp from '../components/PersonComp'
import Donate from '../modals/Donate'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SupportScreen = ()=>{
    
    const route = useRoute()
    const navigation = useNavigation()
    const[isVisible, setIsVisible] = useState(false)
    const people = useSelector(state=>state.helpersState.helpers)
    const profileId = route.params.id

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor

    const goBack = ()=>{
        navigation.goBack()
    }

    const person = people.filter(item=>item.id === profileId)[0]
    const textSize = 0.044*width
    const bottomMargin = 0.04*height
  
    return(
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={""} handlePress={()=>navigation.goBack()}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                    <View>
                        <View style={{flexDirection:'column', alignItems:'center', marginBottom:bottomMargin}}>
                            <Text style={{fontSize:textSize, color:textColor}}>{person.username} is one of  our countless individuals</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>on our platform who tirelessly dedicate their</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>time and skills to help others. Their guidance</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>assets to our community.</Text>
                        </View>

                        <View style={{flexDirection:'column', alignItems:'center', marginBottom:bottomMargin}}>
                            <Text style={{fontSize:textSize, color:textColor}}>We kindly invite you to consider making a</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>donation to support their efforts. Your</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>contribution, no matter how small, can</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>make a significant difference and enable</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>these generous individuals</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>to continue offering their assistance.</Text>
                        </View>

                        <View style={{flexDirection:'column', alignItems:'center', marginBottom:bottomMargin}}>
                            <Text style={{fontSize:textSize, color:textColor}}>It's a beautiful opportunity to give back</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>to those who make this platform a helpful</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>and welcoming place for all.</Text>
                        </View>

                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Text style={{fontSize:textSize, color:textColor}}>Thank you for your generosity and</Text>
                            <Text style={{fontSize:textSize, color:textColor}}>continued support!"</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(true)}>
                            <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor, marginBottom:0.06*height}}>
                                <Text style={{color:btnTextColor, fontSize:.025*height}}>Proceed</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Donate isVisible={isVisible} setIsVisible={setIsVisible} person={person} goBack={goBack}/>
            </View>
    )

}

export default SupportScreen
