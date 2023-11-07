const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

//connecting to database
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube_app_2")
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//defining schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//defining model
const User = mongoose.model("user", userSchema);

const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false })); //middle ware to get the input body

app.use((req, res, next) => {
  const log = `\n${Date.now()} ${req.method} ${req.path} ${req.url}`;
  fs.appendFile("./log.txt", log, (err) => {});
  next();
}); //middleware for log update

//routes
app
  .route("/api/users")
  .get(async (req, res) => {
    console.log(`new ${req.method} request received`);

    const allUsers = await User.find({});
    console.log("status:success");
    return res.status(200).send(allUsers);
  })
  .post(async (req, res) => {
    console.log(`new ${req.method} request received`);

    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.job_title) {
      console.log("status:wrong data");
      return res.status(401).json({ status: "unsuficiant data" });
    }

    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    console.log(result);
    console.log("status:success");
    res.status(201).json({ status: "success" });
  });

//
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    console.log(`new ${req.method} request received`);

    const user = await User.findById(req.params.id);
    if (user) {
      console.log(user);
      console.log("status:sucess");
      return res.status(200).json(user);
    } else {
      console.log("user not found");
      return res.status(404).json({ status: "user not found" });
    }
  })
  .put((req, res) => {
    console.log(`new ${req.method} request received`);

    return res.json({ status: "pending" });
  })
  .patch(async(req, res) => {
    console.log(`new ${req.method} request received`);
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id,{
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      job_title:body.job_title,
      gender:body.gender,
    });
    console.log("status:success");
    return res.status(200).json({status:"success"});
  })
  .delete(async(req, res) => {
    console.log(`new ${req.method} request received`);
    await User.findByIdAndDelete(req.params.id);
    console.log("status:success");
    return res.status(200).json({status:"success"});
  });

app.listen(PORT, () => console.log("server connected"));
