import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform, 
        TouchableWithoutFeedback, FlatList,
        Image, TextInput, KeyboardAvoidingView
    } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavorites } from '../redux/slices/favoritesSlice.js';
import sendComment from '../functions/sendComment.js';
import openMedia from '../functions/openMedia.js';
import {fetchContent} from '../functions/fetchContent.js';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

import avatar from '../assets/avatar.png'



const CommentsModal = ({isVisible, setIsVisible, solutionId, solver})=>{
    
    const userId = useSelector(state=>state.authState.userToken)
    const comments = useSelector(state=>state.commentsState.allComments)

    const [text, setText] = useState('');
    const [pic, setPic] = useState(null);

    const theme = useSelector(state=>state.themeState)
    const text_ = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    const inputTextCol = theme.inputTextCol
    const placeholderCol = theme.placeholderCol
    
    const handleMedia=async()=>{
        const {uri, name} = await openMedia()
        setPic(uri)
    }

    
    const getChosenSubjects = async()=>{

        let chosenSubjects = JSON.parse(await SecureStore.getItemAsync('chosen_subjects'));
        if (chosenSubjects != null) {
            await fetchContent(chosenSubjects)
            //setTopics(data.filter(item=>chosenSubjects.includes(item.name)))
        }
    }


    const submit = async()=>{
        try {
            
            if(text === '' && pic === null)
                return
                const pics = pic === null ? []:[pic]
                setText('')
                await sendComment(text, userId, solutionId, pics)
                await getChosenSubjects()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal visible={isVisible} onRequestClose={()=>null}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}   keyboardVerticalOffset={null
                                                                                                // Platform.select({
                                                                                                //     ios: () => 0,
                                                                                                //     android: () => 200
                                                                                                // })()
                                                                                                } 
                                                                style={{ flex: 1, backgroundColor:'rgba(0, 0, 0, 0.5)' }} >
            
            <View style={{ flex: 1}}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:0.094*height, alignItems:'center', padding:0.02*width}}>
                     <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                             <AntDesign name='close' size={0.06*width} color={backgroundColor ==="#0e0c0c" ?headingColor:backgroundColor}/>
                     </TouchableWithoutFeedback>
                 </View>
                <View style={{ flex: 1, backgroundColor,borderRadius:15, }}>
                <View style={{flexDirection:'row',padding:0.03*width }}>
                         <Text style={{color:headingColor, fontSize:0.037*width}}>Comments on </Text>
                         <Text style={{color:headingColor, fontSize:0.037*width, fontWeight:'bold'}}>{solver === null ? null:solver.solverName+"'s "}</Text>
                         <Text style={{color:headingColor, fontSize:0.037*width}}>solution</Text>
                </View>
                <FlatList
                    data={comments.slice().sort((a,b)=>(a.time - b.time))}
                    keyExtractor={item=>item.id}
                    style={{width:'100%', height:0.72*height, padding:0.01*width}}
                    renderItem={({item})=>(
                                <View style={item.senderId === userId ? {marginBottom:5, flexDirection:'row', justifyContent:'flex-end',}: {marginBottom:5, flexDirection:'row', justifyContent:'flex-start'}}>
                                    <View style={{flexDirection:item.senderId === userId ? 'row-reverse':'row'}}>
                                        <View style={{width:0.1*width, height:0.1*width,borderRadius:100,backgroundColor:item.senderId === userId ?'#6065c9':'#cd17d4', marginLeft:item.senderId === userId ?4:0, marginRight:item.senderId === userId ?0:4}}>
                                            <Image source={item.senderPic == null ? avatar :{uri:item.senderPic}} style={{width:'100%', height:'100%',borderRadius:100,}}/>
                                        </View>
                                        <View style={item.senderId === userId ? {backgroundColor:'#6065c9',maxWidth:0.64*width, padding:5, borderRadius:0.027*width}: {backgroundColor:'#cd17d4',maxWidth:0.64*width, padding:5, borderRadius:0.027*width}}>
                                            <Text style={{fontSize:0.037*width, color:'#ffffff',}}>{item.message}</Text>
                                        </View>
                                    </View>
                                </View>
                        )}
                    />
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor, padding:0.03*width}}>
                                <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                                    <TextInput
                                        value={text}
                                        onChangeText={(txt)=>{setText(txt); }}
                                        multiline={true}
                                        style={{ backgroundColor:backgroundColor ==="#0e0c0c" ?themeColor:viewProbBackground, width:0.65*width, borderRadius:0.023*width, padding:0, color:'#000000', marginRight:6, paddingVertical:1, paddingLeft:5}}
                                    />
                                    <TouchableWithoutFeedback onPress={handleMedia}>
                                        <Entypo name="images" size={0.06*width} color={themeColor} />
                                    </TouchableWithoutFeedback>
                                </View>
                                <>
                                    <TouchableWithoutFeedback onPress={submit}>
                                        <View style={{marginRight:15}}>
                                            <FontAwesome name="send" size={0.06*width} color={"#6065c9"} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                
                                </>
                    </View>
                </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
    
    // return(
    //     <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
    //         <View style={{flex:1, justifyContent:'space-between', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
    //             <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:0.094*height, alignItems:'center', marginRight:20}}>
    //                 <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
    //                         <AntDesign name='close' size={0.06*width} color={backgroundColor ==="#0e0c0c" ?headingColor:backgroundColor}/>
    //                 </TouchableWithoutFeedback>
    //             </View>
    //             <View style={{width:'100%', height:0.82*height, backgroundColor, borderRadius:15, padding:10, flexDirection:'column', justifyContent:'space-between'}}>
    //                 <View style={{flexDirection:'row'}}>
    //                     <Text style={{color:headingColor, fontSize:0.037*width}}>Comments on </Text>
    //                     <Text style={{color:headingColor, fontSize:0.037*width, fontWeight:'bold'}}>{solver === null ? null:solver.solverName+"'s "}</Text>
    //                     <Text style={{color:headingColor, fontSize:0.037*width}}>solution</Text>
    //                 </View>
    //                 <View style={{width:'100%', height:0.72*height,}}>
    //                     <FlatList
    //                         data={comments.slice().sort((a,b)=>(a.time - b.time))}
    //                         keyExtractor={item=>item.id}
    //                         style={{}}
    //                         renderItem={({item})=>(
    //                             <View style={item.senderId === userId ? {marginBottom:5, flexDirection:'row', justifyContent:'flex-end',}: {marginBottom:5, flexDirection:'row', justifyContent:'flex-start'}}>
    //                                 <View style={{flexDirection:item.senderId === userId ? 'row-reverse':'row'}}>
    //                                     <View style={{width:0.1*width, height:0.1*width,borderRadius:100,backgroundColor:item.senderId === userId ?'#6065c9':'#cd17d4', marginLeft:item.senderId === userId ?4:0, marginRight:item.senderId === userId ?0:4}}>
    //                                         <Image source={item.senderPic == '' ? avatar :{uri:item.senderPic}} style={{width:'100%', height:'100%',borderRadius:100,}}/>
    //                                     </View>
    //                                     <View style={item.senderId === userId ? {backgroundColor:'#6065c9',maxWidth:0.64*width, padding:5, borderRadius:0.027*width}: {backgroundColor:'#cd17d4',maxWidth:0.64*width, padding:5, borderRadius:0.027*width}}>
    //                                         <Text style={{fontSize:0.037*width, color:'#ffffff',}}>{item.message}</Text>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                     )}
    //                     />
    //                     <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
    //                         <View style={{flexDirection:'row', alignItems:'flex-start'}}>
    //                             <TextInput
    //                                  value={text}
    //                                  onChangeText={(txt)=>{setText(txt); }}
    //                                  multiline={true}
    //                                  style={{ backgroundColor:backgroundColor ==="#0e0c0c" ?themeColor:viewProbBackground, width:0.65*width, borderRadius:0.023*width, padding:0, color:'#000000', marginRight:6, paddingVertical:1, paddingLeft:5}}
    //                             />
    //                             <TouchableWithoutFeedback onPress={handleMedia}>
    //                                 <Entypo name="images" size={0.06*width} color={themeColor} />
    //                             </TouchableWithoutFeedback>
    //                         </View>
    //                         <>
    //                             <TouchableWithoutFeedback onPress={submit}>
    //                                 <View style={{marginRight:15}}>
    //                                     <FontAwesome name="send" size={0.06*width} color={"#6065c9"} />
    //                                 </View>
    //                             </TouchableWithoutFeedback>
                              
    //                         </>
    //                     </View>
    //                 </View>
    //             </View>

                
    //         </View>  
    //     </Modal>
    // )
}

export default CommentsModal