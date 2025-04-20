import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-t-orange-500 border-l-orange-400 border-b-orange-300 border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
