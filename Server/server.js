const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


const con = require('./Config/Database'); 


con.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected');
});

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Import routers
const authenticationRouter = require('./Routes/authentication');
const employeeRouter = require('./Routes/employee');
const taskRouter = require('./Routes/task');

// Use routers
app.use('/authentication', authenticationRouter);
app.use('/employee', employeeRouter);
app.use('/task', taskRouter)

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
