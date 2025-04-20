import React from 'react';
import { FilterState } from '../../types/questionFilter';
import CateQAFilter from './cateQAFilter';
import { ChatCategory } from '../../types/questionCategory';

interface QAFiltersProps {
  filters: FilterState;
  onChange?: (newFilters: FilterState) => void;
}

const QAFilters: React.FC<QAFiltersProps> = ({ filters, onChange = () => {} }) => {
  const handleCateQAChange = (selectedCategoryQuestions: ChatCategory[]) => {
    const newFilters: FilterState = {
      ...filters,
      questionCategory: selectedCategoryQuestions.length > 0 ? selectedCategoryQuestions[0] : undefined,
    };
    onChange(newFilters);
  };

  return (
    <div>
      <CateQAFilter filters={filters} onChange={handleCateQAChange} />
    </div>
  );
};

export default QAFilters;
