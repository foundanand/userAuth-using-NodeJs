const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


//create a port for the server
const { PORT }  = process.env;


// get request for route
app.get('/', (req, res) => {
    res.send('User Auth!');
  });
  

app.listen(PORT, () => {
  console.log("Server Listening on port http://localhost:" + PORT);
});
