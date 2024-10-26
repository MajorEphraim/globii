
const getProblemsNum =(subject, problems ,userId)=>{

    const enteredSubject= problems.filter(item=>item.subject === subject)
    let counter = 0;
    enteredSubject.forEach(problem => {
        const views = problem.views
        const creator = problem.creator
        if(!views.includes(userId) && creator !== userId){
            counter++
        }
    });

    return counter

}

export default getProblemsNum