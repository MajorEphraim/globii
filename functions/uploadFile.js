import { auth, updateProfile, signOut,storage, ref, uploadBytes,getDownloadURL, db, doc, updateDoc} from '../firebase/configs'

const uploadPhoto= async(imageUri,imageName,location)=>{

    const blob = await new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => resolve(xhr.response)
        xhr.responseType = 'blob'
        xhr.open('GET', imageUri, true)
        xhr.send(null)
    })

    const storageRef = ref(storage, location+'/'+imageName);
    const snapshot = await uploadBytes(storageRef, blob)
    const downloadUrl = await getDownloadURL(snapshot.ref)

    return downloadUrl
}

export default uploadPhoto 