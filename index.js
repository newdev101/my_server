const express = require("express");
const fs = require("fs");
const app = express();

const users = require("./MOCK_DATA.json");
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false })); //middle ware to get the input body

app.use((req,res,next)=>{ 
  const log = `\n${Date.now()} ${req.method} ${req.path} ${req.url}`;
  fs.appendFile("./log.txt",log,(err)=>{});
  next();
}); //middleware for log update



app
  .route("/api/users")
  .get((req, res) => {
    console.log(`new ${req.method} request received`);
    return res.status(200).send(users);
  })
  .post((req, res) => {
    console.log(`new ${req.method} request received`);

    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    console.log(body);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      console.log(`\n Data added sucessfully at id=${users.length}`);
      return res.status(201).json({ status: "sucess" });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    console.log(`new ${req.method} request received`);
    

    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
  .patch((req, res) => {
    console.log(`new ${req.method} request received`);
    

    const id = Number(req.params.id);
    const body = req.body;

    if (id < users.length) {
      //updating the specific user
      users[id - 1].first_name = body.first_name;
      users[id - 1].last_name = body.last_name;
      users[id - 1].email = body.email;
      users[id - 1].gender = body.gender;
      users[id - 1].job_title = body.job_title;

      console.log(body);
      console.log("satus:success");
      return res.status(200).json({ status: "sucess" });
    } else {
      console.log("user not found");
      return res.status(404).json({ status: "user not found" });
    }
  })
  .delete((req, res) => {
    console.log(`new ${req.method} request received`);
    const id = Number(req.params.id);
    //deleting the specific user
    if (id < users.length) {
      users.splice(id - 1, 1);
      for (var i = id - 1; i < users.length; i++) users[i].id--;
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {});
      console.log(`user with ${id} successfully deleted`);
      return res.status(200).json({ status: "sucess" });
    } else {
      console.log("user not found");
      return res.status(404).json({ status: "user not found" });
    }
  });

app.listen(PORT, () => console.log("server connected"));
