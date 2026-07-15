import { useState } from 'react';
import { quizData } from '../data/content';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (optionIndex: number) => {
    if (isAnswered) return; // Запрещаем менять ответ

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  // Шуточное звание в зависимости от набранных баллов
  const getRank = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) return "👑 Настоящий Батыр / Шеф по чаю";
    if (percentage >= 50) return "🤖 Адаптированный релокант";
    return "✈️ Случайный турист в аэропорту Алматы";
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl p-8 border border-teal-500/20 shadow-2xl text-center">
        <h3 className="text-3xl font-black text-white mb-4">Результаты Квиза</h3>
        <p className="text-lg text-slate-400 mb-2">Вы ответили правильно на</p>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 my-4">
          {score} из {quizData.length}
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-teal-400 mb-6">
          Ваш статус: {getRank()}
        </div>
        <button
          onClick={resetQuiz}
          className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02]"
        >
          Пройти заново
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl">
      {/* Прогресс-бар */}
      <div className="w-full bg-slate-950 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-4">
        <span>ВОПРОС {currentQuestionIndex + 1} ИЗ {quizData.length}</span>
        <span>ОЧКИ: {score}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
        {currentQuestion.question}
      </h3>

      {/* Варианты ответов */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          let optionStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
          
          if (isAnswered) {
            if (index === currentQuestion.correctAnswer) {
              optionStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold";
            } else if (index === selectedAnswer) {
              optionStyle = "bg-rose-950/40 border-rose-500 text-rose-300";
            } else {
              optionStyle = "bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => handleAnswerClick(index)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 ${optionStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Объяснение (показывается после ответа) */}
      {isAnswered && (
        <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/10 mb-6 animate-fadeIn">
          <span className="text-xs font-mono text-teal-400 block mb-1">ПОЧЕМУ ТАК?</span>
          <p className="text-sm text-slate-400 leading-relaxed">{currentQuestion.explanation}</p>
          <button
            onClick={handleNextClick}
            className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg text-xs transition duration-200"
          >
            {currentQuestionIndex + 1 === quizData.length ? "Посмотреть результаты" : "Следующий вопрос"}
          </button>
        </div>
      )}
    </div>
  );
}