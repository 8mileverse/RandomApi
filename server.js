const path = require("path");
const express = require("express");
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5002;
const connectDB = require('./config/db');
connectDB();


const app = express();
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS Middleware
app.use(cors({
  // origin: process.env.CORS_ORIGIN,
  origin: '*',
  credentials: true
}));
// app.use(cors());

// static folder for public
app.use(express.static(path.join(__dirname, "public")));




app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
  res.send({  
    message: "Welcome to the RandomIdeas Api",
    version: "1.0.0"
  });
});

const ideaRouter = require('./routes/idea');
app.use('/api/ideas', ideaRouter); // a small piece of middleware

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const test = require('os');
console.log(test.uptime())

const days = Math.floor(test.uptime() / 60 / 60 / 24);
const hours = Math.floor(test.uptime() / 60 / 60 % 24);
const minutes = Math.floor(test.uptime() / 60 % 60);
const seconds = Math.floor(test.uptime() % 60);

console.log(`Server has been running for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
