import React, { useState } from "react";
import { View, Text, TouchableOpacity, 
        Dimensions,TouchableWithoutFeedback, Image  } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {functions, httpsCallable} from '../firebase/configs'
import { useDispatch, useSelector } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SolutionComp =({number,solution,solver,setIsVisible, openComments})=>{
    const viewSolution = httpsCallable(functions, 'viewSolution')
    const approveSolution = httpsCallable(functions, 'approveSolution')
    const disapproveSolution = httpsCallable(functions, 'disapproveSolution');
    const [isOpened, setIsOpened] = useState(false)

    const userId = useSelector(state=>state.authState.userToken)
    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    const viewSolBackground = theme.viewSolBackground
    
    const handlePress = ()=>{
        if(!isOpened){
            viewSolution({solutionId:solution.id})
        }
        setIsOpened(!isOpened)
    }

    const handleApprove = ()=>{
        //if(!isOpened){
            approveSolution({solutionId:solution.id})
        //}
 
    }

    const handleDisapprove = ()=>{
        //if(!isOpened){
            disapproveSolution({solutionId:solution.id})
        //}

    }

    return (
       <View style={{backgroundColor:viewSolBackground, marginBottom:10}} key={number.toString()}>
            <TouchableWithoutFeedback onPress={handlePress}>
               
                <View style={{ flexDirection:'column', height:0.12*height, paddingHorizontal:0.02*width, paddingVertical:0.02*width}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:0.05*width, color:headingColor}}>Solution {number} from </Text>
                            <Text style={{fontSize:0.05*width, color:headingColor, fontWeight:'bold'}}>{userId === solver.id? "You":solver.solverName}</Text>
                        </View>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <View style={{justifyContent:'center', alignItems:'center', width:0.06*width, height:0.06*width, backgroundColor:headingColor, borderRadius:100}}>
                                <Entypo name="eye" size={0.04*width} color={btnIconCol}/>
                            </View>
                            <Text style={{color:headingColor, fontSize:0.032*width}}>{solution.views.length}</Text>
                        </View>
                    </View>    
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                            <TouchableWithoutFeedback onPress={handleApprove}>
                                <View style={{flexDirection:'column', marginHorizontal:8, alignItems:'center'}}>
                                    <View style={{justifyContent:'center', alignItems:'center', width:0.06*width, height:0.06*width, backgroundColor:themeColor, borderRadius:100}}>
                                        <Entypo name="arrow-bold-up" size={0.04*width} color={btnIconCol}/>
                                    </View>
                                    <Text style={{color:headingColor, fontSize:0.032*width}}>{solution.approves.length}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <TouchableWithoutFeedback onPress={handleDisapprove}>
                                <View style={{flexDirection:'column', marginHorizontal:8, alignItems:'center'}}>
                                    <View style={{justifyContent:'center', alignItems:'center', width:0.06*width, height:0.06*width, backgroundColor:themeColor, borderRadius:100}}>
                                        <Entypo name="arrow-bold-down" size={0.04*width} color={btnIconCol}/>
                                    </View>
                                    <Text style={{color:headingColor, fontSize:0.032*width}}>{solution.disapproves.length}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={()=>{setIsVisible(true); openComments(solution.id)}}>
                                <View style={{flexDirection:'column', marginHorizontal:8, alignItems:'center'}}>
                                    <View style={{justifyContent:'center', alignItems:'center', width:0.06*width, height:0.06*width, borderRadius:100}}>
                                        <FontAwesome name="comment" size={0.06*width} color={themeColor}/>
                                    </View>
                                    <Text style={{color:headingColor, fontSize:0.032*width}}>{solution.totalComments}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{flexDirection:'column', width:0.45*width, marginLeft:0.08*width, }}>
                            {
                                solution.lastComment ? (
                                    <>
                                        <Text style={{color:headingColor, fontSize:0.032*width}}>Last comment</Text>
                                        <Text numberOfLines={1} style={{color:headingColor, fontSize:0.032*width, fontWeight:'bold',}}>{solution.lastComment}</Text>
                                    </>
                                ):(
                                    <>
                                        <Text style={{color:headingColor, fontSize:0.032*width}}></Text>
                                        <Text numberOfLines={1} style={{color:headingColor, fontSize:0.032*width, fontStyle:'italic'}}>{"No comments yet!"}</Text>
                                    </>
                                )
                            }
                        </View>
                    </View>
                </View>
               
            </TouchableWithoutFeedback>
            { 
            isOpened ? (
                <View style={{padding:15}}>
                    <View style={{backgroundColor, marginBottom:10, padding:4}}>
                        <Text style={{fontSize:0.04*width, color:headingColor}}>{solution.description}</Text>
                    </View>
                    <View style={{width:'100%', alignItems:'center'}}>
                        {
                            solution.pics.map((url,index)=>(
                                <Image 
                                    key={index.toString()}
                                    source={{uri:url}}
                                    style={{width:'100%', height:0.8*width, marginBottom:15}}
                                />
                            ))
                        }
                    </View>
                </View>
            ):(
                <View/>
            )

            }
       </View>
 
    )
}

export default SolutionComp