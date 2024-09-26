import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [theme, setTheme] = useState("light"); // Estado para o tema
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Erro ao carregar as perguntas:", error));
  }, []);

  const handleAnswerSelect = (score) => {
    setSelectedAnswer(score);
  };

  const handleNextQuestion = () => {
    setAnswers([...answers, selectedAnswer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const totalScore = answers.reduce(
        (acc, curr) => acc + curr,
        selectedAnswer
      );
      navigate(`/result/${totalScore}`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!questions.length) {
    return <div>Loading Questions...</div>;
  }

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
      } min-h-screen flex flex-col items-center py-6`}
    >
      {/* Botão para alternar o tema */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Alternar para o tema {theme === "light" ? "Dark" : "Light"}
      </button>

      <section className="flex-grow flex items-center justify-center w-full">
        <div className="max-w-3xl mx-auto">
          {/* Pergunta */}
          <div className="flex justify-center mb-8 w-full">
  <div
    className={`w-full max-w-4xl p-6 text-center rounded-full ${
      theme === "dark"
        ? "border-gray-500 text-white"
        : "bg-white border-black text-black"
    }`}
    style={{
      maxWidth: 4000 ,
      minHeight: "150px", // Altura mínima para manter o retângulo fixo
      display: "flex", // Para centralizar o texto verticalmente
      alignItems: "center", // Para centralizar o texto verticalmente
      justifyContent: "center", // Para centralizar o texto horizontalmente
      border: "2px solid", // Manter a borda existente
    }}
  >
    <h1 className="text-2xl sm:text-3xl font-medium uppercase">
      {questions[currentQuestion].questionText}
    </h1>
  </div>
</div>

          {/* Respostas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.score)}
                className={`${
                  theme === "dark"
                    ? "text-white bg-gray-800 border border-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    : "text-gray-900 bg-white border border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                } ${
                  selectedAnswer === option.score
                    ? "ring-4 ring-yellow-300"
                    : ""
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* Botão "Próxima" */}
          <div className="flex justify-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`${
                theme === "dark"
                  ? "text-white bg-gray-800 border border-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                  : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              } ${
                selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {currentQuestion === questions.length - 1
                ? "CALCULATE RESULT"
                : "NEXT"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
