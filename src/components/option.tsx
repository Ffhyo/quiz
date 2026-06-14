import { useQuiz } from "../context/quizContext";

export default function Options() {
  const {
    questions,
    selectedSubject,
    setSelectedSubject,
    selectedRound,
    setSelectedRound,
    currentQuestion,
    setCurrentQuestion,
    getRoundsBySubject,
    getFilteredQuestions,

    // NEW (you must add these in context)
    showOptions,
    setShowOptions,
    showImage,
    setShowImage,
  } = useQuiz();

  const subjects = [
    ...new Set(questions.map((q) => q.subject)),
  ];

  const rounds = selectedSubject
    ? getRoundsBySubject(selectedSubject)
    : [];

  const filteredQuestions = getFilteredQuestions();

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

        {/* Question Numbers */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">
            Question Number
          </label>

          <div className="flex flex-wrap gap-2">
            {filteredQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentQuestion(index)
                }
                className={`w-12 h-12 rounded font-semibold ${
                  currentQuestion === index
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
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