/*const express = require('express');
const mysql = require('mysql2');
const path = require("path");
const app = express();
const port = 4000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanchit@mysql',
  database: 'SmartAttendanceSystem'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.connect((error) => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.post('/submitData', (req, res) => {
  const formData = req.body;
  const sql = 'INSERT INTO TInfo (Name, Tid, email, password, year, section, subject, STid) VALUES (?,?,?,?,?,?,?,?)';
  connection.query(sql, [formData.Name, formData.Tid, formData.email, formData.password, formData.year, formData.section, formData.subject, formData.STid], (error, result) => {
    if (error) {
      console.error('Error storing data: ' + error.stack);
      res.send('Error storing data in the database.');
      return;
    }
    console.log('Data stored in the database.');
    res.send('Data stored in the database.');
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM TInfo WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (error, results, fields) => {
      if (error) {
          console.error('Error executing query: ', error);
          res.status(500).send('Internal Server Error');
          return;
      }
      if (results.length > 0) {
          res.send('Login Succesful');
          res.redirect('/t.html'); // Redirect to t.html on successful login
      } else {
          res.send('Invalid email or password');
      }
  });
});

app.use(express.static('public'));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const port=4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanchit@mysql',
  database: 'SmartAttendanceSystem'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(`SELECT * FROM Tinfo WHERE email = '${email}' AND password = '${password}'`, (error, results, fields) => {
    if (results.length > 0) {
      const name = results[0].Name;
      const section=results[0].section;
      res.send({ success: true, name,section });
    } else {
      res.send({ success: false });
    }
  });
});
let currentEntry = 0;

app.get('/data', (req, res) => {
    connection.query('SELECT * FROM StudA', (error, results, fields) => {
        if (error) throw error;
        if (currentEntry >= results.length) {
            currentEntry = 0;
        }
        const name = results[currentEntry].Name; // Replace your_column with the desired column name
        const roll_no=results[currentEntry].roll_no;
        const Subject=results[currentEntry].Subject;
        currentEntry++;
        res.send(name,roll_no,Subject);
    });
});
app.get('/absent', (req, res) => {
  connection.query('SELECT * FROM StudA', (error, results, fields) => {
    const { Name, Roll_no } = req.body;
    const sql = 'INSERT INTO StudA (Attendance) VALUES (0) WHERE Name=? AND Roll_No=?';

    db.query(sql, [Name,Roll_no], (err, result) => {
        if (err) throw err;
        console.log('Data inserted successfully');
        res.send({ success: true });
    });
});
});
app.get('/present', (req, res) => {
  connection.query('SELECT * FROM StudA', (error, results, fields) => {
    const { Name, Roll_no } = req.body;
    const sql = 'INSERT INTO StudA (Attendance) VALUES (1) Where Name=? AND Roll_No=?';

    db.query(sql, [Name,Roll_no], (err, result) => {
        if (err) throw err;
        console.log('Data inserted successfully');
        res.send({ success: true });
    });
});
});
app.use(express.static('public'));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});