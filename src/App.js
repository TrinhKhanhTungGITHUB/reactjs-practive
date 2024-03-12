import './App.scss';
import Container from "react-bootstrap/Container"
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from "./context/UserContext"

function App() {
  const { user, loginContext } = useContext(UserContext);

  console.log(user);

  // Giải quyết tình trạng load lại trang mất tên người dùng
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  },[])

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUsers />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>

  );
}

export default App;