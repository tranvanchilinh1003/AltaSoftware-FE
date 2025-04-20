import React, { useState } from "react";
import ClassroomOranized from "./ClassroomOranized";
import ClassroomUpComing from "./ClassroomUpComing/index ";

const Classroom: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, title: "Lớp học sắp tới", component: <ClassroomOranized /> },
        { id: 1, title: "Lớp học đã tổ chức", component: <ClassroomUpComing /> },
    ];

    return (
        <>
            <div className="text-3xl font-bold">Quản lý lớp học</div>
            <div className="w-full mx-auto p-4">
                {/* Tab Buttons */}
                <div className="flex border-b border-white h-14">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-2 px-6 font-medium transition duration-300 focus:outline-none
                ${activeTab === tab.id
                                    ? "bg-background-orange-1 text-white border border-border-orange rounded-t-lg"
                                    : "bg-white text-black border border-orange-300 rounded-t-lg hover:bg-border-orange"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 bg-white shadow-md rounded-b-lg border border-white">
                    {tabs[activeTab].component}
                </div>
            </div>
        </>
    );
};

export default Classroom;
