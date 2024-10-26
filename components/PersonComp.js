import React from "react";
import { View, Text, TouchableOpacity,
     Dimensions, Platform, Image  } from 'react-native'
import { StatusBar } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const PersonComp=({person,viewProfile,support,num})=>{
    return(
        <View style={{marginBottom:10}}>
            <Image
                source={{uri:person.profilePic}}
                style={{width:0.9*width,height:0.6*width}}
            />                    
            <View style={{width:0.9*width,height:0.6*width,justifyContent:'space-between', alignItems:'center', position:'absolute'}}>
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', justifyContent:'center', alignItems:'center', marginTop:'5%',borderRadius:0.04*width, position:'relative',height:0.1*width, width:0.4*width}}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={{color:'#ffffff', fontSize:0.045*width,paddingVertical:0.02*width,}}>{person.username}</Text>
                <View style={{width:0.06*width, height:0.06*width, backgroundColor:'#d41732', borderRadius:0.06*width, alignItems:'center', justifyContent:'center', position:'absolute', left:'90%', bottom:'65%'}}>
                    <Text style={{color:'#ffffff', fontSize:0.035*width}}>{num}</Text>
               </View>
                </View>
                <View style={{width:'95%', height:'25%', backgroundColor:'rgba(0, 0, 0, 0.5)', borderRadius:0.03*width, marginBottom:'2%',flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:0.03*width}}>
                        <TouchableOpacity onPress={()=>support(person)} style={{alignItems:'center'}}>
                        <FontAwesome name='support' size={0.04*width} color='#ffffff'/>
                        <Text style={{color:'#ffffff', fontSize:0.034*width, marginTop:0.01*width}}>Support</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>viewProfile(person)} style={{alignItems:'center'}}>
                            <MaterialCommunityIcons name='account-eye' size={0.04*width} color='#ffffff'/>
                            <Text style={{color:'#ffffff', fontSize:0.034*width, marginTop:0.01*width}}>View profile</Text>
                        </TouchableOpacity>
                </View>
            </View>                               
        </View>
    )
}

export default PersonComp