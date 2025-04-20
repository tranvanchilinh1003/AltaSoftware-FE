import ScoreBoardHeader from './header';
import TableScoreBoard from './table';
const ScoreBoard: React.FC = () => {
  return (
    <>
      <div className="student-retention">
        <ScoreBoardHeader />
        <div className="content">
          <TableScoreBoard />
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
