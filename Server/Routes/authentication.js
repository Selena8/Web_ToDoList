const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyUser = require('../Middleware/verifyUser'); 

const con = require('../Config/Database'); 

router.post('/login', (req, res) => {
    const sql = "SELECT * FROM employee WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        
        if (result.length > 0) {
            const employee = result[0];
            
            bcrypt.compare(req.body.password, employee.password, (err, isMatch) => {
                if (err) return res.json({ Status: "Error", Error: "Error in comparing passwords" });

                if (isMatch) {
                    const id = employee.id;
                    const role = employee.role;
                    const email = employee.email;
                    const token = jwt.sign({ role, id, email }, "jwt-secret-key", { expiresIn: '1d' });

                    return res.json({ Status: "Success", token });
                } else {
                    return res.json({ Status: "Error", Error: "Sai Email hoặc Mật khẩu" });
                }
            });
        } else {
            return res.json({ Status: "Error", Error: "Sai Email hoặc Mật khẩu" });
        }
    });
});

router.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
                
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    });
});

router.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id, email: req.email, password: req.password });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
});

module.exports = router;
