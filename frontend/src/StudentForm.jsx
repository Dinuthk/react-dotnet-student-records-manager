import { useNavigate } from 'react-router-dom';
import React, { useState ,useEffect } from "react";
import "./StudentForm.css";

const StudentForm = () => {
  
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  //Post data to API
  const postData = async () => {
    if (formData.fullName && formData.dateOfBirth && formData.email && formData.telephone) {
      try {
        const response = await fetch("https://localhost:7047/api/Student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const newStudent = await response.json(); // If your API returns the created student
        setStudents((prev) => [...prev, newStudent]); // Update local list
        alert("Student added successfully");

        // Clear form
        setFormData({
          
          address: "",
          dateOfBirth: "",
          email: "",
          fullName: "",
          gender: "",
          telephone: "",
        });
      } catch (error) {
        console.error("Error posting student:", error.message);
        alert("Failed to add student.");
      }
    } else {
      alert("Please fill required fields");
    }
  };

  const handleSubmit = () => {
    alert("Form submitted!");
    console.log("Submitted students:", students);
    navigate("/students");
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>

      <div className="form-section">
        <label>
          Full Name
          <input name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>

        <label>
          Address
          <input name="address" value={formData.address} onChange={handleChange} />
        </label>

        <div className="row">
          <label>
            Date of Birth
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </label>

          <div className="gender-section">
            <span>Gender</span>
            <label><input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"} /> Male</label>
            <label><input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} /> Female</label>
          </div>
        </div>

        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Telephone
          <input name="telephone" value={formData.telephone} onChange={handleChange} />
        </label>

        <button onClick={postData} className="add-btn">Add</button>

        <table>
          <thead>  {/*Table header - tfoot (Table Footer)*/}
            <tr>
              <th>Name</th>   {/* Table headers/column*/}
              <th>Date of Birth</th> 
              <th>Email</th>
              <th>Telephone</th>
            </tr>
          </thead>
          <tbody>  {/*Table body */}
            {students.map((student, i) => ( 
              <tr key={i}> {/*Table rows*/} 
                <td>{student.fullName}</td> {/*Table data*/}
                <td>{student.dateOfBirth}</td>
                <td>{student.email}</td>
                <td>{student.telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleSubmit} className="submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default StudentForm;