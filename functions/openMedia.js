import * as ImagePicker from 'expo-image-picker';

const options ={}

const openMedia = async()=>{
    let uri
    let name

    try {
    //    // Ask the user for the permission to access the camera
    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // if (permissionResult.granted === false) {
    //   alert("You've refused to allow this appp to access your camera!");
    //   return;
    // }


             // No permissions request is necessary for launching the image library
             let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

    // Explore the result
    //console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.uri);
      //console.log(result.uri);
    }
        uri = result.assets[0].uri
        name = result.assets[0].fileName
       
    } catch (error) {
        console.log(error.message)
    }

    return {uri, name}
}

export default openMedia