import { useQuiz } from "../context/quizContext";
import { useState } from "react";
export default function Options() {
const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const {
    questions,
    selectedSubject,
    setSelectedSubject,
    selectedRound,
    setSelectedRound,
   
    setCurrentQuestion,
    getRoundsBySubject,
    getFilteredQuestions,

    // NEW (you must add these in context)
    showOptions,
    setShowOptions,
    showImage,
    setShowImage,
    generateRapidRound,
    selectedCategory,
    setSelectedCategory,
    getCategories

  } = useQuiz();

  const subjects = [
    ...new Set(questions.map((q) => q.subject)),
  ];

  const rounds = selectedSubject
    ? getRoundsBySubject(selectedSubject)
    : [];

  const filteredQuestions = getFilteredQuestions();
const handleQuestionSelect = (
  index: number,
  id: string
) => {
  if (usedQuestions.includes(id)) return;

  setCurrentQuestion(index);
  setUsedQuestions((prev) => [...prev, id]);
};

  return (
    <>
      <div className="w-full flex flex-wrap gap-6 justify-center items-center p-4">

        {/* Subject */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">
            Select Field
          </label>

          <select
            value={selectedSubject}
             onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedRound("");
              setSelectedCategory("");
              setCurrentQuestion(-1);
            }}

            className="px-4 py-2 rounded-lg border bg-white text-black"
          >
            <option value="">Choose Subject</option>

            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Round */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">
            Select Round
          </label>

          <select
            value={selectedRound}
           onChange={(e) => {
              setSelectedRound(e.target.value);

              if (e.target.value !== "curriculum") {
                setSelectedCategory("");
              }

              setCurrentQuestion(-1);
            }}
            className="px-4 py-2 rounded-lg border bg-white text-black"
          >
            <option value="">Select Round</option>

            {rounds.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {selectedRound === "curriculum" && (
  <div className="flex flex-col">
    <label className="text-white font-semibold mb-2">
      Select Category
    </label>

    <select
      value={selectedCategory}
      onChange={(e) => {
        setSelectedCategory(e.target.value);
        setCurrentQuestion(-1);
      }}
      className="px-4 py-2 rounded-lg border bg-white text-black"
    >
      <option value="">Select Category</option>

      {getCategories().map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
)}

        {/* Question Numbers */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">
            Question Number
          </label>

  <div className="flex flex-wrap gap-2">
  {selectedSubject && selectedRound 
  &&  (selectedRound !== "curriculum" || selectedCategory)
  ? (
    selectedRound === "warm-up" ? (
      <button
        onClick={() => setCurrentQuestion(0)}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        🔥 Start Warm Up
      </button>
    ) : selectedRound === "rapid" ? (
      <button
        onClick={() => {
          generateRapidRound();
        }}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        ⚡ Start Rapid Fire
      </button>
    ) : (
      filteredQuestions.map((question, index) => (
        <button
          key={question.id}
          disabled={usedQuestions.includes(question.id)}
          onClick={() => handleQuestionSelect(index, question.id)}
          className={`w-12 h-12 rounded font-semibold transition ${
            usedQuestions.includes(question.id)
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-white text-black hover:bg-blue-100"
          }`}
        >
          {index + 1}
        </button>
      ))
    )
  ) : (
  <p className="text-gray-300">
  {selectedRound === "curriculum"
    ? "Please select a curriculum category."
    : "Select subject and round first."}
</p>
  )}
</div>
        </div>
      </div>

      {/* TOGGLES */}
      <div className="w-full p-4 relative z-10 flex gap-6 pl-12">

        <label className="text-white flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOptions}
            onChange={(e) =>
              setShowOptions(e.target.checked)
            }
          />
          Show Options
        </label>

        <label className="text-white flex items-center gap-2">
          <input
            type="checkbox"
            checked={showImage}
            onChange={(e) =>
              setShowImage(e.target.checked)
            }
          />
          Show Image
        </label>
      </div>
    </>
  );
}