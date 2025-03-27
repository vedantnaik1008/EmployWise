import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UserList';
import EditUser from './pages/EditUser';
import { useState } from 'react';



function App() {
    const [users, setUsers] = useState([]);

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Login />} />
                  <Route
                      path='/users'
                      element={<UsersList users={users} setUsers={setUsers} />}
                  />
                  <Route
                      path='/edit-user/:id'
                      element={<EditUser setUsers={setUsers} />}
                  />
                  <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App
