using backend.Data;
using backend.Models;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    // localhost:3306/api/students
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        // "ctor" to create a constructor
        public StudentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var allStudents = dbContext.Students.ToList();
            return Ok(allStudents); // return 200 OK http response
        }

        [HttpGet]
        [Route("{id}")] // localhost:3306/api/Students/{id}
        public IActionResult GetEmployeeById(int id)
        {
            var students = dbContext.Students.Find(id);
            if (students is null)
            {
                return NotFound(); // return 404 Not Found http response
            }
            return Ok(students); // return 200 OK http response
        }


        [HttpPost]
        public IActionResult AddEmployee(StudentDto studentDto)
        {
            var studentEntity = new Student()
            {
                FullName = studentDto.FullName,
                Address = studentDto.Address,
                DateOfBirth = studentDto.DateOfBirth,
                Gender = studentDto.Gender,
                Email = studentDto.Email,
                Telephone = studentDto.Telephone
            };

            dbContext.Students.Add(studentEntity);
            dbContext.SaveChanges();

            return Ok(studentEntity);
        }

        [HttpPut]
        [Route("{id}")] // localhost:3306/api/employees/{id}
        public IActionResult UpdateStudent(int id, StudentDto updateStudentDto)
        {
            var student = dbContext.Students.Find(id);

            if (student is null)
            {
                return NotFound(); // return 404 Not Found http response
            }

            student.FullName = updateStudentDto.FullName;
            student.Address = updateStudentDto.Address;
            student.DateOfBirth = updateStudentDto.DateOfBirth;
            student.Gender = updateStudentDto.Gender;
            student.Email = updateStudentDto.Email;
            student.Telephone = updateStudentDto.Telephone;

            dbContext.SaveChanges();

            return Ok(student);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = dbContext.Students.Find(id);

            if (student is null)
            {
                return NotFound();
            }
            dbContext.Students.Remove(student);
            dbContext.SaveChanges();
            return Ok(student);
        }
    }
}
