import React from "react";
import { QuizQuestion } from "./interface";

interface QuizQuestionItemProps {
  question: QuizQuestion;
}

const QuizQuestionItem: React.FC<QuizQuestionItemProps> = ({ question }) => {
  return (
    <div className="mb-8 border-b pb-6">
      <div className="font-medium mb-4">
        Câu {question.id}: {question.question}
      </div>
      
      {/* Sử dụng thẻ ul/li để liệt kê các lựa chọn */}
      <ul className="space-y-3">
        {question.options.map((option) => {
          const isCorrect = option.id === question.correctAnswerId;
          const isSelected = option.id === question.selectedAnswerId;
          
          return (
            <li key={option.id} className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? (isCorrect ? "border-green-500" : "border-red-500") : "border-gray-300"
                }`}>
                  {isSelected && (
                    <div className={`w-3 h-3 rounded-full ${
                      isCorrect ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                  )}
                </div>
              </div>
              
              <div className={`flex-grow ${
                isSelected ? (isCorrect ? "text-green-600" : "text-red-500") : ""
              } ${
                option.id === question.correctAnswerId && option.id !== question.selectedAnswerId ? "text-green-600" : ""
              }`}>
                {option.id}. {option.text}
                
                {option.id === question.correctAnswerId && option.id !== question.selectedAnswerId && (
                  <span className="ml-2 text-green-600">(Đáp án đúng)</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuizQuestionItem;
