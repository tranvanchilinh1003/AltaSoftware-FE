import React, { useEffect, useRef, useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Button from '../../../components/Button';
import './scrollbar.css';

const Questions = () => {
  const addressList = [
    { linkName: 'Bài kiểm tra', link: '' },
    { linkName: 'Bài làm', link: '' },
    { linkName: '11A2', link: '' },
  ];

  const [activeNum, setActive] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | null }>({});
  const [answers, setAnswers] = useState<Record<number, number | null>>({});

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  };

  return (
    <div className="pr-10 pl-5">
      <AddressList addressList={addressList} />

      <div className="mt-[20px] w-[1000px] flex justify-between">
        <div className="w-[200px]">
          <div className="flex justify-between">
            <div className="w-[100px] font-bold">Môn học:</div>
            <div className="w-[100px]">{exam?.subject}</div>
          </div>
          <div className="flex justify-between">
            <div className="w-[100px] font-bold">Lớp:</div>
            <div className="w-[100px]">{exam?.class}</div>
          </div>
        </div>

        <div className="w-px bg-[#C9C4C0] h-[50px]"></div>

        <div className="w-[460px] ms-12">
          <div className="flex justify-between">
            <div className="w-[120px] font-bold">Ngày kiểm tra:</div>
            <div className="w-[300px]">{exam?.date}</div>
          </div>
          <div className="flex justify-between">
            <div className="w-[120px] font-bold">Thời lượng:</div>
            <div className="w-[300px]">{exam?.duration}</div>
          </div>
        </div>

        <div className="w-px bg-[#C9C4C0] h-[50px]"></div>

        <div className="w-[300px] ms-12">
          <div className="flex justify-between">
            <div className="w-[100px] font-bold">Đề bài:</div>
            <div className="w-[150px]">{exam?.code}</div>
          </div>
          <div className="flex justify-between">
            <div className="w-[100px] font-bold">Môn học:</div>
            <div className="w-[150px]">{exam?.subject}</div>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-3">
        <div className="w-full flex justify-between mt-[30px] items-center">
          <p className="pb-0 font-bold">Phần trả lời của học sinh</p>
          <Button size="mini">Nộp bài</Button>
        </div>

        <div className="w-full mt-5 max-h-[500px] shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)] rounded-md flex border border-e-neutral-200">
          {/* Sidebar danh sách câu hỏi */}
          <div className="flex-[3] bg-[#F0F3F6] p-5">
            <p className="font-bold">Phần câu hỏi:</p>
            <div className="mt-3 w-full min-h-[308px] max-h-[308.4px] overflow-auto pe-5" id="custom-scrollbar">
              {exam.questions.map((_, index) => (
                <button
                  key={index}
                  className={`w-full py-1 text-center rounded-md ${activeNum === index ? 'bg-[#FF7506] text-white' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span className="font-bold">{`Câu ${index + 1}`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hiển thị câu hỏi và đáp án */}
          <div className="flex-[11] p-5">
            <h2 className="font-bold mb-3">{exam.questions[activeNum].text}</h2>
            <div className="flex flex-col gap-2 min-h-[258px]">
              {exam.questions[activeNum].answers.map((answer, ansIndex) => (
                <label key={ansIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${activeNum}`}
                    value={ansIndex}
                    checked={answers[activeNum] === ansIndex}
                    onChange={() => handleAnswerChange(activeNum, ansIndex)}
                    className="form-radio text-blue-500"
                  />
                  <span>{answer.title}</span>
                </label>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <div className="flex justify-between w-[320px]">
                <button className='w-[150px] h-[50px] bg-[#F2F2F2] font-bold rounded-md border border-e-neutral-200'>Quay lại</button>
                <button className='w-[150px] h-[50px] bg-[#FF7506] text-white font-bold rounded-md border border-e-neutral-200'>Tiếp theo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;

// Dữ liệu đề thi
export const exam = {
  subject: 'Lịch sử',
  class: '7A',
  date: 'Thứ 5 - ngày 10 tháng 8, năm 2025',
  code: 'Đề bài A',
  duration: '40 phút',
  questions: [
    {
      text: '1+1 = ?',
      answers: [{ title: 1 }, { title: 2, correct: true }, { title: 3 }, { title: 4 }],
    },
    {
      text: '2+2 = ?',
      answers: [{ title: 2 }, { title: 4, correct: true }, { title: 6 }, { title: 8 }],
    },
    {
      text: '3+3 = ?',
      answers: [{ title: 3 }, { title: 5 }, { title: 6, correct: true }, { title: 9 }],
    },
  ],
};
