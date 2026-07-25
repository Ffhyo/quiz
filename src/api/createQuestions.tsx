import type { Question } from "../context/quizContext";

export const createQuestions = async (
  question: Question,
  imageFile?: File
) => {
  const formData = new FormData();

  formData.append("subject", question.subject);
  formData.append("round", question.round);
  formData.append("question", question.question);

  formData.append("A", question.options.A);
  formData.append("B", question.options.B);
  formData.append("C", question.options.C);
  formData.append("D", question.options.D);

  formData.append("answer", question.answer);
  formData.append("marks", question.marks.toString());
  console.log(imageFile)

  if (imageFile) {
    formData.append("image", imageFile);
  }
for (const [key, value] of formData.entries()) {
  console.log(key, value);
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