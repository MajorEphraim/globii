import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard, PermissionsAndroid,
        ScrollView, Platform, Modal
    } from 'react-native'
import HeaderComp from '../components/HeaderComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { auth, updateProfile, db, doc, updateDoc} from '../firebase/configs'
import avatar from '../assets/avatar.png'
import { getDetails, fetchBankingDetails } from '../functions/fetchDetails'
import uploadFile from '../functions/uploadFile';
import openCamera from '../functions/openCamera';
import openMedia from '../functions/openMedia';
import { signOutUser } from '../functions/authFunctions';
import Loader from '../modals/Loader'
import updateDetails from '../functions/updateDetails';
import BankingDetails from '../modals/BankingDetails';
import ChangeProfile from '../modals/ChangeProfile';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const MyAccountScreen = ()=>{

    const route = useRoute()
    const dataPassed =route.params
    const account = useSelector(state=>state.accountState)
    const isFrom = dataPassed.isFrom

    const details = account 
    const navigation = useNavigation()

    const [username, setUsername] = useState(details.username)
    const [bio, setBio] = useState(details.bio)
    const [profilePic, setProfilePic] = useState(details.profilePic)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor
   useEffect(()=>{
    setUsername(details.username)
    setBio(details.bio)
    setProfilePic(details.profilePic)
    getDetails()
    fetchBankingDetails()
   },[account])

   useEffect(()=>{
    fetchBankingDetails()
   },[])

    const logout = async()=>{
        try {
            setIsVisible(true)
            const errorMsg = await signOutUser()
            setErrorMsg(errorMsg) 
            setIsVisible(false)
        } catch (error) {
            setErrorMsg(error.message) 
            setIsVisible(false)
        }
    }

    const handleUpdate = async()=>{
        try {
            // setIsVisible(true)
            const errorMsg = await updateDetails({username,bio})
            setErrorMsg(errorMsg) 
        } catch (error) {
            setErrorMsg(error.message) 
            setIsCheck(false)
        }
    }
    
    const runOpenMedia = async()=>{
        try {
           
            const {uri, name} = await openMedia()
            setIsOpen(false)
            
            const photoUrl = await uploadFile(uri, name, 'profile pictures')
            setProfilePic(photoUrl)
            
            const user = auth.currentUser
            const docRef = doc(db, "account details", user.uid);
            await updateDoc(docRef, {
                profilePic:photoUrl});

            
            setProfilePic(uri)
            
        } catch (error) {
            console.log(error.message)
            setErrorMsg(error.message)
            setIsOpen(false)
        }
    }

    const runOpenCamera = async()=>{
        try {

            const {uri, name} = await openCamera()
            setIsOpen(false)
            
            const photoUrl = await uploadFile(uri, name, 'profile pictures')
            setProfilePic(photoUrl)
            
            const user = auth.currentUser
            const docRef = doc(db, "account details", user.uid);
            await updateDoc(docRef, {
                profilePic:photoUrl});

            setProfilePic(uri)
            
        } catch (error) {
            console.log(error.message)
            setErrorMsg(error.message)
            setIsOpen(false)
        }
    }
   
    return(    
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={isFrom == 'home' ? "My Account" : `${details.username}'s Account`} 
                            handlePress={()=>navigation.goBack()} isCheck={isCheck} 
                            handleUpdate={handleUpdate}/>
                <View style={{flex:1, justifyContent:'space-between', }}>
                    <View>
                    <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:0.06*width}}>
                        <TouchableOpacity onPress={()=>setIsVisible(true)}>
                            <FontAwesome name='bank' size={0.06*width} color={themeColor}/>
                        </TouchableOpacity>
                    </View>
                        <ScrollView style={{paddingHorizontal:2}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>setIsOpen(true)}>
                                    <Image 
                                        source={profilePic == null || profilePic == '' ? avatar : {uri:profilePic}}
                                        style={{height:0.455*width, width:0.455*width, borderRadius:0.04*width}}
                                        />
                                </TouchableOpacity>
                                <View style={{marginLeft:0.05*width}}>
                                    <Text style={{fontSize:0.04*width, color:textColor, marginBottom:0.01*width}}>username</Text>
                                            <TextInput 
                                                placeholder='username here'
                                                value={username}
                                                multiline={true}
                                                maxLength={30}
                                                onChangeText={(text)=>{setUsername(text); setIsCheck(true)}}
                                                style={{fontSize:0.06*width, color:textColor, width:0.42*width, padding:0}}
                                                />    
                                </View>
                            </View>
                            <View style={{marginTop:0.03*height, }}>
                            <Text style={{fontSize:0.048*width, color:textColor,margin:0}}>Bio</Text>
                                <TextInput 
                                    placeholder='Type your bio here'
                                    value={bio}
                                    multiline={true}
                                    maxLength={285}
                                    onChangeText={(text)=>{setBio(text);setIsCheck(true)}}
                                    style={{fontSize:0.04*width, color:textColor, marginTop:0.005*height, padding:0}}
                                />
                            </View>

                            <View style={{marginTop:0.03*height}}>
                                <Text style={{fontSize:0.048*width, color:textColor}}>Points</Text>
                                <Text
                                    style={{fontSize:0.04*width, color:themeColor, marginTop:0.005*height}}
                                >{details.points}</Text>
                            </View>
                            
                            <View style={{marginTop:0.03*height}}>
                            <Text style={{fontSize:0.048*width, color:textColor}}>Problems</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:0.017*height, paddingHorizontal:0.05*width}}>
                                    <View style={{alignItems:'center',}}>
                                        <MaterialIcons name='approval' size={0.04*width} color={themeColor}/>
                                        <Text style={{fontSize:0.04*width, color:textColor, marginVertical:2 }}>Solved</Text>
                                        <Text style={{fontSize:0.04*width, color:themeColor}}>{details.problemsSolved}</Text>
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <Ionicons name='create' size={0.04*width} color={themeColor}/>
                                        <Text style={{fontSize:0.04*width, color:textColor, marginVertical:2}}>Created</Text>
                                        <Text style={{fontSize:0.04*width, color:themeColor }}>{details.problemsCreated}</Text>
                                    </View>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                 
                        <View style={{width:'100%',alignItems:'center', marginBottom:0.06*height}}>
                            <TouchableWithoutFeedback onPress={logout}>
                                <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor}}>
                                    <Text style={{color:btnTextColor, fontSize:.025*height}}>Logout</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> 

                </View>
                {/* <Loader isVisible={isVisible}/> */}
                <ChangeProfile isVisible={isOpen} setIsVisible={setIsOpen} runOpenMedia={runOpenMedia} runOpenCamera={runOpenCamera}/>
                <BankingDetails isVisible={isVisible} setIsVisible={setIsVisible}/>
            </View>
    )

}

export default MyAccountScreen
