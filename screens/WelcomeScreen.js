import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback  } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const WelcomeScreen = ()=>{
    const [textColor, setTextColor] = useState("#fefcfe")
    const [textColor2, setTextColor2] = useState("#fefcfe")

    const dispatch = useDispatch()
    const navigation = useNavigation()

    setTimeout(()=>{
        setTextColor("#3c3c3c")
    },1000)

    setTimeout(()=>{
        setTextColor2("#3c3c3c")
    },2000)

    const agree =async()=>{
        try {
            await SecureStore.setItemAsync("agreed", "true")
            dispatch(updateIsAgreed("true"))
            navigation.navigate("Choose")
            
        } catch (error) {
            console.log(error.message)
        }

    }

    
    return(
        <View style={{flex:1,backgroundColor:"#fefcfe", alignItems:'center',justifyContent:'space-evenly' ,paddingTop:.01*height}}>
            {/* <StatusBarComp/> */}
            <Text style={{color:"#cd17d4", fontSize:.071*width, fontWeight:'bold'}}>Hello</Text>
            
            <View>
                <View style={{alignItems:'center', backgroundColor:'transparent'}}>
                    {
                        ["Be a part of the community","that solves problems for those who","who needs a helping hand, also"].map(item=>{
                            return <Text key={item} style={{color:textColor, fontSize:.058*width, fontWeight:'bold', marginBottom:.01*height}}>{item}</Text>
                        })
                    }
                </View>

                <View style={{alignItems:'center', marginTop:.05*height}}>
                {
                        ["Get your problems solved by","using this app."].map(item=>{
                            return <Text key={item} style={{color:textColor2, fontSize:.058*width, fontWeight:'bold', marginBottom:.01*height}}>{item}</Text>
                        })
                    }
                </View>
            </View>

            <View style={{alignItems:'center'}}>
                <TouchableWithoutFeedback>
                    <View>
                        <Text style={{color:"#3c3c3c", fontSize:12, fontWeight:'bold'}}>Terms of use</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={agree}>
                    <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#cd17d4", marginTop:.035*height}}>
                        <Text style={{color:"#fefefe", fontSize:.025*height}}>I agree</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>

    )
}

export default WelcomeScreen