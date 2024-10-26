import { auth, db, doc, updateDoc,
    addDoc, collection, increment,
    Timestamp 
   } from '../firebase/configs'
import uploadFile from './uploadFile';

const sendComment = async(message, senderId, solutionId, pics)=>{

const promises = []
const date = new Date()
const dateCreated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
const timeCreated = `${date.getHours()}:${date.getMinutes()}`

if(pics.length >0){
    pics.forEach(async pic => {
        promises.push(uploadFile(pic.uri,pic.name,'comments'))
    });

}

const picsUris = await Promise.all(promises)

const docRef = await addDoc(collection(db, "comments"), {
    message,
    senderId,
    solutionId,
    pics:picsUris,
    dateCreated,
    timeCreated,
    time:date.getTime()
  });

  const solutionRef = doc(db, "solutions", solutionId);
  await updateDoc(solutionRef, {lastComment:message, totalComments:increment(1)});
}

export default sendComment
