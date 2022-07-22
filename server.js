require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const problemRouter = require("./routes/problem");
const companyRouter = require("./routes/company");
const topicRouter = require("./routes/topic");
const blogRouter = require("./routes/blog");
const interviewRouter = require("./routes/interview");
const userRouter = require("./routes/user");
const path = require("path");

require("./config/db");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/api", problemRouter);
app.use("/api", companyRouter);
app.use("/api", topicRouter);
app.use("/api", userRouter);
app.use("/api", blogRouter);
app.use("/api", interviewRouter);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

app.listen(port, () => console.log(`Server running at port ${port}`));
