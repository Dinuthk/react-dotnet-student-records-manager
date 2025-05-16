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

        //[HttpGet]
        //[Route("{id:guid}")] // localhost:3306/api/Students/{id}
        //public IActionResult GetEmployeeById(Guid id)
        //{
        //    var students = dbContext.Students.Find(id);
        //    if (students is null)
        //    {
        //        return NotFound(); // return 404 Not Found http response
        //    }
        //    return Ok(students); // return 200 OK http response
        //}
        [HttpGet]
        [Route("{phone}")] // e.g. localhost:5000/api/Students/by-phone/0711234567
        public IActionResult GetStudentByPhone(string phone)
        {
            var student = dbContext.Students.FirstOrDefault(s => s.Telephone == phone);

            if (student is null)
            {
                return NotFound(); // return 404 Not Found if not found
            }

            return Ok(student); // return 200 OK with student data
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
        [Route("{id:guid}")] // localhost:3306/api/employees/{id}
        public IActionResult UpdateStudent(Guid id, StudentDto updateStudentDto)
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
        [Route("{telephone}")]
        public IActionResult DeleteStudent(int telephone)
        {
            var student = dbContext.Students.Find(telephone);

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
