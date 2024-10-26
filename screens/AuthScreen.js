import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard,
        ScrollView, Modal
    } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import {auth,createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, sendEmailVerification, 
        updateProfile, db, collection, setDoc, doc
    } from '../firebase/configs'
import { useDispatch } from 'react-redux';
import { signUp, signIn } from '../functions/authFunctions'
import Loader from '../modals/Loader'
import logo from '../assets/logo.png'

import google_logo from '../assets/google_logo.png'
import facebook_logo from '../assets/facebook_logo.png'
import apple_logo from '../assets/apple_logo.png'

import Entypo from 'react-native-vector-icons/Entypo';
import { fetchFavorites } from '../functions/fetchFavorites'


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AuthScreen = ()=>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistered, setIsRegistered] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    const [isShown, setIsShown] = useState(false)
    const [isShown2, setIsShown2] = useState(false)

    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const runSignUp = async()=>{
        setErrorMsg(null)
        if (password != confirmPassword) {
            setErrorMsg("Your passwords does not match")
            return
        }
        try {
            setIsVisible(true)
            const errorMsg = await signUp(username,email,password)
            setErrorMsg(errorMsg)
            setIsVisible(false)
            if(errorMsg == null){
                setIsRegistered(true)
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
    }
    
    const runSignIn = async()=>{
        setErrorMsg(null)
        try {
            setIsVisible(true)
            const errorMsg = await signIn(email,password)
            setErrorMsg(errorMsg)
            setIsVisible(false)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }
    
    return(

    <View style={{flex:1,backgroundColor:"#fefcfe", alignItems:'center', justifyContent:'space-between' ,paddingTop:.15*height, paddingBottom:.1*height}}>
        <View style={{alignItems:'center'}}>
            <View style={{height:.27*width,width:.27*width, alignItems:'center'}}>
                <Image source={logo} style={{height:"80%",width:"50%", resizeMode:'contain'}}/>
            </View>
            <Text style={{color:'#2f2d2d', fontSize:.06*width, fontWeight:'500'}}>Welcome back</Text>
        </View>
    <View>

  

            {
                    !isRegistered ? (
                        <TextInput
                            placeholder='Username'
                            placeholderTextColor={'#d2d2d2'}
                            value={username}
                            onChangeText={(val)=>{setUsername(val); setErrorMsg(null)}}
                            style={{color:'#f1cdf3', backgroundColor:"#cd17d4", borderRadius:0.02*width, height:.05*height, width:.56*width, padding:6,marginBottom:0.03*width}}
                        />

                    ):(null)
                }
                <TextInput
                    placeholder='Email'
                    placeholderTextColor={'#f1cdf3'}
                    value={email}
                    onChangeText={(val)=>{setEmail(val); setErrorMsg(null)}}
                    style={{color:'#ffffff', backgroundColor:"#cd17d4", borderRadius:0.02*width, height:.05*height, width:.56*width, padding:6,marginBottom:0.03*width}}
                />
                <View style={{height:.05*height, width:.56*width, alignItems:'flex-end',marginBottom:0.03*width,justifyContent:'center',}}>
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#d2d2d2'}
                        value={password}
                        secureTextEntry={!isShown}
                        onChangeText={(val)=>{setPassword(val); setErrorMsg(null)}}
                        style={{color:'#ffffff', backgroundColor:"#3c3c3c", borderRadius:0.02*width, height:.05*height, width:.56*width, padding:6}}
                    />
                    {
                        isShown ? (
                        <TouchableOpacity onPress={()=>setIsShown(false)} style={{position:'absolute', margin:36}}>
                            <Entypo name='eye-with-line' size={0.056*width} color="#ffffff" style={{paddingRight:8}}/>
                        </TouchableOpacity>
                        ):(
                        <TouchableOpacity onPress={()=>setIsShown(true)} style={{position:'absolute',margin:36}}>
                            <Entypo name='eye' size={0.056*width} color="#ffffff" style={{paddingRight:8}}/>
                        </TouchableOpacity>
                        )
                    }
                </View>



            {
                    !isRegistered ? (
                        <View style={{height:.05*height, width:.56*width, alignItems:'flex-end',marginBottom:0.03*width,justifyContent:'center',}}>
                            <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor={'#d2d2d2'}
                            value={confirmPassword}
                            secureTextEntry={!isShown2}
                            onChangeText={(val)=>{setConfirmPassword(val); setErrorMsg(null)}}
                            style={{color:'#ffffff', backgroundColor:"#3c3c3c", borderRadius:0.02*width, height:.05*height, width:.56*width, padding:6}}
                    />
                            {
                            isShown2 ? (
                            <TouchableOpacity onPress={()=>setIsShown2(false)} style={{position:'absolute', margin:36}}>
                                <Entypo name='eye-with-line' size={0.056*width} color="#ffffff" style={{paddingRight:8}}/>
                            </TouchableOpacity>
                            ):(
                            <TouchableOpacity onPress={()=>setIsShown2(true)} style={{position:'absolute',margin:36}}>
                                <Entypo name='eye' size={0.056*width} color="#ffffff" style={{paddingRight:8}}/>
                            </TouchableOpacity>
                            )
                        }
                        </View>
                    ):(null)
                }
              
                {
                    isRegistered ? (
                        <>
                             <TouchableWithoutFeedback onPress={runSignIn}>
                                <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#cd17d4", marginTop:.035*height}}>
                                    <Text style={{color:"#fefefe", fontSize:.025*height}}>Sign in</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                        
                        
                    ):(

                    <>
                        <TouchableWithoutFeedback onPress={runSignUp}>
                                <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:"#cd17d4", marginTop:.035*height}}>
                                    <Text style={{color:"#fefefe", fontSize:.025*height}}>Sign up</Text>
                                </View>
                        </TouchableWithoutFeedback>
                    </>
                    )
                }
      </View>

                {/* <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Text style={{color:'black'}}>Cancel</Text>
                    </TouchableOpacity> */}

    <View style={{alignItems:'center', marginBottom:.05*height}}>
        <Text style={{color:'black', fontSize:0.04*width}}>or</Text>
                    {
                        isRegistered ? (
                            <TouchableOpacity onPress={()=>setIsRegistered(false)}>
                                <Text style={{color:'black',fontSize:.043*width,marginVertical:.035*width}}>Create an account</Text>
                            </TouchableOpacity>

                        ):(

                            <TouchableOpacity onPress={()=>setIsRegistered(true)}>
                                <Text style={{color:'black',fontSize:.043*width,marginVertical:.035*width}}>Go to log in</Text>

                            </TouchableOpacity>
                        )
                    }
        <TouchableWithoutFeedback>
            <View>
                <Text style={{color:"#3c3c3c", fontSize:.035*width, fontWeight:'bold'}}>Forgot password</Text>
            </View>
        </TouchableWithoutFeedback>
      
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:.56*width}}>
        {
            // [google_logo,facebook_logo,apple_logo].map(logo=>(
            //     <TouchableOpacity key={logo.toString()}>
            //         <Image source={logo} style={{height:0.1*width, width:0.1*width, resizeMode:'contain'}}/>
            //     </TouchableOpacity>
            // ))
        }
    </View>
    <Loader isVisible={isVisible}/>
    <Text style={{position:'absolute',color:'black', paddingTop:0.08*height}}>{errorMsg}</Text>
</View>

    )

}

export default AuthScreen
