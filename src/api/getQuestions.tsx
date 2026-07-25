export const getQuestions = async () => {
  const res = await fetch(
    "https://quizbackend-axg7.onrender.com/api/questions"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();

  console.log(data);

  return data;
};