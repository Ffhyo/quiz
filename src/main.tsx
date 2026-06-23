import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { QuizProvider } from './context/quizContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <App />

      </QuizProvider>
     
    </BrowserRouter>
  </StrictMode>,
)
