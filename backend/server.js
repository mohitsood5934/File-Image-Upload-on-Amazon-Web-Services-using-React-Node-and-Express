const express = require("express");
const dotenv = require('dotenv');
const colors = require("colors");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");


dotenv.config();
const app = express();

app.use(cors());
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
      .yellow.bold
  );
});
