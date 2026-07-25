import {
  createContext,
  useContext,
  useState,
  useEffect,

} from "react";
import { createQuestions } from "../api/createQuestions";
import {getQuestions} from "../api/getQuestions";
import { updateQuestions } from "../api/updateQuestion";
import { deleteQuestions } from "../api/deleteQuestion";

import type { ReactNode } from "react";
export type Question = {
  id: string;
  subject: string;
  round: string;
  question: string;
  image?: string;

  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };

  answer: "A" | "B" | "C" | "D";

  marks: number;
};

type QuizContextType = {
  // Subjects
  subjects: string[];
  addSubject: (subject: string) => void;
  deleteSubject: (subject: string) => void;

  // Rounds
  rounds: string[];
  addRound: (round: string) => void;
  deleteRound: (round: string) => void;

  // Rounds
 // Rapid Fire
    rapidTeams: {
      A: Question[];
      B: Question[];
      C: Question[];
      D: Question[];
    };

currentTeam: "A" | "B" | "C" | "D";
setCurrentTeam: React.Dispatch<
  React.SetStateAction<"A" | "B" | "C" | "D">
>;

currentRapidQuestion: number;
setCurrentRapidQuestion: React.Dispatch<
  React.SetStateAction<number>
>;

generateRapidRound: () => void;

nextRapidQuestion: () => void;

nextTeam: () => void;

getRoundsBySubject: (
  subject: string
) => string[];

  // Questions
  questions: Question[];
  setQuestions: React.Dispatch<
    React.SetStateAction<Question[]>
  >;

addQuestion: (
  question: Question,
  imageFile?: File
) => Promise<void>;

  updateQuestion: (
    id: string,
    updatedQuestion: Question
  ) =>Promise< void>;

  deleteQuestion: (id: string) => void;

  clearQuestions: () => void;

  // Filters
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<
    React.SetStateAction<string>
  >;

  selectedRound: string;
  setSelectedRound: React.Dispatch<
    React.SetStateAction<string>
  >;

  getQuestionsBySubject: (
    subject: string
  ) => Question[];

  getQuestionsByRound: (
    round: string
  ) => Question[];

  getFilteredQuestions: () => Question[];

  // Quiz State
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<
    React.SetStateAction<number>
  >;

  score: number;
  setScore: React.Dispatch<
    React.SetStateAction<number>
  >;

  answers: string[];
  setAnswers: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  quizStarted: boolean;
  setQuizStarted: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  quizFinished: boolean;
  setQuizFinished: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  showOptions: boolean;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;

   showImage: boolean;
   setShowImage: React.Dispatch<React.SetStateAction<boolean>>;

  nextQuestion: () => void;
  resetQuiz: () => void;
  
};

const QuizContext =
  createContext<QuizContextType | null>(
    null
  );

type QuizProviderProps = {
  children: ReactNode;
};

export function QuizProvider({
  children,
}: QuizProviderProps) {
  useEffect(() => {

    loadQuestions();
  }, []);
  // SUBJECTS
  const [subjects, setSubjects] =
    useState<string[]>(() => {
      if (
        typeof window !== "undefined"
      ) {
        const saved =
          localStorage.getItem(
            "subjects"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      }

      return [];
    });

  // ROUNDS
  const [rounds, setRounds] =
    useState<string[]>(() => {
      if (
        typeof window !== "undefined"
      ) {
        const saved =
          localStorage.getItem(
            "rounds"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      }

      return [];
    });

  // QUESTIONS
  const [questions, setQuestions] =useState<Question[]>([]);
  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestions();
 
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  // FILTERS
  const [selectedSubject,
    setSelectedSubject] =
    useState("");

  const [selectedRound,
    setSelectedRound] =
    useState("");

  // QUIZ STATE
  const [currentQuestion,
    setCurrentQuestion] =
    useState(-1);

  const [score, setScore] =
    useState(0);

  const [answers, setAnswers] =
    useState<string[]>([]);

  const [quizStarted,
    setQuizStarted] =
    useState(false);

  const [quizFinished,
    setQuizFinished] =
    useState(false);


const [showOptions, setShowOptions] = useState(false);
const [showImage, setShowImage] = useState(false);
// Rapid Fire
const [rapidTeams, setRapidTeams] = useState({
  A: [] as Question[],
  B: [] as Question[],
  C: [] as Question[],
  D: [] as Question[],
});

const [currentTeam, setCurrentTeam] =
  useState<"A" | "B" | "C" | "D">("A");

const [currentRapidQuestion, setCurrentRapidQuestion] =
  useState(0);
  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "subjects",
      JSON.stringify(subjects)
    );
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(
      "rounds",
      JSON.stringify(rounds)
    );
  }, [rounds]);

  useEffect(() => {
    localStorage.setItem(
      "questions",
      JSON.stringify(questions)
    );
  }, [questions]);

