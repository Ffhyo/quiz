
import { useEffect, useState } from "react";
import QuizHome from "./pages/quizHome";
import { Auth } from "./pages/auth";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const [islogin, setIsLogin]=useState(false)
  const login =async()=>{
    setIsLogin(true)
  }
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    login();
  }
}, []);
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/quiz" element={<QuizHome />} />
    </Routes>
    </>
   
  );
}