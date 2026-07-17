
import type { Question } from '../context/quizContext';
export const createQuestions = async(questionData:Question)=>{
    const res = await fetch('https://quizbackend-yo87.onrender.com/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData)
    });

    return res.json();
}

//https://quizbackend-yo87.onrender.com/api/auth/questions