const express = require("express");
const session = require("express-session");
const path = require("path");
const port = 3001;

const channelRoutes = require("./routes/channelRoutes.js");
const programRoutes = require("./routes/programRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const favoriteRoutes = require("./routes/favoriteRoutes.js");

const app = express();
app.use(express.json());

// Express-session setup 
app.use(session({
  secret:"I am a Harry Potter fun  ",
  resave: false,
  saveUninitialized:true,
  cookie:{secure: "auto"}

})
);

app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

// Serve static files, makes the frontend files "available" to the backend
app.use(express.static(path.join(__dirname, "../build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..build/index.html'));
});
app.listen(port,(err)=>{
  if(err){
    console.error("The server could not be stated ...");
    console.log(err);
    return;
  }
  console.log(`Listening on port ${port}`);
})
