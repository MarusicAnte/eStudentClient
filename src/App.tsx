import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Users from './pages/Users';
import { Departments } from './pages/Departments';
import Subjects from './pages/subjects/Subjects';
import Schedule from './pages/Schedule';
import Classrooms from './pages/Classrooms';
import { IsLoggedIn } from './components/context/UserContext';
import { AllSubjects } from './pages/subjects/AllSubjects';
import { MySubjects } from './pages/subjects/MySubjects';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<IsLoggedIn />}>
          <Route path="/home" element={<Home />}>
            <Route path="notifications" element={<Notifications />} />
            <Route path="users" element={<Users />} />
            <Route path="departments" element={<Departments />} />
            <Route path="subjects" element={<Subjects />}>
              <Route path="all-subjects" element={<AllSubjects />} />
              <Route path="my-subjects" element={<MySubjects />} />
            </Route>
            <Route path="schedule" element={<Schedule />} />
            <Route path="classrooms" element={<Classrooms />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
