import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform, 
        TouchableWithoutFeedback,
    } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';  
import Feather from '@expo/vector-icons/Feather';    
import { useDispatch, useSelector } from 'react-redux'
import { updateFavorites } from '../redux/slices/favoritesSlice.js';
import * as Clipboard from 'expo-clipboard';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Donate = ({isVisible, setIsVisible, person, goBack})=>{
    const favorites = useSelector(state=>state.favoritesState.favorites)
    const [isCardless, setIsCardless] = useState(false);
    const myAccount = useSelector(state=>state.accountState)
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
    //const inputTextCol = theme.inputTextCol
    const placeholderCol = theme.placeholderCol

    const inputTextCol = backgroundColor === "#0e0c0c" ? theme.themeColor : theme.inputTextCol

    const [copiedAccNo, setCopiedAccNo] = useState('');
    const [copiedCellNo, setCopiedCellNo] = useState('');

    const icon = copiedAccNo === '' ? <Feather name='copy' size={0.043*width} color={inputTextCol}/> :
    <Feather name='clipboard' size={0.043*width} color={inputTextCol}/> 
   
    const icon2 = copiedCellNo === '' ? <Feather name='copy' size={0.043*width} color={inputTextCol}/> :
    <Feather name='clipboard' size={0.043*width} color={placeholderCol}/> 

    const data = [
        {id:"1", title:"Donee/Receiver's name", value:person.accountHolder == "" ? "N/A" :person.accountHolder, icon:null},
        {id:"2", title:"Account number", value:person.accountHolder == "" ? "N/A" :person.accountNumber, icon},
        {id:"3", title:"Bank name", value:person.accountHolder == "" ? "N/A" :person.bankName, icon:null},
        {id:"4", title:"Branch code", value:person.accountHolder == "" ? "N/A" :person.branchCode, icon:null},
        {id:"5", title:"AccountType", value:person.accountHolder == "" ? "N/A" :person.accountType, icon:null},
    ]


    const cardlessData = [
        {id:"1", title:"Donee/Receiver's name", value:person.accountHolder, icon:null},
        {id:"2", title:"Cellphone number", value:person.cellNumber == "" ? "N/A" :person.cellNumber, icon:icon2},
    ]


    const copyToClipboard=async()=>{

        if(isCardless){
            if(person.cellNumber == ""){
                return
            }
            await Clipboard.setStringAsync(person.cellNumber)
            setCopiedCellNo(person.cellNumber)
        }else{
            if(person.accountNumber == ""){
                return
            }
            await Clipboard.setStringAsync(person.accountNumber)
            setCopiedAccNo(person.accountNumber)
        }
    }

    const done=()=>{
        setIsVisible(false)
        goBack()
    }
   
   

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', paddingHorizontal:25, }}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:0.094*height, alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <AntDesign name='close' size={0.06*width} color='#ffffff'/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{height:0.65*height, width:"100%",backgroundColor, borderRadius:10, padding:25,}}>
                    <View style={{ flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontSize:0.057*width, color:inputTextCol, marginBottom:20}}>Payment method</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:15}}>
                            <TouchableWithoutFeedback onPress={()=>setIsCardless(false)}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                {
                                    !isCardless ? <Ionicons name='radio-button-on' size={0.043*width} color={inputTextCol}/> :
                                    <Ionicons name='radio-button-off' size={0.043*width} color={inputTextCol}/>  
                                }
                                
                                <Text style={{fontSize:0.043*width, color:inputTextCol, }}> Bank deposit</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={()=>setIsCardless(true)}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                {
                                    isCardless ? <Ionicons name='radio-button-on' size={0.043*width} color={inputTextCol}/> :
                                    <Ionicons name='radio-button-off' size={0.043*width} color={inputTextCol}/>  
                                }
                                
                                <Text style={{fontSize:0.043*width, color:inputTextCol, }}> Cardless</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            {
                                isCardless ? (
                                    <View>
                                        {
                                                cardlessData.map(item=>(
                                                    <View key={item.id} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
                                                        <View style={{flexDirection:'column'}}>
                                                            <Text style={{fontSize:0.04*width, color:inputTextCol, }}>{item.title}</Text>
                                                            <Text style={{fontSize:0.05*width, color:inputTextCol, }}>{item.value}</Text>
                                                        </View>
                                                        {
                                                            item.icon ? (
                                                                <View style={{alignItems:'center', paddingRight:15}}>
                                                                    <TouchableOpacity onPress={copyToClipboard}>
                                                                        {item.icon}
                                                                    </TouchableOpacity>
                                                                    <Text style={{fontSize:0.035*width, color:inputTextCol, }}>{copiedCellNo === '' ? 'Copy':'Copied'}</Text>
                                                                </View>

                                                            ):(<View/>)
                                                        }
                                                    </View>
                                                ))
                                            }
                                    </View>
                                ):(
                                    <View>
                                        <View>
                                            {
                                                data.map(item=>(
                                                    <View key={item.id} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
                                                        <View style={{flexDirection:'column'}}>
                                                            <Text style={{fontSize:0.04*width, color:inputTextCol, }}>{item.title}</Text>
                                                            <Text style={{fontSize:0.05*width, color:inputTextCol, }}>{item.value}</Text>
                                                        </View>
                                                        {
                                                            item.icon ? (
                                                                <View style={{alignItems:'center', paddingRight:15}}>
                                                                    <TouchableOpacity onPress={copyToClipboard}>
                                                                        {item.icon}
                                                                    </TouchableOpacity>
                                                                    <Text style={{fontSize:0.035*width, color:inputTextCol, }}>{copiedAccNo === '' ? 'Copy':'Copied'}</Text>
                                                                </View>

                                                            ):(<View/>)
                                                        }
                                                    </View>
                                                ))
                                            }
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            { person.accountHolder == "" ?<Text style={{fontSize:0.035*width, color:{inputTextCol}, }}>This one is not a bank user, please go to cardless. Sorry for the inconvenience. </Text>:(
                                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                                    <Text style={{fontSize:0.035*width, color:inputTextCol, }}>Reference: </Text>
                                                    <Text style={{fontSize:0.045*width, color:inputTextCol, fontWeight:'bold'}}>{myAccount.username+"(Globii)"}</Text>
                                                </View>
                                            )}

                                        </View>
                                       
                                    </View>
                                )
                            }
                        </View>
                    </View>

                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableWithoutFeedback onPress={done}>
                            <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor, marginBottom:0.06*height}}>
                                <Text style={{color:"#fefefe", fontSize:.025*height}}>Done</Text>
                            </View>
                        </TouchableWithoutFeedback>
                </View>
            </View>  
        </Modal>
    )
}

export default Donate