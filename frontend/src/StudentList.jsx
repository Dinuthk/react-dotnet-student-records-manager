const StudentList = () => {
  return (
    <div>
      <h2>Student List Page</h2>
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
    </div>
  );
};

export default StudentList;
