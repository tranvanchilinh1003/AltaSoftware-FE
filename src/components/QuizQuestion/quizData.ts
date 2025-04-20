import { QuizQuestion } from "./interface";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Cơ quan nào của Liên hợp quốc có sự tham gia đầy đủ tất cả các thành viên, họp mỗi năm 1 lần để bàn bạc thảo luận các vấn đề liên quan đến Hiến chương của Liên hợp quốc?",
    options: [
      { id: "A", text: "Ban thư kí." },
      { id: "B", text: "Hội đồng bảo an." },
      { id: "C", text: "Hội đồng quản thác quốc tế." },
      { id: "D", text: "Đại hội đồng." }
    ],
    correctAnswerId: "D",
    selectedAnswerId: "D"
  },
  {
    id: 2,
    question: "Nguyên tắc nhất trí giữa 5 nước lớn trong tổ chức Liên hợp quốc được đề ra vào thời điểm nào?",
    options: [
      { id: "A", text: "Tại Hội nghị Tê-hê-ran (1943)." },
      { id: "B", text: "Tại Hội nghị San Phran-xi-xco (Tháng 4 - 6/1945)." },
      { id: "C", text: "Tại Hội nghị I-an-ta (tháng 2/1945)." },
      { id: "D", text: "Tại Hội nghị Pốt-xđam (tháng 7/1945)." }
    ],
    correctAnswerId: "B",
    selectedAnswerId: "B"
  },
  {
    id: 3,
    question: "Sự tham gia của Liên Xô trong ban thường trực Hội đồng Bảo an Liên hợp quốc có ý nghĩa như thế nào?",
    options: [
      { id: "A", text: "Thể hiện đây là một tổ chức quốc tế có vai trò quan trọng trong việc duy trì trật tự, hòa bình, an ninh thế giới sau chiến tranh." },
      { id: "B", text: "Góp phần làm hạn chế sự thao túng của chủ nghĩa tư bản đối với tổ chức Liên hợp quốc." },
      { id: "C", text: "Khẳng định vai trò tối cao của 5 nước lớn trong tổ chức Liên hợp quốc." },
      { id: "D", text: "Khẳng định sự thắng lợi của chủ nghĩa xã hội trong cuộc đấu tranh chống chủ nghĩa tư bản." }
    ],
    correctAnswerId: "B",
    selectedAnswerId: "D"
  }
];
