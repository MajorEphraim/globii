import { auth, db, doc, updateDoc,getDoc,
    addDoc, collection,query, where, onSnapshot, getDocs 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllProblems } from '../redux/slices/problemsSlice'
import { updateAllSolutions } from '../redux/slices/solutionsSlice'
import { updateSolvers } from '../redux/slices/solversSlices'
import { updateFavorites } from '../redux/slices/favoritesSlice'
import {fetchFavorites }from './fetchFavorites'

const fetchSolversDetails = async(id, solutionId)=>{
    const detailsQuery = query(collection(db, "account details"),where('userId','==',id));

    const details = {};
  
    const querySnapshot = await getDocs(detailsQuery);
    querySnapshot.forEach((doc) => {
        details.solverName = doc.data().username
        details.solverPic = doc.data().profilePic
        details.id = id;
        details.solutionId = solutionId;
    });

    return details   
}

const fetchAllSolutions = async(problems)=>{
    const problemIds = problems.map(item=>item.id)
    const solutionQuery = query(collection(db, "solutions"),where('problemId','in',problemIds))

    const unsubscribe = onSnapshot(solutionQuery, async(querySnapshot) => {
        const solutions = [];
    
   querySnapshot.forEach(async(doc) => {
        solutions.push({...doc.data(),...{id:doc.id}}); 
    });

    const solversPromises = []

      solutions.forEach(async solution=>{
            solversPromises.push(fetchSolversDetails(solution.solverId, solution.id))
        })
   
        const solvers = await Promise.all(solversPromises)
        store.dispatch(updateAllSolutions(solutions)) 
        store.dispatch(updateSolvers(solvers)) 
});  
}

const fetchSolutions = async(id)=>{
    const solutionsQuery = query(collection(db, "solutions"),where('problemId','==',id));

    const solutions = [];
  
    const querySnapshot = await getDocs(solutionsQuery);
    querySnapshot.forEach((doc) => {
        solutions.push({...doc.data(),...{id:doc.id}})
    });

    return solutions 
}



const fetchProblems = async(subjects)=>{
    if(subjects.length ===0)
        return
    const problemsQuery = query(collection(db, "problems"),where('subject','in',subjects))
        
    const prevProblems = store.getState().problemsState.allProblems
    store.dispatch(updateAllProblems([])) 
    const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
       const problems = []
        querySnapshot.forEach(async(doc) => {
            problems.push({...doc.data(),...{id:doc.id}});  
        });
        store.dispatch(updateAllProblems([...prevProblems,...problems])) 
    });
   
  }


const fetchContent = async(subjects)=>{
    const mappedSubjects = subjects.map(item=>item.name)
      const splitData = mappedSubjects
      const promises = []
      store.dispatch(updateAllProblems([])) 
        while(splitData.length >0){
            promises.push(fetchProblems(splitData.splice(0,8)))
        } 
    //const problems = store.getState().problemsState.allProblems

        // const solutionPromises = []
        // const solversPromises = []
       
        // problems.forEach(async(doc) => {
        //     solutionPromises.push(fetchSolutions(doc.id))
        // });
        // const allSolutions = []
        // const results = await Promise.all(solutionPromises)
        
        // results.forEach(solutions=>{
        //     solutions.forEach(solution=>allSolutions.push(solution))
        // })

        // allSolutions.forEach(async solution=>{
        //     solversPromises.push(fetchSolversDetails(solution.solverId, solution.id))
        // })
        
        // const solvers = await Promise.all(solversPromises)
        // store.dispatch(updateAllSolutions(allSolutions)) 
        // store.dispatch(updateSolvers(solvers)) 

}

const fetchContent_ = async(subjects)=>{
    
    const mappedSubjects = subjects.map(item=>item.name)
    fetchAllProblems(mappedSubjects)
    return
    try {
        const userId = store.getState().authState.userToken
        //if(userId === null)
            //return
        const problemsQuery = query(collection(db, "problems"),where('subject','in',mappedSubjects))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
            const problems = [];
            const promises = []
            const solversPromises = []
            
            querySnapshot.forEach(async(doc) => {
                problems.push({...doc.data(),...{id:doc.id}});
                promises.push(fetchSolutions(doc.id))
                
            });
            const allSolutions = []
            const results = await Promise.all(promises)
            
        results.forEach(solutions=>{
            solutions.forEach(solution=>allSolutions.push(solution))
        })

        allSolutions.forEach(async solution=>{
            solversPromises.push(fetchSolversDetails(solution.solverId, solution.id))
        })
        
        const solvers = await Promise.all(solversPromises)
   
        store.dispatch(updateAllProblems(problems)) 
        store.dispatch(updateAllSolutions(allSolutions)) 
        store.dispatch(updateSolvers(solvers)) 
     
    });
    } catch (error) {
        console.log("FETCH CONTENT ERROR ",error.message)
    }
}


export {fetchContent, fetchAllSolutions} 