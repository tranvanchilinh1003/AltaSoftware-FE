import TeachingAssignmentList from "./TeachingAssignmentList";
import TeachingAssignmentSidebar from "./TeachingAssignmentSidebar";
import React, { useState } from 'react';
import TeachingAssignmentGetbyId from "./TeachingAssignmentList/TeachingAssignmentGetbyId";

const TeachingAssignment: React.FC = () => {
    const [lecturerId, setLecturerId] = useState<number | null>(null);

    const handleLecturerChange = (lecturerId: number | null) => {
        setLecturerId(lecturerId);
    };
    return (
        <div className="grid grid-cols-[0.6fr_2.4fr] pr-4 xl:grid-cols-[0.6fr_2.4fr] xl:gap-4">
            <div className="col-span-full xl:col-auto">
                <TeachingAssignmentSidebar onChange={handleLecturerChange} />
            </div>
            <div className="col-span-full xl:col-auto">
                {lecturerId === null ? (
                    <TeachingAssignmentList />
                ) : (
                    <TeachingAssignmentGetbyId lecturerId={lecturerId} />
                )}
            </div>
        </div>
    );
};

export default TeachingAssignment;
