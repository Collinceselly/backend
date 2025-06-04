import express from 'express'; // Importing the express
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000; // Look for port number from the environment variable or use 5000 if not found.

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name from the file path
const __dirname = dirname(__filename);


// Middleware
app.use(express.json()); // Telling the app to expect json and enable it to interpret the information
// Telling express to server all file in public as static files/assets and also that public directory sits one level outside the server.js
// In a nutshell, telling the server where to find the public directory.
app.use(express.static(path.join(__dirname, '../public')));


// Serving up the index.html from the ./public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))

})


// Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})