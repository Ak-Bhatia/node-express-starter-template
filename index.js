import express from 'express'
import bodyparser from 'body-parser'
import { restRouter } from "./api";
import cors from 'cors';
import db from './db';

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 8080;

//bodyParser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true 
    // enable set cookie
}));

app.get('/', (req,res) => {
    res.json({
        message: "This is home route"
    })
});

app.use('/', restRouter);

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Server running on PORT: "+PORT)
    }
});