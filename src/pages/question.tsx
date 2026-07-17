import { useQuiz } from "../context/quizContext";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState,useEffect } from "react";
gsap.registerPlugin(SplitText)
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
  } = useQuiz() 
  const readyQuiz = useRef(null)
  const headRef =useRef(null)
  const questRef = useRef(null)
  const tl = useRef<gsap.core.Timeline | null>(null);
  const optionRef =useRef<HTMLDivElement>(null)
  const [time, setTime] =useState(30)
useEffect(() => {
  if (currentQuestion === -1) return;

  setTime(30); // Reset timer whenever question changes

  const interval = setInterval(() => {
    setTime((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [currentQuestion]);




  const filteredQuestions = getFilteredQuestions();

  
   useGSAP(()=>{
 
     tl.current = gsap.timeline()
    const split = new  SplitText(readyQuiz.current,{
      type:'chars'
    })
      gsap.from(split.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "power4.out",
  });
    const split1 = new  SplitText(headRef.current,{
      type:'chars'
    })
      gsap.from(split1.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "power4.out",
  });
      const split2 = new  SplitText(questRef.current,{
      type:'chars'
    })
      gsap.from(split2.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "power4.out",
  });

 if (!showOptions || !optionRef.current) return;

 requestAnimationFrame(() => {
    gsap.fromTo(
      optionRef.current!.children,
      {
        opacity: 0,
        x: -80,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
      }
    );
  });

 
  },{dependencies:[currentQuestion,readyQuiz.current,headRef.current,showOptions]})


  if (currentQuestion === -1) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-3" ref={headRef}>
            🎯 Quiz Ready
          </h2>
          <p className="text-gray-300 text-lg" ref={readyQuiz}>
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
        <div className="bg-white/10 backdrop-blur-md p-2 flex items-center gap-4 relative">
          <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-xl shadow-lg">
            {currentQuestion + 1}
          </div>

          <div>
            <h2 className="text-white text-xl font-bold">
              Question {currentQuestion + 1} 
            </h2>

            <p className="text-blue-100 gap-4">
              {selectedSubject} • Round {selectedRound}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-full 
          text-white flex justify-center items-center ">Time:<span className="text-xl font-bold ml-2">{time}</span></div>
        </div>

        {/* Body */}
        <div className="p-10 bg-white">

          {/* Question */}
          <p className="text-3xl leading-relaxed font-medium text-center text-gray-700 mb-6" key={currentQuestion} ref={questRef}>
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
            <div className="grid grid-cols-2 gap-4 mt-6" ref={optionRef}>
              {question.options &&
                Object.entries(question.options).map(([key, value]) => (
                  <div
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
                  </div>
                ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}