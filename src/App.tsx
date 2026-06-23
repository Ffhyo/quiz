 
import QuizHome from "./pages/quizHome";
import { Auth } from "./pages/auth";
import { Route, Routes } from "react-router-dom";
export default function App() {
   
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/quiz" element={<QuizHome />} />
    </Routes>
    </>
   
  );
}