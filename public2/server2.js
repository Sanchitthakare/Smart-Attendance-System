const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const port=4002;

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