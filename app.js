const fs = require('fs');
const path  = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database')


const app = express();

const userRoutes = require('./routes/userRoutes')

const cors = require('cors');
app.use(cors());




app.use(bodyParser.json({extended:false}));

app.use(userRoutes)









sequelize.sync()
.then((result) => {
    app.listen(6200);
    console.log("Server running...")
})
.catch(err => console.log(err))