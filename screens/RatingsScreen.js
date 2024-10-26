import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard
    } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import PersonComp from '../components/PersonComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

//import cutie from '../assets/cutie.jpg'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const RatingsScreen = ()=>{
    
    const route = useRoute()
    const navigation = useNavigation()
    const people = useSelector(state=>state.helpersState.helpers)

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor
    
    const viewProfile = (person)=>{
        navigation.navigate('Profile', 
            {id:person.id})
    }

    const support = (person)=>{
        navigation.navigate('Support', 
            {id:person.id})
    }

    return(
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"Ratings"} handlePress={()=>navigation.goBack()}/>
                <Text style={{fontSize:0.04*width, color:textColor}}>Top helpers/performers</Text>
                <View style={{flex:1, marginBottom:0.02*height,marginTop:0.02*height}}>
                    <FlatList
                        data={people}
                        keyExtractor={item=>item.id}
                        renderItem={({item, index})=>(
                           <PersonComp person={item} viewProfile={viewProfile} support={support} num={index+1}/>
                        )}
                        contentContainerStyle={{
                            flexGrow: 1,
                            }}
                    />
                </View>
            </View>
    )

}

export default RatingsScreen