//Rapid 
const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
const generateRapidRound = () => {
  const rapidQuestions = questions.filter(
    q =>
      q.subject === selectedSubject &&
      q.round === "rapid"
  );

  console.log("hi")
   console.log("Rapid Questions:", rapidQuestions);
  console.log("Count:", rapidQuestions.length);
  if (rapidQuestions.length < 40) {
    alert("Rapid Fire requires at least 40 questions.");
    return;
  }

  const shuffled = shuffle(rapidQuestions);

  setRapidTeams({
    A: shuffled.slice(0, 10),
    B: shuffled.slice(10, 20),
    C: shuffled.slice(20, 30),
    D: shuffled.slice(30, 40),
  });

  setCurrentTeam("A");
  setCurrentRapidQuestion(0);
};
const nextRapidQuestion = () => {
  setCurrentRapidQuestion(prev =>
    prev < 9 ? prev + 1 : prev
  );
};

const teams = ["A","B","C","D"] as const;

const nextTeam = () => {
  const index = teams.indexOf(currentTeam);

  if (index < teams.length - 1) {
    setCurrentTeam(teams[index + 1]);
    setCurrentRapidQuestion(0);
  }
};





  // SUBJECT FUNCTIONS
  const addSubject = (
    subject: string
  ) => {
    if (!subject.trim()) return;

    setSubjects((prev) => {
      if (prev.includes(subject))
        return prev;

      return [...prev, subject];
    });
  };

  const deleteSubject = (
    subject: string
  ) => {
    setSubjects((prev) =>
      prev.filter(
        (s) => s !== subject
      )
    );

    setQuestions((prev) =>
      prev.filter(
        (q) =>
          q.subject !== subject
      )
    );
  };

  // ROUND FUNCTIONS
  const addRound = (
    round: string
  ) => {
    if (!round.trim()) return;

    setRounds((prev) => {
      if (prev.includes(round))
        return prev;

      return [...prev, round];
    });
  };

  const deleteRound = (
    round: string
  ) => {
    setRounds((prev) =>
      prev.filter(
        (r) => r !== round
      )
    );

    setQuestions((prev) =>
      prev.filter(
        (q) => q.round !== round
      )
    );
  };

  // QUESTION FUNCTIONS
const addQuestion = async (
  question: Question,
  imageFile?: File
) => {
  try {
    const savedQuestion = await createQuestions(
      question,
      imageFile
    );

    setQuestions((prev) => [
      ...prev,
      savedQuestion,
    ]);

    addSubject(question.subject);
    addRound(question.round);
  } catch (err) {
    console.error(err);
  }
};

 const updateQuestion = async (
  id: string,
  updatedQuestion: Question
): Promise<void> => {
  try {
    
    await updateQuestions(
      id,
      updatedQuestion
    );

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? updatedQuestion : q
      )
    );
  } catch (error) {
    console.error("Error updating question:", error);
  }
};

  const deleteQuestion = (
    id: string
  ) => {
    deleteQuestions(id)

    setQuestions((prev) =>
      prev.filter(
        (q) => q.id !== id
      )
    );
  };

  const clearQuestions = () => {
    setQuestions([]);
    localStorage.removeItem(
      "questions"
    );
  };

  // FILTER FUNCTIONS
  const getQuestionsBySubject = (
    subject: string
  ) => {
    return questions.filter(
      (q) =>
        q.subject === subject
    );
  };

  const getQuestionsByRound = (
    round: string
  ) => {
    return questions.filter(
      (q) => q.round === round
    );
  };

  const getFilteredQuestions =
    () => {
      return questions.filter(
        (q) =>
          (!selectedSubject ||
            q.subject ===
              selectedSubject) &&
          (!selectedRound ||
            q.round ===
              selectedRound)
      );
    };

  // QUIZ FUNCTIONS
  const nextQuestion = () => {
    const filtered =
      getFilteredQuestions();

    if (
      currentQuestion <
      filtered.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
    setQuizFinished(false);
  };
  const getRoundsBySubject = (
  subject: string
): string[] => {
  return [
    ...new Set(
      questions
        .filter(
          (q) => q.subject === subject
        )
        .map((q) => q.round)
    ),
  ];
};

  return (
    <QuizContext.Provider
      value={{
        subjects,
        addSubject,
        deleteSubject,

        rounds,
        addRound,
        deleteRound,

        questions,
        setQuestions,

        addQuestion,
        updateQuestion,
        deleteQuestion,
        clearQuestions,

        selectedSubject,
        setSelectedSubject,

        selectedRound,
        setSelectedRound,

        getQuestionsBySubject,
        getQuestionsByRound,
        getFilteredQuestions,

        currentQuestion,
        setCurrentQuestion,

        score,
        setScore,

        answers,
        setAnswers,

        quizStarted,
        setQuizStarted,

        quizFinished,
        setQuizFinished,

        nextQuestion,
        resetQuiz,
        getRoundsBySubject,

        showOptions,
        setShowOptions,
        showImage,
        setShowImage,
        rapidTeams,

        currentTeam,
        setCurrentTeam,

        currentRapidQuestion,
        setCurrentRapidQuestion,

        generateRapidRound,

        nextRapidQuestion,

        nextTeam,
        
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context =
    useContext(QuizContext);

  if (!context) {
    throw new Error(
      "useQuiz must be used inside QuizProvider"
    );
  }

  return context;
}