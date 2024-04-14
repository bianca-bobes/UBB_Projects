import express from 'express';
import routes from './routes/routes';
import path from 'path';
import cors from 'cors'; // Import the cors middleware

const app = express();

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (images) from the 'images' directory
app.use('/images', express.static(path.join(__dirname, './images')));

// Configure CORS middleware
app.use(cors());

// Use routes defined in routes.ts
app.use(routes);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
export default app;