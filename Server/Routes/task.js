const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const moment = require('moment-timezone');
const con = require('../Config/Database');

router.get('/tasks/:id_employee', (req, res) => {
    const id_employee = req.params.id_employee;
    const sql = "SELECT * FROM Task WHERE id_employee = ? AND status_delete = 0";
    con.query(sql, [id_employee], (err, result) => {
        if (err) return res.json({ Error: "Get tasks error in SQL" });
        return res.json({ Status: "Success", Result: result });
    });
});

router.get('/tasks/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Task WHERE id_task = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        if (!result || result.length === 0) {
            return res.status(404).json({ Error: "Task not found" });
        }
        return res.json({ Status: "Success", Result: result });
    });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { category, title, content, time_deadline, status } = req.body;
    const errors = [];
  
    if (!category) {
      errors.push("Category is required");
    }
    if (!title) {
      errors.push("Title is required");
    }
    if (!content) {
      errors.push("Content is required");
    }
    if (!time_deadline) {
      errors.push("Time deadline is required");
    } else {
      if (!moment(time_deadline, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        errors.push("Invalid time deadline format");
      }
    }
    if (!status) {
      errors.push("Status is required");
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ Errors: errors });
    }
  
    const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const sql = "UPDATE Task SET category = ?, title = ?, content = ?, time_deadline = ?, status = ?, updated_at = ? WHERE id_task = ?";
    con.query(sql, [category, title, content, time_deadline, status, currentTime, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Update task error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
});
  

router.put('/update/status/:id/:status', (req, res) => {
    const id_task = req.params.id;
    const status = req.params.status;

    const sql = "UPDATE Task SET status = ? WHERE id_task = ?";
    con.query(sql, [status, id_task], (err, result) => {
        if (err) return res.json({ Error: err });
        return res.json({ Status: "Success", Result: result });
    });
});



router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE Task SET status_delete = 1 WHERE id_task = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Delete task error in SQL" });
        return res.json({ Status: "Success" });
    });
});

router.post('/create', (req, res) => {
  const { id_employee, category, title, content, time_deadline, status } = req.body;
  const errors = [];

  if (!id_employee) {
    errors.push("Employee ID is required");
  }
  if (!category) {
    errors.push("Category is required");
  }
  if (!title) {
    errors.push("Title is required");
  }
  if (!content) {
    errors.push("Content is required");
  }
  if (!time_deadline) {
    errors.push("Time deadline is required");
  } else {
    if (!moment(time_deadline, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      errors.push("Invalid time deadline format");
    }
  }
  if (!status) {
    errors.push("Status is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ Errors: errors });
  }

  const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  const sql = "INSERT INTO Task (id_employee, category, title, content, time_create, time_deadline, status, status_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, [id_employee, category, title, content, currentTime, time_deadline, status, 0], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Create task error in SQL" });
      }
      return res.json({ Status: "Success", Result: result });
  });
});


module.exports = router;