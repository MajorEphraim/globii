import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform, 
        TouchableWithoutFeedback, FlatList
    } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavorites } from '../redux/slices/favoritesSlice.js';
import chooseFavorites from '../functions/chooseFavorites.js';
import * as SecureStore from 'expo-secure-store';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

import { data } from '../constants/data.js'

const Favorite = ({isVisible, setIsVisible, setIsLoading, modalTopics})=>{
    const userId = useSelector(state=>state.authState.userToken)
    const favorites = useSelector(state=>state.favoritesState.favorites)
    const [checked, setChecked] = useState(modalTopics.length ===0 ? favorites :  modalTopics);
    const dispatch = useDispatch()



    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    const inputTextCol = theme.inputTextCol
    const placeholderCol = theme.placeholderCol

    const iconCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":backgroundColor

    useEffect(()=>{
        if(modalTopics.length >0){
            setChecked(modalTopics)
        }
    },[modalTopics])

    const handleCheck=(item)=>{
        const name = item.name
        const filteredChecked = checked.map(item=>item.name)
        if(filteredChecked.includes(name)){
            setChecked(prev=>prev.filter(item=>item.name != name))
        }else{
            setChecked(prev=>[...prev, item])
        }
    }

    const update = async()=>{
        if(checked.length ===0){
            return
        }
        
        try {
          
            setIsLoading(true)
            if(userId){
                await chooseFavorites(checked,userId, favorites)
            }
            await SecureStore.setItemAsync("chosen_subjects", JSON.stringify(checked));
            dispatch(updateFavorites(checked))
            setIsVisible(false)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
    }
    
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', padding:25, }}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:0.094*height, alignItems:'center'}}>
                
                </View>
                <View style={{height:0.65*height, width:"100%",backgroundColor, borderRadius:10, padding:25,}}>
                    <View style={{ flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontSize:0.057*width, color:headingColor, }}>My favorite topics</Text>
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={item=>item.name}
                        style={{marginTop: 45, marginBottom:30}}
                        renderItem={({item})=>(
                            <TouchableWithoutFeedback onPress={()=>handleCheck(item)}>
                               <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
                                {
                                    checked.map(item=>item.name).includes(item.name) ? <MaterialCommunityIcons name='checkbox-marked-outline' size={0.065*width} color={themeColor}/>:
                                    <MaterialCommunityIcons name='checkbox-blank-outline' size={0.065*width} color={themeColor}/>
                                }
                                    <Text style={{fontSize:0.05*width, color:headingColor,}}>{item.name}</Text>
                              </View>
                            </TouchableWithoutFeedback>
                    )}
                    />
                </View>
                <View>
                <TouchableWithoutFeedback onPress={update}>
                        <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor, marginTop:.035*height}}>
                            <Text style={{color:iconCol, fontSize:.025*height}}>Update</Text>
                        </View>
                </TouchableWithoutFeedback>
                </View>
            </View>  
        </Modal>
    )
}

export default Favorite