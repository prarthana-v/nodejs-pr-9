const express = require("express");
const connectDB = require("./config/db");
const app = express()
const port = 8000;
connectDB()

//Configuration
const cloudinary = require('cloudinary').v2


// Configuration
cloudinary.config({
  cloud_name: 'dvlmfmhh0',
  api_key: '651819352999915',
  api_secret: 'ic5jhLUMcp_wlhVWeoENCGrNOkM' // Click 'View API Keys' above to copy your API secret
});

const cors = require('cors')
app.use(cors());

app.use(express.json());

app.set('view engine', 'ejs')
app.use(express.urlencoded())


app.use('/api/v1', require('./routes/indexRoutes'))


app.listen(port, (err) => {
  if (err) console.log(err);

  console.log(`server is running on port ${port}`)
})
