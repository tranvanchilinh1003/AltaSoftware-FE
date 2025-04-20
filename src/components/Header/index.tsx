import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userCircle from '../../assets/images/people/user_circle.png';
import './style.css';
import { Cookies, useCookies } from 'react-cookie';
import { AuthContext } from '../../pages/Student/Login/AuthContext';
import Loading from '../Loading';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const navigator = useNavigate();
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigator('/login');
  };

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'userId']);
  const { setRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('userId');
    setRole(null);
    setLoading(false);
    setName('');
  };

  const [openMenu, setOpenMenu] = useState(false);
  const { name, setName } = useContext(AuthContext);

  return (
    <header className="header">
      <Loading isLoading={loading} />
      <div></div>
      <div className="user-section">
        {isLoggedIn ? (
          <>
            <img src={userCircle} alt="User Avatar" className="user-avatar" />
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  {name}
                  <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path
                      fill-rule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {openMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0" onClick={() => navigator('/change-password')}>
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="divider"></span>
            <button className="logout-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={handleLogin}>
              Đăng nhập
            </button>
            <span className="divider"></span>
            <button className="register-button">Đăng ký</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
