import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { StudentContext } from "./StudentContext";
import "./StudentForm.css";

const StudentForm = () => {

    const navigate = useNavigate();
    const { students, setStudents } = useContext(StudentContext);
    
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  //const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (
      formData.name &&
      formData.dob &&
      formData.email &&
      formData.phone
    ) {
      setStudents((prev) => [...prev, formData]);
      setFormData({
        name: "",
        address: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
      });
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
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Address
          <input name="address" value={formData.address} onChange={handleChange} />
        </label>

        <div className="row">
          <label>
            Date of Birth
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
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
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <button onClick={handleAdd} className="add-btn">Add</button>

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
                <td>{student.name}</td> {/*Table data*/}
                <td>{student.dob}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
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