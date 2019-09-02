import express, {Router} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Routes from './routes';


const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://app:P1sC3cFo7LXWZqJ5@tenderworks-db-hqvdq.mongodb.net/WorkTenders?retryWrites=true&w=majority', {useNewUrlParser: true}).then(()=> {
   console.log("successfully connected to database.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());
app.use(morgan('-> :method :url :status :res[content-length] - :response-time ms'))

app.get('/', function (req, res) {
    res.send('<h1>Work Tenders server!</h1>');
 });
   
 var server = app.listen(port, function () {
    console.log("app ",server.address().address, " listening on port :", server.address().port)
 });

 Routes(app);

 module.exports = { app };