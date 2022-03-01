import express, { Express, Request, Response } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//mongoose
connect('mongodb://localhost:27017/users-db', () => {
    console.log('Successfully connected to db')
});

// connect('mongodb+srv://testuser:KLy0KYHe1YlbO4CR@maincluster.7q6fv.mongodb.net/users-db?retryWrites=true&w=majority', ()=>{console.log('Successfully connected to db')});

const PORT =  process.env.PORT || 3000;

const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
import { authRouter } from './routes/auth';

app.use('/auth', authRouter);

app.get('/',(req: Request, res: Response)=>{
    res.send('<h1>Welcome Screen</h1>');
});

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
