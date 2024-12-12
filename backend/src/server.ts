import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 
import userRoutes from './routes/userRoutes'; 
import cloudinary from './config/cloudinary';


dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(
    cors({
      origin: '*',          
      methods: '*'          
    })
  );
app.use(bodyParser.json());

// MongoDB Connection
const CONNECTION_URL = process.env.MONGO_URI;

if (!CONNECTION_URL) {
    throw new Error('MONGO_URI is not defined in the .env file');
}

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions) 
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err: unknown) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });

// Example Route
app.get('/', (req: Request, res: Response) => {
    res.send('NAGANA SIYA1');
});

//Login and Register Routes
app.use('/api/auth', authRoutes);

//User routes
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
