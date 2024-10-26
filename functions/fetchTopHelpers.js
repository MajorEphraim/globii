import { auth, db, doc, updateDoc,
    addDoc, collection,query, where, onSnapshot, getDocs, getDoc
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllProblems } from '../redux/slices/problemsSlice'
import { updateAllSolutions } from '../redux/slices/solutionsSlice'
import { updateHelpers } from '../redux/slices/helpersSlice'

const getBankingDetails = async(userId)=>{
    
 
        const docRef = doc(db, "banking details", userId);
        const docSnap = await getDoc(docRef);
       
          
    return docSnap.data()
}

const fetchHelpersDetails = async(id)=>{
    const detailsQuery = query(collection(db, "account details"),where('userId','==',id));

    const details = {};
    const querySnapshot = await getDocs(detailsQuery);
    querySnapshot.forEach((doc) => {
        details.username = doc.data().username
        details.profilePic = doc.data().profilePic
        details.bio = doc.data().bio
        details.id = id;
        details.problemsCreated = doc.data().problemsCreated;
        details.problemsSolved = doc.data().problemsSolved;
        details.points = doc.data().points
    });

    const bankingDetails = await getBankingDetails(id)
    return {...details,...bankingDetails}   
}

const fetchHelpers = ()=>{
   
    try {
      
            const accountQuery = query(collection(db, "top helpers"))

            const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
               querySnapshot.forEach(async (doc) => {
                    const topHelpers = doc.data().topHelpers
                    const promises = []

                    topHelpers.forEach(async helper=>promises.push(fetchHelpersDetails(helper)))

                    const helpersDetails = await Promise.all(promises)
                    store.dispatch(updateHelpers(helpersDetails)) 
                }); 
            });
    } catch (error) {
        console.log(error.message)
    }

    return null
}

export default fetchHelpers