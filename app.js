require("dotenv").config();
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const { isActiveRoute } = require("./server/helpers/routeHelpers");

//Puerto
const PORT = 5000 || process.env.PORT;

//App
const app = express();
app.use(express.static("public"));
app.locals.isActiveRoute = isActiveRoute;

//Database
const connectDB = require("./server/config/db");

//cookies
const cookieParser = require("cookie-parser");
//MongoStore
const mongoStore = require("connect-mongo");

//Connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(methodOverride("_METHOD"));

//Template engine
const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);

app.use(express.json());
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

/*user routes*/
app.get("/", require("./server/routes/main"));
app.get("/about", require("./server/routes/main"));
app.get("/contact", require("./server/routes/main"));
app.get("/post/:id", require("./server/routes/main"));
app.post("/search", require("./server/routes/main"));
/* admin rotes */
app.get("/", require("./server/routes/admin"));
app.get("/admin", require("./server/routes/admin"));
app.post("/admin", require("./server/routes/admin"));
app.post("/register", require("./server/routes/admin"));
app.get("/dashboard", require("./server/routes/admin"));
app.get("/add-post", require("./server/routes/admin"));
app.post("/add-post", require("./server/routes/admin"));
app.put("/edit-post/:id", require("./server/routes/admin"));
app.get("/edit-post/:id", require("./server/routes/admin"));
app.delete("/delete-post/:id", require("./server/routes/admin"));
//Logout
app.get("/logout", require("./server/routes/admin"));

app.listen(PORT, () => {
  console.log(`App listening on port: localhost:${PORT}`);
});
