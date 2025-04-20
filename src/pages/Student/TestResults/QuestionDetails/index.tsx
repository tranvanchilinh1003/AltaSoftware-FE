import React from 'react';
import QuizResultViewer from '../../../../components/QuizQuestion/QuizResultViewer';
import { quizQuestions } from '../../../../components/QuizQuestion/quizData';
import QuizQuestionItem from '../../../../components/QuizQuestion/QuizQuestionItem';

const QuizPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Danh sách câu hỏi */}
      <div className="mb-8">
        {quizQuestions.map((question) => (
          <QuizQuestionItem key={question.id} question={question} />
        ))}
      </div>

      {/* Component xem kết quả */}
      <QuizResultViewer />
    </div>
  );
};

export default QuizPage;
