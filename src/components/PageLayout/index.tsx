import './style.scss';
import { LayoutDataProps } from './type';
import DeclareMenu from './../DeclareMenu/index';
import OpstionHeader from './../OpstionHeader/index';

const PageLayout: React.FC<LayoutDataProps> = ({ layout }) => {
  return (
    <>
      <div className="declare-container">
        <OpstionHeader />
        <div className="content">
          <aside className="supMenu">
            <DeclareMenu />
          </aside>
          <div className="main-content">{layout}</div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
