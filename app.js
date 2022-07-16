const express = require("express");
const app = express();
var port = process.env.PORT || 4000;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoute");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: "true" }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

// routes

app.get("/", (req, res) => res.redirect("/blogs"));

// blog routes
app.use("/blogs", blogRoutes);
app.get("/about", (req, res) => res.render("about", { title: "About" }));
app.use((req, res) => res.status(404).render("404", { title: "404" }));
