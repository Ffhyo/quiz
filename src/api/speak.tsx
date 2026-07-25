export const speak = async (text: string) => {
  try {


    const res = await fetch("https://quizbackend-axg7.onrender.com/api/voice/speak", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);

    audio.onended = () => {
      URL.revokeObjectURL(url);
    };

    await audio.play();
  } catch (err) {
    console.error(err);
  }
};