const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const usersRouter = require("./routers/users.routes");
const taskRouter = require('./routers/task.routers')

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/tasks", taskRouter);


mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connect");
  });


//Connected to server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Application start at ${process.env.PORT || 8000}`);
})