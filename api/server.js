const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoutes");
const stickyNoteRoutes = require("./routes/stickyNoteRoutes");

const app = express();
const PORT = 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", stickyNoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
