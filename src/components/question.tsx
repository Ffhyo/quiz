import { useQuiz } from "../context/quizContext";

export default function Question() {
  const {
    selectedSubject,
    selectedRound,
    currentQuestion,
    getFilteredQuestions,
    answers,
    setAnswers,

    // ✅ ADD THIS (IMPORTANT)
    showOptions,
    showImage,
  } = useQuiz();

  const filteredQuestions = getFilteredQuestions();

  if (currentQuestion === -1) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-3">
            🎯 Quiz Ready
          </h2>
          <p className="text-gray-300 text-lg">
            Select a subject, round and question number.
          </p>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];

  if (!question) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6">
          <h2 className="text-red-300 text-xl font-semibold">
            Question not found
          </h2>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQuestion];

  const handleSelect = (optionKey: string) => {
    const updated = [...answers];
    updated[currentQuestion] = optionKey;
    setAnswers(updated);
  };

  return (
    <div className="w-full flex items-center justify-center p-6 mt-12 ml-8 relative z-10">
      <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md p-2 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-xl shadow-lg">
            {currentQuestion + 1}
          </div>

          <div>
            <h2 className="text-white text-xl font-bold">
              Question {currentQuestion + 1}
            </h2>

            <p className="text-blue-100">
              {selectedSubject} • Round {selectedRound}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-10 bg-white">

          {/* Question */}
          <p className="text-3xl leading-relaxed font-medium text-center text-gray-700 mb-6">
            {question.question}
          </p>

          {/* IMAGE (NOW CONTROLLED) */}
          {showImage && question.image && (
            <div className="flex justify-center mb-6">
              <img
                src={question.image}
                alt="question"
                className="max-h-[300px] rounded-xl shadow-md object-contain"
              />
            </div>
          )}

          {/* OPTIONS (NOW CONTROLLED) */}
          {showOptions && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {question.options &&
                Object.entries(question.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`border-2 rounded-xl p-4 text-lg font-medium transition-all ${
                      selectedAnswer === key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    <span className="font-bold mr-2">
                      {key}.
                    </span>
                    {value}
                  </button>
                ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}