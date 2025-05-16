import React, { useState, useEffect } from "react";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState("");
  console.log(students);
  // Fetch students when component mounts
  useEffect(() => {
    async function getData() {
      const url = "https://localhost:7047/api/Student";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setStudents(json); // Save the fetched data to state
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput); // Trigger search when form is submitted
  };

  const filteredStudents = students.filter((student) =>
    student.telephone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="heading">Student List</h2>
      <form onSubmit={handleSearch} className="searchForm">
        <label>Telephone</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, i) => (
              <tr key={i}>
                <td>{student.fullName}</td>
                <td>{student.dateOfBirth}</td>
                <td>
                  <a href={`mailto:${student.email}`}>{student.email}</a>
                </td>
                <td>{student.telephone}</td>
                <td>
                  x
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No student data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
