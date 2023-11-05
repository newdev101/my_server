const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 8000;


function updatLog(req,res){
  var log = `\n${Date.now()} ${req.method} ${req.path} ${req.url}`;
  fs.appendFile('./log.txt',log,(err)=>{});
}

app
.route('/')
.get((req,res)=>{
  console.log(`new ${req.method} request received`);
  updatLog(req,res);
  return res.json({status:"sucess"});
})
.put((req,res)=>{
  console.log(`new ${req.method} request received`);
  updatLog(req,res);
  return res.json({status:"sucess"});
})
.patch((req,res)=>{
  console.log(`new ${req.method} request received`);
  updatLog(req,res);
  return res.json({status:"sucess"});
})
.delete((req,res)=>{
  console.log(`new ${req.method} request received`);
  updatLog(req,res);
  return res.json({status:"sucess"});
})
.post((req,res)=>{
  console.log(`new ${req.method} request received`);
  updatLog(req,res);
  return res.json({status:"sucess"});
});


app.listen(PORT,()=>console.log("server connected"));
