import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { LayoutProps } from './type';

const MainLayout: React.FC<LayoutProps> = ({ role }) => {
  return (
    <div className="App flex flex-col min-h-screen">
      <main className="flex-grow flex relative">
        <aside>
          <Menu role={role} />
        </aside>
        <div className="flex-grow  flex flex-col">
          <header className="pl-20 top-0">
            <Header />
          </header>

          <div className="pl-10 flex-grow bg-gray-50">
            <Outlet />
          </div>

          <footer className="text-white text-center sticky bottom-0">
            <Footer />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
