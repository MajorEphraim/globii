import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard,
        ScrollView, Switch, Share
    } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import changeTheme from '../functions/changeTheme';
import { updateTheme } from '../redux/slices/themeSlice'
import Favorite from '../modals/Favorites_Settings';
import updateDetails from '../functions/updateDetails';
import { getDetails } from '../functions/fetchDetails'
import Loader from '../modals/Loader'
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SettingsScreen = ()=>{
    
    const notification = useSelector(state=>state.accountState.notification)
    const [isOn, setIsOn] = useState(notification)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor

    const favorites = useSelector(state=>state.favoritesState.favorites)
    
    const userId = useSelector(state=>state.authState.userToken)
    
    const handleSwitch = async(val)=>{
        try {
           
            if(userId === null){
                setIsOn(val)
                return
            }
            const errorMsg = await updateDetails({notification:val})
            setIsOn(val)
            getDetails()
          
        } catch (error) {
            console.log(error.message) 
        }
    }

    const handleChangeTheme = (text)=>{
        const theme = changeTheme(text)
        SecureStore.setItemAsync("theme",JSON.stringify(theme))
    }

    const notificationSwitch = <Switch
                    trackColor={{ false: '#ffffff', true: themeColor }}
                    thumbColor={isOn ? '#ffffff' : '#ffffff'}
                    ios_backgroundColor={themeColor}
                    onValueChange={val=>handleSwitch(val)}
                    value={isOn}
                />
    const themeIcon =<TouchableOpacity onPress={()=>handleChangeTheme(text)}>
                        <View style={{width:.04*height, height:.04*height, backgroundColor:themeColor, borderRadius:.01*width}}/>
                    </TouchableOpacity>
    const onShare = async () => {
        try {
        const result = await Share.share({
            message:
            'Install Globii and increase the community of helping each other',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
        Alert.alert(error.message);
        }
    };
   
    const data = [{name:'Notifications', text:notification ?'Always':'Never', icon:<FontAwesome size={0.065*width} name='bell' color={iconColor}/>, icon2:notificationSwitch, function1:null},
                  {name:'Theme', text, icon:<Ionicons size={0.065*width} name='color-palette' color={iconColor}/>, icon2:themeIcon, function1:null},
                  {name:'Favorite topics', text:''+favorites.length, icon: <MaterialIcons size={0.065*width} name='favorite' color={iconColor}/>, icon2:null, function1:()=>setIsVisible(true)},
                  {name:'Terms of use', text:'', icon:<FontAwesome size={0.065*width} name='book' color={iconColor}/>, icon2:null, function1:()=>null},
                  {name:'FAQs', text:'', icon:<FontAwesome size={0.065*width} name='question-circle' color={iconColor}/>, icon2:null, function1:()=>null},
                  {name:'Invite a friend', text:'', icon:<FontAwesome size={0.065*width} name='share-alt' color={iconColor}/>, icon2:null, function1:onShare}]
                  
                  

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{flex:1,backgroundColor:backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"Settings"} handlePress={()=>navigation.goBack()}/>
                <ScrollView style={{width:'100%', marginTop:40}}>
                    {
                        data.map(item=>(
                            <TouchableWithoutFeedback key={item.name} onPress={item.function1}>
                                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginBottom:15}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <View style={{marginRight:0.04*width}}>
                                            {item.icon}
                                        </View>
                                        <View style={{justifyContent:'space-between'}}>
                                            <Text style={{fontSize:0.051*width, color:textColor}}>{item.name}</Text>
                                           { item.text.length > 0 ? <Text style={{fontSize:0.03*width, color:textColor}}>{item.text}</Text> :null }
                                        </View>
                                    </View>
                                    {item.icon2}
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            <Loader isVisible={isLoading}/>
            <Favorite isVisible={isVisible} setIsVisible={setIsVisible} setIsLoading={setIsLoading}/>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default SettingsScreen
