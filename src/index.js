import express from "express";
import { EMAIL, ORIGIN_PORT, PASSWORD, PORT } from "./config/serverConfig.js";
import apiRouter from "./routers/index.js";
import connectDB from "./config/dbConfig.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "./middlewares/middleware.js";

const SECRET_KEY = "your_secret_key";

const users = [
  {
    email: EMAIL,
    password: bcrypt.hashSync(PASSWORD, 10), // Password is hashed for security
  },
];

const app = express();
app.use(
  cors({
    origin: ORIGIN_PORT,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // Generate a JWT token
  try {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome ${req.user.email} to the dashboard!` });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token"); // Ensure the cookie name matches
  res.status(200).json({ message: "Logged out successfully" });
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on Port ${PORT}...`);
    }); //callback function is executed when the server is up and running
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
