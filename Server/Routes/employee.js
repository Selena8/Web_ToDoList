const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const moment = require('moment-timezone');
const con = require('../Config/Database');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})
// Get all employees
router.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee WHERE status_delete = 0";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get employee error in SQL" });
        return res.json({ Status: "Success", Result: result });
    });
});

// Get an employee by ID
router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get employee error in SQL" });
        return res.json({ Status: "Success", Result: result });
    });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, address, salary, role } = req.body;
    const errors = [];
    if (!name) {
      errors.push("Name is required");
    }
    if (!email) {
      errors.push("Email is required");
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        errors.push("Invalid email format");
      }
    }
    if (!address) {
      errors.push("Address is required");
    }
    if (!salary || isNaN(salary) || salary < 0) {
      errors.push("Invalid salary format");
    }
    if (!role) {
      errors.push("Role is required");
    }
  
    if (errors.length > 2) {
      return res.status(400).json({ Error: "Invalid data provided" });
    } else if (errors.length > 0) {
      return res.status(400).json({ Errors: errors });
    }
  
    const sql = "UPDATE employee SET name = ?, email = ?, address = ?, salary = ?, role = ?, updated_at = ? WHERE id = ?";
    const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    con.query(sql, [name, email, address, salary, role, currentTime, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Update employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
});

  
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee SET status_delete = 1 WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: err});
        return res.json({ Status: "Success" });
    });
});



router.post('/create', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.json({ Error: "No file uploaded" });
    }
    const sql = "INSERT INTO employee (`name`, `email`, `password`, `address`, `salary`, `image`, `role`, `created_at`,`status_delete`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.role,
            currentTime,
            0
        ];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error in signup query" });
            return res.json({ Status: "Success" });
        });
    });
});


// Get the count of admin users
router.get('/adminCount', (req, res) => {
    const sql = "SELECT COUNT(id) AS admin FROM employee where role='admin'";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

// Get the count of employees
router.get('/employeeCount', (req, res) => {
    const sql = "SELECT COUNT(id) AS employee FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

// Get the sum of all employee salaries
router.get('/salary', (req, res) => {
    const sql = "SELECT SUM(salary) AS sumOfSalary FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

module.exports = router;
