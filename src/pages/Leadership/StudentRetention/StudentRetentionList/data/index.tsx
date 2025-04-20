export interface StudentRetentionListItem {
    id: number;
    studentCode: string;
    studentName: string;
    dateOfBirth: Date;
    gender: string;
    classRetention: string; // Lớp bảo lưu
    retentionDate: Date; // Ngày bảo lưu
    retentionPeriod: string; // Thời gian bảo lưu
    retentionReason: string; // Lý do bảo lưu
  }

  const StudentRetentionListData: StudentRetentionListItem[] = [
    { id: 1, studentCode: "PC07506", studentName: "Nguyễn Văn A", dateOfBirth: new Date("2013-10-10"), gender: "Nam", classRetention: "6A", retentionDate: new Date("2025-02-27"), retentionPeriod: "Học kỳ 2", retentionReason: "Gia đình chuyển công tác" },
    { id: 2, studentCode: "PC07507", studentName: "Trần Thị B", dateOfBirth: new Date("2012-05-15"), gender: "Nữ", classRetention: "7B", retentionDate: new Date("2025-03-01"), retentionPeriod: "Học kỳ 3", retentionReason: "Lý do sức khỏe" },
    { id: 3, studentCode: "PC07508", studentName: "Lê Hoàng C", dateOfBirth: new Date("2011-08-21"), gender: "Nam", classRetention: "8C", retentionDate: new Date("2025-02-15"), retentionPeriod: "Học kỳ 1", retentionReason: "Gia đình gặp khó khăn" },
    { id: 4, studentCode: "PC07509", studentName: "Phạm Thị D", dateOfBirth: new Date("2013-12-01"), gender: "Nữ", classRetention: "6B", retentionDate: new Date("2025-02-25"), retentionPeriod: "Học kỳ 2", retentionReason: "Đi nước ngoài" },
    { id: 5, studentCode: "PC07510", studentName: "Hoàng Văn E", dateOfBirth: new Date("2012-07-19"), gender: "Nam", classRetention: "7A", retentionDate: new Date("2025-03-05"), retentionPeriod: "Học kỳ 3", retentionReason: "Bệnh dài hạn" },
    { id: 6, studentCode: "PC07511", studentName: "Nguyễn Thị F", dateOfBirth: new Date("2011-11-30"), gender: "Nữ", classRetention: "8B", retentionDate: new Date("2025-02-20"), retentionPeriod: "Học kỳ 1", retentionReason: "Khó khăn tài chính" },
    { id: 7, studentCode: "PC07512", studentName: "Trần Văn G", dateOfBirth: new Date("2013-09-14"), gender: "Nam", classRetention: "6C", retentionDate: new Date("2025-02-28"), retentionPeriod: "Học kỳ 2", retentionReason: "Gia đình chuyển nhà" },
    { id: 8, studentCode: "PC07513", studentName: "Lê Thị H", dateOfBirth: new Date("2012-06-22"), gender: "Nữ", classRetention: "7C", retentionDate: new Date("2025-03-10"), retentionPeriod: "Học kỳ 3", retentionReason: "Lý do cá nhân" },
    { id: 9, studentCode: "PC07514", studentName: "Phạm Văn I", dateOfBirth: new Date("2011-03-05"), gender: "Nam", classRetention: "8A", retentionDate: new Date("2025-02-18"), retentionPeriod: "Học kỳ 1", retentionReason: "Gia đình gặp khó khăn" },
    { id: 10, studentCode: "PC07515", studentName: "Nguyễn Thị J", dateOfBirth: new Date("2013-05-10"), gender: "Nữ", classRetention: "6A", retentionDate: new Date("2025-02-22"), retentionPeriod: "Học kỳ 2", retentionReason: "Đi du lịch dài hạn" },
    { id: 11, studentCode: "PC07516", studentName: "Trần Văn K", dateOfBirth: new Date("2012-08-17"), gender: "Nam", classRetention: "7B", retentionDate: new Date("2025-03-12"), retentionPeriod: "Học kỳ 3", retentionReason: "Lý do sức khỏe" },
    { id: 12, studentCode: "PC07517", studentName: "Lê Thị L", dateOfBirth: new Date("2011-10-29"), gender: "Nữ", classRetention: "8C", retentionDate: new Date("2025-02-16"), retentionPeriod: "Học kỳ 1", retentionReason: "Vấn đề gia đình" },
    { id: 13, studentCode: "PC07518", studentName: "Phạm Văn M", dateOfBirth: new Date("2013-04-01"), gender: "Nam", classRetention: "6B", retentionDate: new Date("2025-02-26"), retentionPeriod: "Học kỳ 2", retentionReason: "Chuyển trường" },
    { id: 14, studentCode: "PC07519", studentName: "Nguyễn Thị N", dateOfBirth: new Date("2012-12-15"), gender: "Nữ", classRetention: "7A", retentionDate: new Date("2025-03-08"), retentionPeriod: "Học kỳ 3", retentionReason: "Bệnh kéo dài" },

    // Thêm 30 mục dữ liệu mẫu nữa với các giá trị ngẫu nhiên nhưng hợp lý
    ...Array.from({ length: 30 }, (_, index) => ({
      id: 15 + index,
      studentCode: `PC07${520 + index}`,
      studentName: `Học Sinh ${String.fromCharCode(65 + (index % 26))}`,
      dateOfBirth: new Date(2010 + (index % 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      gender: index % 2 === 0 ? "Nam" : "Nữ",
      classRetention: `${6 + (index % 3)}${String.fromCharCode(65 + (index % 3))}`,
      retentionDate: new Date("2025-02-15"),
      retentionPeriod: ["Học kỳ 2", "Học kỳ 3", "Học kỳ 1"][index % 3],
      retentionReason: ["Gia đình chuyển công tác", "Lý do sức khỏe", "Khó khăn tài chính", "Lý do cá nhân",][index % 4],
    })),
  ];

  export default StudentRetentionListData;