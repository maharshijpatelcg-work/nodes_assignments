const express = require('express');
const app = express();
app.use(express.json());

const students = [
  { id: 1, name: 'Aarav Sharma', branch: 'CSE', semester: 8, cgpa: 9.3 },
  { id: 2, name: 'Ishita Verma', branch: 'IT', semester: 7, cgpa: 8.9 },
  { id: 3, name: 'Rohan Kulkarni', branch: 'ECE', semester: 6, cgpa: 8.4 },
  { id: 4, name: 'Meera Iyer', branch: 'CSE', semester: 8, cgpa: 9.1 },
  { id: 5, name: 'Kunal Deshmukh', branch: 'IT', semester: 5, cgpa: 7.8 },
  { id: 6, name: 'Ananya Reddy', branch: 'CSE', semester: 6, cgpa: 8.7 },
  { id: 7, name: 'Vikram Patil', branch: 'ECE', semester: 7, cgpa: 8.2 },
  { id: 8, name: 'Priyanka Nair', branch: 'AI', semester: 4, cgpa: 8.8 },
  { id: 9, name: 'Harsh Mehta', branch: 'Data Science', semester: 5, cgpa: 8.0 },
  { id: 10, name: 'Neha Gupta', branch: 'CSE', semester: 6, cgpa: 7.9 }
];

app.get('/', (req, res) => {
  res.json('Welcome to get all students management system you can get all students by /students');
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/topper', (req, res) => {
  const topper = students.reduce((top, student) => {
    if (!top || student.cgpa > top.cgpa) return student;
    return top;
  }, null);
  res.json(topper);
});

app.get('/students/average', (req, res) => {
  const total = students.reduce((sum, student) => sum + student.cgpa, 0);
  const average = total / (students.length || 1);
  res.json({ averageCGPA: Number(average.toFixed(2)) });
});

app.get('/students/count', (req, res) => {
  res.json({ totalStudents: students.length });
});

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(p => p.id === id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

app.get('/students/branch/:branchName', (req, res) => {
  const branchName = req.params.branchName;
  const studentBranch = students.filter(s => s.branch === branchName);
  if (studentBranch.length === 0) return res.status(404).json({ message: 'Students not found' });
  res.json(studentBranch);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
