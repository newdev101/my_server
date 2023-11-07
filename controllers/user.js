const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  console.log(`new ${req.method} request received`);
  const allUsers = await User.find({});
  console.log("status:success");
  return res.status(200).send(allUsers);
}

async function handlePostNewUser(req, res) {
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
}

async function handleGetUserById(req, res) {
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
}

async function handlePutUserById(req, res) {
  console.log(`new ${req.method} request received`);
  return res.json({ status: "pending" });
}

async function handlePatchUserById(req, res) {
  console.log(`new ${req.method} request received`);
  const body = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  console.log("status:success");
  return res.status(200).json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  console.log(`new ${req.method} request received`);
  await User.findByIdAndDelete(req.params.id);
  console.log("status:success");
  return res.status(200).json({ status: "success" });
}

module.exports = {
  handleGetAllUsers,
  handlePostNewUser,
  handleGetUserById,
  handlePutUserById,
  handlePatchUserById,
  handleDeleteUserById,
};
