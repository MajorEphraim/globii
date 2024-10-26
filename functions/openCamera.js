import * as ImagePicker from 'expo-image-picker';

const options ={}

const openCamera = async()=>{
    let uri
    let name
    try {

    const result = await ImagePicker.launchCameraAsync();
  
      //console.log(result);
  
      if (!result.canceled) {
        uri = result.assets[0].uri
        name = result.assets[0].fileName
      }

    } catch (error) {
        console.log(error.message)
    }

    return {uri,name}

}

export default openCamera