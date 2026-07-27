import { useQuiz } from "../context/quizContext";
import { useRef, useState, useEffect, useCallback } from "react";
import { speak } from "../api/speak";

export default function RapidRound() {
  const {
    rapidTeams,
    currentTeam,
    currentRapidQuestion,
    selectedSubject,
    selectedRound,
    showOptions,
    answers,
    setAnswers,
    nextRapidQuestion,
    nextTeam,
    setCurrentTeam,
    setCurrentRapidQuestion,
    generateRapidRound,
  } = useQuiz();

  const timerRef = useRef<number| null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(120); // 2 minutes (120 seconds)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = rapidTeams[currentTeam]?.[currentRapidQuestion];
  const selectedAnswer = answers[currentRapidQuestion];
  const isLastQuestion = currentRapidQuestion === 9;
  const isLastTeam = currentTeam === "D";

  // Helper to format total seconds into MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Safe helper to stop active countdown interval
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Starts timer if it's not already running
  const startTimerIfNeeded = useCallback(() => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // Triggered ONLY when the user clicks the Center START button
  const handleStartRound = useCallback(async () => {
    if (!question) return;

    setIsStarted(true);
    setIsTransitioning(false);
    setTime(120);

    // Speak first question
    await speak(`Question ${currentRapidQuestion + 1}. ${question.question}`);

    // Start countdown
    startTimerIfNeeded();
  }, [question, currentRapidQuestion, startTimerIfNeeded]);

  const handleSelect = useCallback(
    (option: string) => {
      if (selectedAnswer || time === 0) return;

      const updated = [...answers];
      updated[currentRapidQuestion] = option;
      setAnswers(updated);

      speak(`You selected option ${option}`);
    },
    [selectedAnswer, time, answers, currentRapidQuestion, setAnswers]
  );

  // Switch to a specific team directly at any time
  const handleSwitchTeam = (teamKey: "A" | "B" | "C" | "D") => {
    stopTimer();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setCurrentTeam(teamKey);
    setCurrentRapidQuestion(0);
    setAnswers([]);

    setIsStarted(false);
    setIsTransitioning(false);
    setTime(120);
  };

  // Complete Reset back to Team A, Question 1, Start Screen
  const handleResetToInitial = useCallback(() => {
    stopTimer();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setCurrentTeam("A");
    setCurrentRapidQuestion(0);
    setAnswers([]);

    setIsStarted(false);
    setIsTransitioning(false);
    setTime(120);
  }, [stopTimer, setCurrentTeam, setCurrentRapidQuestion, setAnswers]);

  const handleNextTeam = useCallback(async () => {
    stopTimer();
    setIsTransitioning(true);

    if (isLastTeam) {
      handleResetToInitial();
    } else {
      nextTeam();
      setIsStarted(false);
      setTime(120);
      setAnswers([]);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [isLastTeam, nextTeam, setAnswers, stopTimer, handleResetToInitial]);

  const handleNextQuestion = useCallback(async () => {
    if (isTransitioning) return;

    if (isLastQuestion) {
      await handleNextTeam();
    } else {
      setIsTransitioning(true);
      nextRapidQuestion();

      setTimeout(() => {
        setIsTransitioning(false);
        if (rapidTeams[currentTeam]?.[currentRapidQuestion + 1]) {
          speak(
            `Question ${currentRapidQuestion + 2}. ${
              rapidTeams[currentTeam][currentRapidQuestion + 1].question
            }`
          );
        }
      }, 300);
    }
  }, [
    isTransitioning,
    isLastQuestion,
    handleNextTeam,
    nextRapidQuestion,
    rapidTeams,
    currentTeam,
    currentRapidQuestion,
  ]);

  if (!question || !rapidTeams[currentTeam] || rapidTeams[currentTeam].length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-white text-3xl">
        <div className="text-center">
          <p className="mb-4">No Rapid Questions Available</p>
          <button
            onClick={generateRapidRound}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            🔄 Generate Rapid Round
          </button>
        </div>
      </div>
    );
  }
console.log(question)
  return (
    <div className="w-full flex justify-center items-center p-6 mt-10 relative z-20">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🔥 RAPID FIRE ROUND</h1>
            <p className="text-red-100">
              {selectedSubject} • {selectedRound}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm">TEAM</p>
            <h2 className="text-4xl font-bold">{currentTeam}</h2>
            <p className="text-xs text-red-200">
              {currentRapidQuestion + 1}/10
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm">TIME</p>
            <h2 className="text-4xl font-bold font-mono">
              {isStarted ? formatTime(time) : "--:--"}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 min-h-[420px] flex flex-col justify-between">
          {isTransitioning ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="animate-pulse text-2xl text-gray-500">
                ⏳ Loading next question...
              </div>
            </div>
          ) : !isStarted ? (
            /* CENTER START BUTTON SCREEN */
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-12 space-y-6">
              <div className="text-center max-w-xl">
                <span className="bg-red-100 text-red-700 font-bold px-4 py-1.5 rounded-full text-sm inline-block mb-3">
                  READY TEAM {currentTeam}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-800">
                  Rapid Fire Round
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                  You will have 2 minutes to answer as many questions as possible.
                </p>
              </div>

              <button
                onClick={handleStartRound}
                className="px-12 py-6 rounded-2xl bg-green-600 text-white text-3xl font-extrabold shadow-lg hover:bg-green-700 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                ▶ START ROUND
              </button>
            </div>
          ) : (
            /* ACTIVE QUESTION VIEW */
            <>
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-blue-700">
                    Question {currentRapidQuestion + 1} / 10
                  </h2>
                  <div
                    className={`text-lg font-bold font-mono ${
                      time <= 10 ? "text-red-600 animate-pulse" : "text-gray-600"
                    }`}
                  >
                    ⏱️ {formatTime(time)} remaining
                  </div>
                </div>

                <p className="text-3xl font-semibold text-center mb-8 text-gray-800">
                  {question.question}
                </p>

                {showOptions && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(question.options).map(([key, value]) => {
                      const isSelected = selectedAnswer === key;

                      let buttonClass =
                        "rounded-xl p-4 text-lg border-2 transition-all font-medium text-left ";

                      if (isSelected) {
                        buttonClass +=
                          "bg-blue-600 text-white border-blue-600 transform scale-105 shadow-md";
                      } else if (time === 0 || selectedAnswer) {
                        buttonClass +=
                          "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60";
                      } else {
                        buttonClass +=
                          "hover:bg-blue-50 border-gray-300 hover:border-blue-400";
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => handleSelect(key)}
                          disabled={!!selectedAnswer || time === 0}
                          className={buttonClass}
                        >
                          <span className="font-bold mr-3">{key}.</span>
                          {value as string}
                        </button>
                      );
                    })}
                  </div>
                )}

                {selectedAnswer && (
                  <div className="text-center p-4 rounded-xl bg-blue-100 text-blue-700 animate-fade-in font-bold">
                    ✅ Team {currentTeam} selected: {selectedAnswer}
                  </div>
                )}

                {time === 0 && !selectedAnswer && (
                  <div className="text-center p-4 rounded-xl bg-orange-100 text-orange-700 animate-fade-in font-bold">
                    ⏰ Time's up! No answer selected.
                  </div>
                )}
              </div>
            </>
          )}

          {/* Controls Footer */}
          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <div className="flex gap-4">
              <button
                onClick={handleNextQuestion}
                className={`px-8 py-3 rounded-xl text-white font-bold transition ${
                  isLastQuestion
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-600 hover:bg-green-700"
                } ${
                  !isStarted || isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!isStarted || isTransitioning}
              >
                {isLastQuestion ? "🏆 Next Team" : "Next Question →"}
              </button>
            </div>

            <div className="flex gap-3 items-center">
              {/* TEAM SWITCHER DROPDOWN */}
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl border border-gray-300">
                <span className="text-xs font-bold text-gray-600 uppercase">Team:</span>
                <select
                  value={currentTeam}
                  onChange={(e) =>
                    handleSwitchTeam(e.target.value as "A" | "B" | "C" | "D")
                  }
                  className="bg-white text-gray-800 font-bold px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="A">Team A</option>
                  <option value="B">Team B</option>
                  <option value="C">Team C</option>
                  <option value="D">Team D</option>
                </select>
              </div>

              <button
                onClick={handleResetToInitial}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                🔄 Reset Round
              </button>
              <button
                onClick={handleResetToInitial}
                className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition font-semibold"
              >
                🏁 Finish & Reset
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentRapidQuestion + 1) / 10) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Team {currentTeam}</span>
              <span>
                {Math.round(((currentRapidQuestion + 1) / 10) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}