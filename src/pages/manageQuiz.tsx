 

import { useState } from "react";
import { useQuiz } from "../context/quizContext";

export default function ManageQuiz() {
  const {
    questions,
    deleteQuestion,
    updateQuestion,
    clearQuestions,
  } = useQuiz();

  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  const handleEdit = (question: any) => {
    setEditingQuestion({ ...question });
  };

  const handleDelete = (id: string ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) return;

    deleteQuestion(id);
  };

  

  return (
    <div className="w-full min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Manage Quiz
          </h1>

          <p className="text-gray-300 mt-2">
            Edit, delete and manage quiz questions.
          </p>
        </div>

        
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-5 bg-slate-800 text-white font-semibold p-4">
          <div>Subject</div>
          <div>Round</div>
          <div className="col-span-2">
            Question
          </div>
          <div>Actions</div>
        </div>

        {questions.map((question: any, index: number) => (
          <div
            key={question.id || index}
            className="grid grid-cols-5 items-center p-4 border-b hover:bg-slate-50"
          >
            <div className="font-medium">
              {question.subject}
            </div>

            <div>{question.round}</div>

            <div className="col-span-2 truncate">
              {question.question}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(question)}
                className="px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(question.id)
                }
                className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No questions found.
          </div>
        )}
      </div>

      {/* Clear All */}
      {questions.length > 0 && (
        <div className="w-full flex justify-center p-6">
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete ALL questions?"
              );

              if (confirmed) clearQuestions();
            }}
            className="bg-red-200 px-4 py-2 text-red-600 rounded hover:bg-red-500 hover:text-white font-medium cursor-pointer"
          >
            Clear all questions
          </button>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] p-6 rounded-2xl max-h-[90vh] overflow-auto">

            <h2 className="text-2xl font-bold mb-4">
              Edit Question
            </h2>

            <input
              className="w-full border p-2 mb-2"
              value={editingQuestion.subject}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  subject: e.target.value,
                })
              }
              placeholder="Subject"
            />

            <input
              className="w-full border p-2 mb-2"
              value={editingQuestion.round}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  round: e.target.value,
                })
              }
              placeholder="Round"
            />

            <textarea
              className="w-full border p-2 mb-2"
              rows={3}
              value={editingQuestion.question}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  question: e.target.value,
                })
              }
              placeholder="Question"
            />

            {/* Options */}
            {["A", "B", "C", "D"].map((opt) => (
              <input
                key={opt}
                className="w-full border p-2 mb-2"
                value={editingQuestion.options?.[opt]}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    options: {
                      ...editingQuestion.options,
                      [opt]: e.target.value,
                    },
                  })
                }
                placeholder={`Option ${opt}`}
              />
            ))}

            {/* Answer */}
            <select
              className="w-full border p-2 mb-2"
              value={editingQuestion.answer}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  answer: e.target.value,
                })
              }
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            {/* Marks */}
            <input
              type="number"
              className="w-full border p-2 mb-4"
              value={editingQuestion.marks}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  marks: Number(e.target.value),
                })
              }
              placeholder="Marks"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setEditingQuestion(null)
                }
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  updateQuestion(
                    editingQuestion.id,
                    editingQuestion
                  );
                  setEditingQuestion(null);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}