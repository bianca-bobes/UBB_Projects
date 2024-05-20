import express from 'express';
import routes from './routes/routes';
import authRoutes from './routes/auth';
import path from 'path';
import cors from 'cors'; // Import the cors middleware
import FlowerModel from './model/FlowerSchema';
import mongoose from 'mongoose';
import http from 'http';

const app = express();

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (images) from the 'images' directory
app.use('/images', express.static(path.join(__dirname, './images')));

// Configure CORS middleware
app.use(cors());

// Use routes defined in routes.ts
app.use(routes);

const port = 1337;



// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error('MongoDB URI is not defined in the environment variables.');
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server is running on port ${ port }');
});

export default app;
