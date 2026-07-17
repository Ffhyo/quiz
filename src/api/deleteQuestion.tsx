

export const deleteQuestions = async (id:string)=>{
     const res = await fetch(`https://quizbackend-yo87.onrender.com/api/questions${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

    return res.json();
}