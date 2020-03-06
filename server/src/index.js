const express = require ('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares')

const app = express();

mongoose.connect('mongodb://localhost/travel-log', {
    useNewUrlParser: true,
});

const port = process.env.PORT || 1327;
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.get('/', (req,res)=>{
    res.json({
        message: 'Hola!',

    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler); 


app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`);
});



