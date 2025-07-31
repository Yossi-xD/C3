const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();




app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ==== API Routes ==== //
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/RequestRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Serve static files from the Client folder
app.use(express.static(path.join(__dirname, "Client")));

// ==== Static Page Routes ==== //

//Resquester_Request
app.use("/api/requests", require("./routes/RequestRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));


// Serve homepage
app.get("/", (req, res) => {
  console.log("GET / hit");
  res.sendFile(path.join(__dirname, "Client","main", "main.html"));
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "Dashboard Page", "dashboard.html"));
});

// Browse Requests
app.get("/browse", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "Browse Requests", "browse-requests.html"));
});

// Payment Page
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "payment page", "payment.html"));
});

// Post Delivery Page
app.get("/post-delivery", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "post delivery page", "post-delivery.html"));
});

// Profile Page
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "profile", "profile.html"));
});

// Track Delivery Page
app.get("/track", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "track delivery", "track-delivery.html"));
});

// Messages Page
app.get("/messages", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "messages", "index.html"));
});

// Accessibility Settings Page
app.get("/accessibility", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "accessibility", "accessibility.html"));
});


// ==== Server Start ==== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
