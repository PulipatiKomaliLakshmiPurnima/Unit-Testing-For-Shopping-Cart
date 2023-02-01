const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}
// Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute");
const favourite = require("./routes/favouriteRoute");

app.use("/api", product);
app.use("/api", user);
app.use("/api", cart);
app.use("/api", favourite);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
