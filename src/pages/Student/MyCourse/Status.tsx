export type StatusType = 'not_join' | 'not_start' | 'finish' | 'not_finish';

interface StatusProps {
  status: StatusType;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <>
      {status === 'not_join' ? (
        <button className="p-1 pl-3 pr-3 text-white bg-orange-500 rounded-md font-bold">Tham gia</button>
      ) : (
        <span className={`italic ${status === 'not_start' ? 'text-red-500' : status === 'finish' ? 'text-green-500' : 'text-blue-500'}`}>
          {status === 'not_start' ? 'Chưa bắt đầu' : status === 'finish' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </span>
      )}
    </>
  );
};

export default Status;
