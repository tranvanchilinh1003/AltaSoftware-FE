import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '../../../../../../components/TabComponent';
import { chatCategories } from '../../data/questionCategory';
import { ChatCategory } from '../../types/questionCategory';
import { FilterState } from '../../types/questionFilter';

interface FilterByQuestionCategoryProps {
    filters: FilterState;
    onChange?: (selectedCategoryQuestions: ChatCategory[]) => void;
}

const CateQAFilter: React.FC<FilterByQuestionCategoryProps> = ({ filters, onChange }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
        if (filters.questionCategory) {
            setSelectedCategoryId(filters.questionCategory.id);
        } else {
            setSelectedCategoryId(chatCategories[0].id);
            if (onChange) {
                onChange([chatCategories[0]]);
            }
        }
    }, [filters.questionCategory]);

    const handleTabChange = (category: ChatCategory) => {
        setSelectedCategoryId(category.id);
        if (onChange) {
            onChange([category]);
        }
    };

    return (
        <Tabs aria-label="Options" radius="xl" color="primary" variant="solid" size="lg">
            {chatCategories.map((category) => (
                <Tab
                    key={category.id}
                    tabKey={category.id.toString()}
                    title={category.name}
                    radius="xl"
                    variant={selectedCategoryId === category.id ? 'bordered' : 'light'}
                    color="default"
                    size="sm"
                    tag={category.count}
                    onClick={() => handleTabChange(category)} children={undefined} />
            ))}
        </Tabs>
    );
};

export default CateQAFilter;
