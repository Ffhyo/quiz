
import type { Question } from "../context/quizContext";
export const updateQuestions= async (id: string, updatedData: Question) => {
  try {
    
    const response = await fetch(`https://quizbackend-yo87.onrender.com/api/questions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Failed to update question');
    }
}
catch(error){
    console.log(error)
}
}