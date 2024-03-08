const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3001;



mongoose.connect("mongodb+srv://anaDeArmaz:khemzzy@cluster0.4e3ok2n.mongodb.net/todoist_db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


const Register = require('./model/register')
app.use(express.json());
app.use(
  cors({
    origin: ["https://front-end-eight-swart.vercel.app"],
    methods: ["POST, GET, DELETE, PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const registerRoutes = require('./modules/registerUser');
const loginRoutes  = require('./modules/loginUser');
const getUserRoutes = require('./modules/getCredentials')

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/user', getUserRoutes)


app.listen(PORT, () => {
    console.log(`PORT is listening to ${PORT}`)
})
