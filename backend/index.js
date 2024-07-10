const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const connection_db = require('./db')
connection_db();


const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/signup', require("./routes/createuser"), (req,res)=>{
  console.log("User faied to create")
});

app.use('/food', require("./routes/displaydata"), (req,res)=>{
  console.log("Log in falied")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})