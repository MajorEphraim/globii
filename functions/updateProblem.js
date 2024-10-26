import { auth, db, doc, updateDoc,
    addDoc, collection 
   } from '../firebase/configs'
import uploadFile from './uploadFile';

const updateProblem = async(heading, description, pics, id)=>{

const promises = []
const date = new Date()
const dateCreated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
pics.forEach(async pic => {
    promises.push(uploadFile(pic.uri,pic.name,'problems'))
});

const picsUris = await Promise.all(promises)

const docRef = doc(db, "problems", id);
await updateDoc(docRef, {heading, description, pics:picsUris, dateCreated});

}

export default updateProblem




