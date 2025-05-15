import React, { useContext, useState } from "react";
import { StudentContext } from "./StudentContext";
import "./StudentList.css";

const StudentList = () => {
  const { students } = useContext(StudentContext);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredStudents = students.filter((student) =>
    student.phone.includes(search)
  );

  return (
    <div className="container">
      <h2 className="heading">Student List</h2>
      <form onSubmit={handleSearch} className="searchForm">
        <label>Telephone</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, i) => (
            <tr key={i}>
              <td>{student.name}</td>
              <td>{student.dob}</td>
              <td>
                <a href={`mailto:${student.email}`}>{student.email}</a>
              </td>
              <td>{student.phone}</td>
              <td>
                x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
