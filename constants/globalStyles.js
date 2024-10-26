import { Dimensions } from 'react-native'
import store from '../redux/store'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export const verticalOffset =.155*height

const theme = ''
store.subscribe(()=>{
    theme = store.getState().themeState.theme
})

const chooseTheme = (theme)=>{
    if(theme == "light-mode blue")
        return {text:'blue', themeColor:'black'}
    else if(theme == "dark-mode")
        return {text:'white', themeColor:'black'}
    else
        return {text:'white', themeColor:'#cd17d4'}
}

export const globalStyles={
    button:{
        width:.58*width,
        height:.07*height,
        borderRadius:.1*width
    },
    buttonText:{
        fontSize:.073*width
    },
    microphone:{
        height:.5*height
    },
    imageContainer:{
        width,
        height:0.4*height, 
        zIndex:-1
    },
    image:{
        width:0.24*height,
        height:0.33*height, 
    },
    voiceContainer:{
        width:.9*width,
        height:.4*height,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:.1*height
    },
    textInput:{
        width:.77*width, 
        height:.05*height,
        paddingHorizontal:.05*width, 
        borderRadius:20,
    },
    instructionsContainer:{
        width:.9*width,
        height:.3*height,
        borderWidth:1,
        borderRadius:.065*height,
        borderStyle:'dashed',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:.07*width
    },
    instructionsWords:{
        fontSize:.06*width,
        color:'#e4e8e7',
        fontWeight:'200'
    },
    modalHeader:{
        fontSize:.031*height,
    },
    modalText:{
        fontSize:.025*height
    },
    heading:{
        fontSize:.030*height,
    },
    message:{
        fontSize:.019*height,
    },
    terms:{
        fontSize:.026*height,
    },
    welcomeLogo:{
        height:.37*height,
        width:.37*height
    },
    headingSelect:{
        fontSize:.032*height,
        color:'#ffffff',
        marginVertical:'12%'
    },
    preferred:{
        fontSize:.026*height,
        color:'#ffffff'
    },
    language:{
        fontSize:.020*height,
        color:'black'
    },
    languageContainer:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between',
        fontSize:.020*height,
        color:'black',
        borderColor:'white',
        backgroundColor:'#d6e2e4', 
        borderWidth:2, 
        borderRadius:.21*height, 
        width:.21*height, 
        height:.05*height,
        padding:5,
    },
    radioBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:.25*height, 
    },
    radioBtnTextContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    radioBtnText:{
       fontSize:.022*height,
       color:'#ffffff',
       marginLeft:5
    },
    themePic:{
        width:.93*width, 
        height:.30*height
    },
    screenPic:{
        width:.45*width, 
        height:.40*height
    },
    wordsInput:{
        width:.9*width,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginBottom:35
    }
}
