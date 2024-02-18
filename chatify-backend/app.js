const express = require("express");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const conversationRoute = require("./routes/conversationRoute");
const groupRoute = require("./routes/groupRoute");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/conversation", conversationRoute);
app.use("/group", groupRoute);

module.exports = app;
