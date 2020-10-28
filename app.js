const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const path = require('path')
const { dirname } = require('path')
const cors = require('cors')
const env = require('dotenv')

env.config();

// Initialize the app
const app = express()

// Middile wares *******
app.use(bodyparser.urlencoded({
    extended:false
}));
// Body parserer middleware
app.use(bodyparser.json());
// Cors Middleware
app.use(cors())

// Static path directory
app.set('public', path.join(__dirname, 'public'));
// app.use(express.statis(path.join(__dirname,'public')))

// Database connection
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ptohi.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log('DB is connected');}).catch(err => console.log(err));

// Routes here
app.get('/', (req,res) => {
    return res.send('<h1 style="text-align:center;margin:30px;">Welcome to MEVN stack api server</h1>')
})
const authRoutes = require('./routes/user')
app.use('/user',authRoutes)

// Running application
app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})