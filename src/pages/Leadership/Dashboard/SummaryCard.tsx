const SummaryCard = ({ title, count, className }: { title: string; count: number; className: string }) => {
    return (
      <div className={`relative ${className} text-white p-6 rounded-xl text-center overflow-hidden shadow-lg`}>
        <div className="absolute inset-0">
          <div className="w-24 h-24 bg-white opacity-20 rounded-full absolute top-[-29px] left-[-27px]"></div>
          <div className="w-[6rem] h-[6rem] bg-white opacity-20 rounded-full absolute top-[4.4rem] right-[3rem]"></div>
          <div className="w-[8rem] h-[8rem] bg-white opacity-20 rounded-full absolute top-[2rem] right-[-2rem]"></div>
        </div>
        <h2 className="text-3xl font-bold relative z-10">{count}</h2>
        <p className="relative z-10 text-lg">{title}</p>
      </div>
    );
  };
  
  export default SummaryCard;