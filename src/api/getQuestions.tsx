

export const getQuestions = async () => {
    const res = await fetch('https://quizbackend-yo87.onrender.com/api/questions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

    return res.json();
}