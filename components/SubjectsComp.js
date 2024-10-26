import React from "react";
import { View, Text, TouchableOpacity, 
    Dimensions, Platform, FlatList, 
    SafeAreaView, Image, TouchableWithoutFeedback  } from 'react-native'
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../constants/data'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SubjectsComp =({openSubject,chosenTopics,userId})=>{

    const problems = useSelector(state=>state.problemsState.allProblems)
    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    //const inputTextCol = theme.inputTextCol
    const placeholderCol = theme.placeholderCol
    const placeholderColor = theme.placeholderColor

    const iconBackCol = backgroundColor === "#0e0c0c" ? headingColor:'#f6f6f6'
    
    const getProblemsNum =(subject ,userId)=>{

        const enteredSubject= problems.filter(item=>item.subject === subject)
        let counter = 0;
        enteredSubject.forEach(problem => {
            const views = problem.views
            const creator = problem.creator
            if(!views.includes(userId) && creator !== userId){
                counter++
            }
        });
      
        return counter

    }


    return(
        <SafeAreaView style={{flex:1, marginTop:0.04*height, alignItems:'center'}}>
            {
                chosenTopics.length > 1 ?(
                    <FlatList
                        data={chosenTopics}
                        key={"_"}
                        keyExtractor={item=>item.name}
                        numColumns={2}
                        renderItem={({item,index})=>(
                            <TouchableWithoutFeedback 
                                onPress={()=>openSubject(item)}
                            >
                                <View style={{width:0.42*width, height:0.42*width, backgroundColor:iconBackCol, borderRadius:0.08*width, marginRight:parseInt(index)%2 === 0 ?0.025*width : 0,  marginLeft:parseInt(index)%2 === 1 ? 0.025*width : 0, marginVertical:0.025*width, alignItems:'center', justifyContent:'center'}}>
                                    <View/>
                                    <View >
                                        <Image source={data.filter(topic=>topic.name === item.name)[0].image} style={{width:0.28*width, height:0.28*width}}/>
                                    </View>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:0.04*width, color:'#292525', marginTop:0.015*width}}>{item.name}</Text>
                                    {getProblemsNum(item.name ,userId) >0 ?(
                                        <View style={{position:'absolute',width:'18%',height:'18%', borderRadius:0.5*width, left:'80%',top:0, backgroundColor:'red', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{fontSize:0.04*width, color:'#f6f6f6'}}>{getProblemsNum(item.name ,userId)}</Text>
                                        </View> 
                                    ):(<View/>)
                                    }

                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    />

                ):(
                    <FlatList
                    data={chosenTopics}
                    key={"*"}
                    keyExtractor={item=>item.name}
                    renderItem={({item,index})=>(
                        <TouchableWithoutFeedback 
                                onPress={()=>openSubject(item)}
                            >
                                <View style={{width:0.82*width, height:0.82*width, backgroundColor:'#f6f6f6', borderRadius:0.08*width, alignItems:'center', justifyContent:'center'}}>
                                    <View/>
                                    <View >
                                        <Image source={data.length === 0? null:data.filter(topic=>topic.name === item.name)[0].image} style={{width:0.58*width, height:0.58*width}}/>
                                    </View>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:0.04*width, color:'#292525', marginTop:0.015*width}}>{item.name}</Text>
                                    {getProblemsNum(item.name ,userId) >0 ?(
                                        <View style={{position:'absolute',width:'18%',height:'18%', borderRadius:0.5*width, left:'80%',top:0, backgroundColor:'red', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{fontSize:0.1*width, color:'#f6f6f6'}}>{getProblemsNum(item.name ,userId)}</Text>
                                        </View> 
                                    ):(<View/>)
                                    }

                                </View>
                        </TouchableWithoutFeedback>
                        )}
                    />
                )
            }

        </SafeAreaView>
        // <View style={{backgroundColor:"#fefcfe", height:0.19*height,justifyContent:'space-between', paddingTop: Platform.OS == 'android' ? 0.03*height : 0.06*height}}>
        //         <View style={{alignItems:'flex-end'}}>
        //             <TouchableOpacity>
        //                 <Entypo name="dots-three-vertical" size={0.06*width} color={"#cd17d4"} />
        //             </TouchableOpacity>
        //         </View>
        //         <View style={{alignItems:'flex-start'}}>
        //             <Text style={{fontSize:.08*width, color:"#292525", fontWeight:'bold'}}>{heading}</Text>
        //         </View>
          
        // </View>
    )


}

export default SubjectsComp