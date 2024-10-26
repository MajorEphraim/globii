import React, { useEffect } from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import HeaderComp from '../components/HeaderComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import avatar from '../assets/avatar.png'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ProfileScreen = ()=>{

    const route = useRoute()
    const profileId=route.params.id
    const profiles = useSelector(state=>state.helpersState.helpers)
    
    const profile = profiles.filter(item=>item.id === profileId)[0]
    const navigation = useNavigation()

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const borderColor = theme.borderColor
    
  
    return(    
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"Profile"} 
                            handlePress={()=>navigation.goBack()} isCheck={null} 
                           />
                <View style={{flex:1, justifyContent:'space-between'}}>
                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <View style={{height:0.05*width}}/>
                            <View style={{backgroundColor:borderColor, borderRadius:0.14*width}}>
                                <Text style={{color:"#ffffff", fontSize:0.05*width, paddingHorizontal:0.05*width, paddingVertical:0.0050*width}}>{profile.username}</Text>
                            </View>
                        </View>

                        <View style={{height:0.15*width, width:0.15*width, backgroundColor:"#f40b0b", borderRadius:100, justifyContent:'center', alignItems:'center'}}>
                            <>
                                <Text style={{color:"#ffffff", fontSize:0.03*width,}}>Points</Text>
                                <Text style={{color:"#ffffff", fontSize:0.035*width, fontWeight:"bold"}}>{profile.points}</Text>
                            </>
                        </View>
                    </View >

                    <View style={{height:0.7*width, width:"100%"}}>
                        <Image style={{height:"100%", width:"100%"}} source={{uri:profile.profilePic}} />
                    </View>

                    <View style={{borderWidth:1.5, borderColor:borderColor, borderStyle:'dotted', borderRadius:10}}>
                        <Text style={{color:textColor, fontSize:0.04*width, padding:0.02*width}}>{profile.bio}</Text>
                    </View>

                    <View style={{marginBottom:0.075*width}}>
                    <Text style={{color:textColor, fontSize:0.043*width, marginBottom:8, marginLeft:5}}>Problems</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:0.075*width}}>
                        <View style={{alignItems:'center'}}>
                        <Ionicons name='create' size={0.06*width} color={themeColor}/>
                            <Text style={{color:textColor, fontSize:0.038*width,}}>Created</Text>
                            <Text style={{color:textColor, fontSize:0.038*width,}}>{profile.problemsCreated}</Text>

                        </View>
                        <View style={{alignItems:'center'}}>
                            <MaterialIcons name='approval' size={0.06*width} color={themeColor}/>
                            <Text style={{color:textColor, fontSize:0.038*width,}}>Solved</Text>
                            <Text style={{color:textColor, fontSize:0.038*width,}}>{profile.problemsSolved}</Text>
                        </View>
                    </View>
                    </View>
                </View>
            </View>
    )

}

export default ProfileScreen
