import React, { useState } from "react";
import { quizQuestions } from "./quizData";
import QuizQuestionItem from "./QuizQuestionItem";

const QuizResultViewer: React.FC = () => {
  const [showResult, setShowResult] = useState(false);

  const toggleResult = () => {
    setShowResult(!showResult);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 bg-white shadow-md rounded-md overflow-hidden">
        <div
          className="bg-orange-500 text-white p-4 flex items-center cursor-pointer"
          onClick={toggleResult}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={`h-6 w-6 mr-2 transition-transform duration-300 ${
              showResult ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="font-medium">
            {showResult ? "Ẩn kết quả" : "Xem kết quả"}
          </span>
        </div>

        {showResult && (
          <div className="p-4">
            {quizQuestions.map((question) => (
              <QuizQuestionItem key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>

      {showResult && (
        <div className="w-full md:w-64 mt-4 md:mt-0 md:ml-4 bg-white rounded-md shadow-md h-fit">
          <div className="p-4">
            <div className="font-medium mb-4">Chú thích</div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-100 border border-green-200 flex items-center justify-center rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm">Đáp án đúng</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-100 border border-red-200 flex items-center justify-center rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="text-sm">Đáp án sai</span>
              </div>
            </div>
          </div>

          <div className="p-4 flex justify-center">
            <div
              className="w-40 h-40 opacity-10 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: "url('/api/placeholder/160/160')" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResultViewer;
