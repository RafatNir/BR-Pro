
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const registrationRoutes =
require("./routes/registrationRoutes");

const userRoutes =
require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/registrations",
  registrationRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.get("/", (req, res) => {
    res.send("BR Pro API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});