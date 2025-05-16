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
