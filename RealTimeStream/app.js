import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.render('index');
});



export default app;