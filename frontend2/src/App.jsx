import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './pages/StudentForm.jsx';
import StudentList from './pages/StudentList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
