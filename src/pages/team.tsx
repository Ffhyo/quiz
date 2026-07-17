import { RxCross2 } from "react-icons/rx";

type TeamProps = {
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
};

export default function Team({ setDisplay }: TeamProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center text-white">
      <div className="bg-white text-black rounded-xl p-6 relative">
        <button
          className="absolute top-3 right-3 hover:bg-red-300"
          onClick={() => setDisplay("")}
        >
          <RxCross2 size={24} />
        </button>

        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">Group A</th>
              <th className="border px-4 py-2">Group B</th>
              <th className="border px-4 py-2">Group C</th>
              <th className="border px-4 py-2">Group D</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}