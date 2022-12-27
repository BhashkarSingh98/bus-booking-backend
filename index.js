const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const User = require("./db/User");
const Passengers = require("./db/Passengers");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("dbconnection seccessful!"))
.catch((err)=>console.log(err));
var admin=0;

app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong " });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  console.log("user");
  console.log(req.body);
  if (req.body.password && req.body.email) {
    console.log(req.body.password);
    
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      admin=0;
      jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong " });
        }
        if(req.body.password=="admin"&&req.body.email=="admin@123.com"){
          admin=1;
        }
        res.send({ user, auth: token ,admin});
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found email and password" });
  }
});

app.post("/addseats", async (req, res) => {
  let passenger = new Passengers(req.body);
  let result = await passenger.save();
  res.send(result);
});
app.get("/passengers", async (req, res) => {
  let passengers = await Passengers.find();
  if (passengers.length > 0) {
    res.send(passengers);
  } else {
    res.send({ result: "no product found" });
  }
});

app.delete("/passenger/:id", async (req, res) => {
  let result = await Passengers.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/passenger/:id", async (req, res) => {
  let result = await Passengers.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no record found" });
  }
});
app.put("/passenger/:id", async (req, res) => {
  let result = await Passengers.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
     
         color:"gray",
          visibility:"visible",
          display:"none",
          booked:true
    
    }
  );

  res.send(result);
});



app.listen(process.env.PORT || 8080,()=>{
  console.log("backend server running");
})

