import type { Question } from "../context/quizContext";

export const createQuestions = async (
  question: Question,
  imageFile?: File
) => {
  const formData = new FormData();
 
  formData.append("subject", question.subject);
  formData.append("round", question.round);
  formData.append("question", question.question);
  formData.append("category", question.category??"" );
if (question.options.A.trim()) {
  formData.append("A", question.options.A);
}

if (question.options.B.trim()) {
  formData.append("B", question.options.B);
}

if (question.options.C.trim()) {
  formData.append("C", question.options.C);
}

if (question.options.D.trim()) {
  formData.append("D", question.options.D);
}

  formData.append("answer", question.answer);
  formData.append("marks", question.marks.toString());
  console.log(question)

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(
    "https://quizbackend-axg7.onrender.com/api/questions",
    {
      method: "POST",
      body: formData, // DON'T use JSON.stringify()
    }
  );

  return await res.json();
};

//http://localhost:5000
//https://quizbackend-axg7.onrender.com