import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions,TouchableWithoutFeedback  } from 'react-native'
import { updateIsChosen } from '../redux/slices/firstTimeSlice'
import { useDispatch } from 'react-redux'
import {data} from '../constants/data'
import { updateFavorites } from '../redux/slices/favoritesSlice'
import * as SecureStore from 'expo-secure-store';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ChooseScreen = ()=>{
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [selectedTopics, setSelectedTopics] = useState([])
    const dispatch = useDispatch()

    const splitArrays = []
    const data =[
        {name:"Mathematics", newProblems:[]}, 
        {name:"Biology", newProblems:[]},
        {name:"IT/Computer Science", newProblems:[]}, 
        {name:"Economics", newProblems:[]},
        {name:"Art", newProblems:[]}, 
        {name:"Law", newProblems:[]},
        {name:"Chemistry", newProblems:[]}, 
        {name:"African Studies",newProblems:[]},
        {name:"Physics", newProblems:[]}, 
        {name:"Accounting", newProblems:[]},
        {name:"Philosophy", newProblems:[]}, 
        {name:"Business", newProblems:[]}
    ]

    const splitData = [
        {name:"Mathematics", newProblems:[]}, 
        {name:"Biology", newProblems:[]},
        {name:"IT/Computer Science", newProblems:[]}, 
        {name:"Economics", newProblems:[]},
        {name:"Art", newProblems:[]}, 
        {name:"Law", newProblems:[]},
        {name:"Chemistry", newProblems:[]}, 
        {name:"African Studies",newProblems:[]},
        {name:"Physics", newProblems:[]}, 
        {name:"Accounting", newProblems:[]},
        {name:"Philosophy", newProblems:[]}, 
        {name:"Business", newProblems:[]}
    ]
   
    while(splitData.length >0){
        splitArrays.push(splitData.splice(0,4))
    }

    const done = async()=>{
       
            if(selectedTopics.length === 0)
                return
                await SecureStore.setItemAsync("chosen", "true")
                await SecureStore.setItemAsync("chosen_subjects", JSON.stringify(selectedTopics))
            dispatch(updateFavorites(selectedTopics))
            dispatch(updateIsChosen("true"))
    }

    const selectAll = ()=>{
 
        setIsAllSelected(true)
        const newData = []

        data.forEach(topic=>{
            newData.push(topic)
        })

        setSelectedTopics(newData)
    }
    

    const deSelectAll = ()=>{
        setIsAllSelected(false)
        setSelectedTopics([])
    }

    const selectTopic = (item)=>{
        const topic =item.name
        const mappedTopics = selectedTopics.map(item=>item.name)
        
        if(mappedTopics.includes(topic)){
            const updatedSelected = selectedTopics.filter(item=> item.name !== topic)
            setSelectedTopics(updatedSelected)
        }else{
            setSelectedTopics(prev=>[...prev,item])
        }
    }

    return(
        <View style={{flex:1,backgroundColor:"#fefcfe", alignItems:'center',justifyContent:'space-evenly' ,paddingTop:.01*height}}>
            {/* <StatusBarComp/> */}
            <View style={{alignItems:'center'}}>
                <Text style={{color:"#cd17d4", fontSize:.071*width, fontWeight:'bold'}}>Select your favorite</Text>
                <Text style={{color:"#cd17d4", fontSize:.071*width, fontWeight:'bold'}}>subject / topic</Text>
            </View>

            <View style={{width:'100%',  flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View>

                {
                    splitArrays.map((topicArray, ind)=>{
                        return(
                                <View key={ind.toString()} style={{flexDirection:'row',  }}>
                                    {
                                        topicArray.map((item, index)=>{
                                            return (
                                                <TouchableWithoutFeedback key={index+""} onPress={()=>selectTopic(item)}>
                                                    <View style={{backgroundColor:selectedTopics.map(item=>item.name).includes(item.name) ? "#5ea35e" : '#5e88a3', height:0.22*width, width:0.22*width, borderRadius:100, justifyContent:'center', alignItems:'center',  marginTop:(index == 1 || index == 3) ? 10: null, marginLeft:index == 1 ? 8: (index == 2 ? 4 : null), marginRight:index == 2 ? 8: (index == 1 ? 4 : null)}}>
                                                        <Text style={{color:'#ffffff', fontSize:.033*width,}}>{item.name}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                   
                                   
                                </View>

                            )
                            })
                }

                </View>
            </View>

            <View style={{alignItems:'center'}}>
                {
                !isAllSelected ?(
                <TouchableWithoutFeedback
                    onPress={selectAll}
                >
                    <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#5e88a3", marginTop:.035*height}}>
                        <Text style={{color:"#fefefe", fontSize:.025*height}}>Select all</Text>
        
                    </View>
                </TouchableWithoutFeedback>
                ):(

                <TouchableWithoutFeedback  onPress={deSelectAll}>
                    <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#5ea35e", marginTop:.035*height}}>
                        <Text style={{color:"#fefefe", fontSize:.025*height}}>Reset</Text>
                    </View>
                </TouchableWithoutFeedback>
                )
                }

                {
                    selectedTopics.length>0 ?(
                    <TouchableWithoutFeedback onPress={done}>
                        <View onPress={deSelectAll} style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#cd17d4", marginTop:.015*height}}>
                            <Text style={{color:"#fefefe", fontSize:.025*height}}>Done</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    ):(
                        <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#eae8ea", marginTop:.015*height}}>
                            <Text style={{color:"#fefefe", fontSize:.025*height}}>Done</Text>
                        </View>
                    )
                }
            </View>
        </View>

    )
}

export default ChooseScreen