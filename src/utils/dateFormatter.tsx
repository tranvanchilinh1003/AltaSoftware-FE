export const formatExamDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };
  