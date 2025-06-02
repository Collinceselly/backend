// The address conected to this server is 
// URL->http://localhost:8383
// IP equivalence => 127.0.0.1:8383
const express = require('express'); // Fetching express/importing express from the express package to the codebase (assigning it to a variable)

const app = express(); //Defining the backend application
const PORT = 8383; // Port to listen to

//Middleware

app.use(express.json());

let data = ['Collince']

// HTTP Verbs and Routes (or Paths)

// Type 1 - Website endpoint (These are endpoints for sending back html and they typically come when a user enter a url in a browser )

app.get('/', (req, res) => {
    // A get method to / endpoint
    res.send('<h1>Homepage</h1>')
    
    // console.log('I am already there!', req.method);
    // res.sendStatus(201);
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <h1>This is the Dashboard</h1>
        <body>
        <a href="/api/data">Data Page</a>
        </body>
        `)
    
    // console.log('This is the dashboard page!', req.method);
    // res.send('Hello Dashboard, you look beautiful')
})


// Type 2 - API endpoints (non-visual)

app.get('/api/data', (req, res) => {
    console.log('This for data');
    res.send(`
        <h1>DATA:</h1>
        <body>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
        </body>
        `)

})

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201);
})

app.delete('/api/delete', (req, res) => {
    data.pop();
    console.log('We have deleted the  entery off the end of the array')
    res.sendStatus(203)
})

// Telling the app to listen to incoming requests
app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`)) 

