const express = require("express")
const connectDB = require('./config/db')
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
connectDB()
app.use(cors());
app.get('/', (req, res) => {
    res.send('API is running');
});

// app.use(function (req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/users/',require('./modules/routes/api/users'))
app.use('/api/posts/',require('./modules/routes/api/posts'))
app.use('/api/auth/',require('./modules/routes/api/auth'))
app.use('/api/admin/',require('./modules/routes/api/admin'))
app.use('/api/profile/',require('./modules/routes/api/profile'))
const PORT = 5000;
app.listen(5000, () => {
    console.log('App listening on port 5000!');
});
