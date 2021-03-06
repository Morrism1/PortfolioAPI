import express from "express";
import morgan from "morgan";
import {error, errors} from "celebrate";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(errors());

app.use((req,res,next)=>{
    const error= new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((req,res,next)=>{
const status = error.status || 500;
return res.status(status).json({
    status,
    message: error.message || 'server error'
});
});

export default app;