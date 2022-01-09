require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const problemRouter = require('./routes/problem');
const blogRouter = require('./routes/blog');
const interviewRouter = require('./routes/interview');
const contestRouter = require('./routes/contest');
const userRouter = require('./routes/user');

const multer = require('multer');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', problemRouter);
app.use('/api', contestRouter);
app.use('/api', userRouter);
app.use('/api', blogRouter);
app.use('/api', interviewRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ msg: "File has been uplodad" });
})

require('./config/db');

app.listen(port, () => console.log(`Server running at port ${port}`))