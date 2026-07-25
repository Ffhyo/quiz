import { RxCross2 } from "react-icons/rx";
import { useQuiz } from "../context/quizContext";

type TeamProps = {
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
};

export default function Team({ setDisplay }: TeamProps) {
  const { rounds, selectedRound } = useQuiz();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center text-white">
      <div className="bg-white text-black rounded-xl p-6 relative">
        <button
          className="absolute top-3 right-3 hover:bg-red-300"
          onClick={() => setDisplay("")}
        >
          <RxCross2 size={24} />
        </button>

        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border px-12 py-2">Round</th>
              <th className="border px-12 py-2">Group A</th>
              <th className="border px-12 py-2">Group B</th>
              <th className="border px-12 py-2">Group C</th>
              <th className="border px-12 py-2">Group D</th>
            </tr>
          </thead>

          <tbody>
            {rounds.map((round) => (
              <tr
                key={round}
                className={
                  round === selectedRound
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-gray-100"
                }
              >
                <td className="border px-12 py-2 text-center">
                  {round}
                </td>

                <td className="border px-12 py-2"></td>
                <td className="border px-12 py-2"></td>
                <td className="border px-12 py-2"></td>
                <td className="border px-12 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}