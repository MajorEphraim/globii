import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform, 
        TouchableWithoutFeedback, TextInput
    } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import updateBankingDetails from '../functions/updateBankingDetails.js';
import Loader from './Loader.js'


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const BankingDetails = ({isVisible, setIsVisible})=>{
  
    const [isCardless, setIsCardless] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state=>state.authState.userToken)
    const bankingDetails = useSelector(state=>state.bankState)
    const dispatch = useDispatch()

    const [accountHolder, setAccountHolder] = useState(bankingDetails.accountHolder);
    const [accountNumber, setAccountNumber] = useState(bankingDetails.accountNumber);
    const [accountType, setAccountType] = useState(bankingDetails.accountType);
    const [bankName, setBankName] = useState(bankingDetails.bankName);
    const [branchCode, setBranchCode] = useState(bankingDetails.branchCode);
    const [cellNumber, setCellNumber] = useState(bankingDetails.cellNumber);

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

    const iconCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":btnIconCol
    const inputTextColor = backgroundColor === "#0e0c0c" ? "#ffffff":'#000000'
    const placeholderColor = backgroundColor === "#0e0c0c" ?"#f1f1f1":'#ada6a6'
    //const inputTextColor = backgroundColor === "#0e0c0c" ? placeholderCol:inputTextCol


    const inputTextCol = backgroundColor === "#0e0c0c" ? theme.themeColor : theme.inputTextCol

    const style ={fontSize:0.036*width, color:inputTextColor, width:0.55*width, height:30, borderWidth:1, borderColor:inputTextCol, borderRadius:12, padding:0, paddingHorizontal:5}
    const nameTextBox = <TextInput 
                    value={accountHolder}
                    onChangeText={(text)=>{setAccountHolder(text);}}
                    style={style}
                    />

    const accNoTextBox = <TextInput 
                    value={accountNumber}
                    onChangeText={(text)=>{setAccountNumber(text); }}
                    style={style}
                    />

    const accTypeTextBox = <TextInput 
                    value={accountType}
                    onChangeText={(text)=>{setAccountType(text); }}
                    style={style}
                    />

    const bNameTextBox = <TextInput 
                    value={bankName}
                    onChangeText={(text)=>{setBankName(text); }}
                    style={style}
                    />

    const branchCodeTextBox = <TextInput 
                    value={branchCode}
                    onChangeText={(text)=>{setBranchCode(text); }}
                    style={style}
                    />

    const cellNoTextBox = <TextInput 
                    value={cellNumber}
                    onChangeText={(text)=>{setCellNumber(text); }}
                    placeholder={isCardless ? "":"for cardless (optional)"}
                    placeholderTextColor={placeholderColor}
                    style={style}
                    />

    const data = [
        {id:"1", title:"Account holder name", value:nameTextBox},
        {id:"2", title:"Account number", value:accNoTextBox},
        {id:"3", title:"Bank name", value:bNameTextBox},
        {id:"4", title:"Branch code", value:branchCodeTextBox},
        {id:"5", title:"Account type", value:accTypeTextBox},
        {id:"6", title:"Cellphone number", value:cellNoTextBox},
    ]

    const cardlessData = [
        ///{id:"1", title:"Donee/Receiver's name", value:"Mr holder", icon:null},
        {id:"2", title:"Cellphone number", value:cellNoTextBox},
    ]

    const update=async ()=>{
    setIsLoading(true)

       try {
        const errorMsg = await updateBankingDetails(userId, accountHolder,accountNumber, accountType, branchCode, bankName, cellNumber)
        //alert(errorMsg)
        setIsLoading(false)
        setIsVisible(false)
       } catch (error) {
        alert(error.message)
        setIsLoading(false)
       }
    }
   
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', paddingHorizontal:25, }}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:0.094*height, alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <AntDesign name='close' size={0.06*width} color={backgroundColor ==="#0e0c0c" ?headingColor:backgroundColor}/>
                    </TouchableWithoutFeedback>
                </View>
               
                    <View style={{height:0.75*height, width:"100%",backgroundColor, borderRadius:10, padding:25}}>
                        <View style={{ flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{fontSize:0.054*width, color:inputTextCol, marginBottom:25}}>Banking details</Text>
                        </View>
                        <View style={{ flex:1, justifyContent:'space-between'}}>
                            
                                {
                                    isCardless ? (
                                        <View>
                                            {
                                                    cardlessData.map(item=>(
                                                        <View key={item.id} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
                                                            <View style={{flexDirection:'column'}}>
                                                                <Text style={{fontSize:0.04*width, color:inputTextCol, marginBottom:8}}>{item.title}</Text>
                                                                {item.value}
                                                            </View>
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
                                                                <Text style={{fontSize:0.04*width, color:inputTextCol, marginBottom:8}}>{item.title}</Text>
                                                                {item.value}
                                                            </View>

                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        
                                        </View>
                                    )
                                }
                                            <View style={{alignItems:'center'}}>
                                                <TouchableWithoutFeedback onPress={()=>setIsCardless(!isCardless)}>
                                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                                    {
                                                        isCardless ? <MaterialCommunityIcons name='checkbox-marked-outline' size={0.065*width} color={themeColor}/>:
                                                        <MaterialCommunityIcons name='checkbox-blank-outline' size={0.065*width} color={themeColor}/>
                                                    }
                                                        <Text style={{fontSize:0.035*width, color:inputTextCol, }}>Don't have a bank account </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                          
                        </View>

                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableWithoutFeedback onPress={update}>
                                <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor, marginBottom:0.06*height}}>
                                    <Text style={{color:iconCol, fontSize:.025*height}}>Update</Text>
                                </View>
                            </TouchableWithoutFeedback>
                    </View>
            </View>  
            <Loader isVisible={isLoading}/>
        </Modal>
    )
}

export default BankingDetails