import React, { useContext } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './redux/store';
import './styles/tailwind.scss';
import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import LedershipRoutes from './routes/LeadershipRoutes';
import Login from './pages/Student/Login/Login';
import { CookiesProvider } from 'react-cookie';
import AuthProvider, { AuthContext } from './pages/Student/Login/AuthContext';
import ProtectedRoute from './pages/Student/Login/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import RootRedirect from './pages/Student/Login/RootRedirect';
function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Provider store={store}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route element={<ProtectedRoute allowRole={3} />}>
                  <Route path="/student/*" element={<StudentRoutes />} />
                </Route>
                <Route element={<ProtectedRoute allowRole={2} />}>
                  <Route path="/teacher/*" element={<TeacherRoutes />} />
                </Route>
                <Route element={<ProtectedRoute allowRole={1} />}>
                  <Route path="/leadership/*" element={<LedershipRoutes />} />
                </Route>
                <Route path="/login" element={<Login isLogin={true} />} />
                <Route path="/reset" element={<Login isLogin={false} />} />
                <Route path="/change-password" element={<Login isLogin={false} isChangePassword={true}/>} />
              </Routes>
            </Router>
          </AuthProvider>
        </Provider>
        <ToastContainer />
      </div>
    </CookiesProvider>
  );
}

export default App;
