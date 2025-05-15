// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import StudentForm from './StudentForm';
// import StudentList from './StudentList';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<StudentForm />} />
//         <Route path="/students" element={<StudentList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { StudentProvider } from "./StudentContext";

function App() {
  return (
    <StudentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
}

export default App;
