import { useState } from "react";
import { useQuiz } from "../context/quizContext";

export default function SetQuiz() {
  const {
    addQuestion,
    subjects,
    rounds,
  } = useQuiz();

  const [formData, setFormData] = useState({
    subject: "",
    round: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "A",
    marks: 1,
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !formData.subject ||
      !formData.round ||
      !formData.question
    ) {
      alert("Fill all required fields");
      return;
    }

    addQuestion({
      id: crypto.randomUUID(),

      subject: formData.subject,

      round: formData.round,

      question: formData.question,

      image: formData.image,

      options: {
        A: formData.optionA,
        B: formData.optionB,
        C: formData.optionC,
        D: formData.optionD,
      },

      answer:
        formData.answer as
          | "A"
          | "B"
          | "C"
          | "D",

      marks: Number(formData.marks),
    });

    setFormData({
      subject: "",
      round: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "A",
      marks: 1,
      image: "",
    });

    alert("Question Added");
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Quiz Question
        </h1>

        <div className="space-y-4">

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject (Physics, Math, English...)"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            list="subjects"
          />

          <datalist id="subjects">
            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              />
            ))}
          </datalist>

          {/* Round */}
          <input
            type="text"
            name="round"
            placeholder="Round (Rapid Fire, Audio Round...)"
            value={formData.round}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            list="rounds"
          />

          <datalist id="rounds">
            {rounds.map((round) => (
              <option
                key={round}
                value={round}
              />
            ))}
          </datalist>

          {/* Question */}
          <textarea
            rows={4}
            name="question"
            placeholder="Enter Question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border p-3 rounded"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="h-40 rounded"
            />
          )}

          {/* Options */}
          <input
            type="text"
            name="optionA"
            placeholder="Option A"
            value={formData.optionA}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="optionB"
            placeholder="Option B"
            value={formData.optionB}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="optionC"
            placeholder="Option C"
            value={formData.optionC}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="optionD"
            placeholder="Option D"
            value={formData.optionD}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Correct Answer */}
          <select
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          {/* Marks */}
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            min={1}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white py-3 rounded-lg"
          >
            Add Question
          </button>

        </div>
      </div>
    </div>
  );
}