import { auth, db, doc, updateDoc,
    addDoc, collection,query, where, onSnapshot, getDocs, orderBy 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllComments } from '../redux/slices/commentsSlice'
import { updateAllSolutions } from '../redux/slices/solutionsSlice'
import { updateSolvers } from '../redux/slices/solversSlices'


const fetchSenderDetails = async(comment)=>{
    const detailsQuery = query(collection(db, "account details"),where('userId','==',comment.senderId));

    const details = {};
  
    const querySnapshot = await getDocs(detailsQuery);
    querySnapshot.forEach((doc) => {
        details.senderName = doc.data().username
        details.senderPic = doc.data().profilePic
    });

    return {...comment,...details }   
}

const fetchComments = async (id)=>{
 
    try {
        
        const problemsQuery = query(collection(db, "comments"),where('solutionId','==',id))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const promises = [];
        querySnapshot.forEach(async(doc) => {
                promises.push(fetchSenderDetails(doc.data()))
            });
            
            const comments = await Promise.all(promises)
            
        store.dispatch(updateAllComments(comments)) 
    });
    } catch (error) {
        alert(error.message)
    }
}

export default fetchComments