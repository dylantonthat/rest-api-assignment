const express = require('express');
const app = express();
const port = 3000;

const { v4: uuidv4 } = require('uuid');


// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = {};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const {name, email} = req.body;

    // Error handling for missing name/email
    if (!name)
    { return res.status(400).send('Name is required.'); }
    if (!email)
    { return res.status(400).send('Email is required.'); }

    // Generate random 12 digit id
    const id = uuidv4();
    users[id] = {id, name, email};

    res.status(201).json(users[id]);
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params;

    // Error handling for invalid ID
    if (!users[id])
    { return res.status(404).send('User not found.'); }

    res.json(users[id]);

})

app.put('/users/:id', (req, res) => {
    const {id} = req.params;

    // Error handling for invalid ID
    if (!users[id])
    { return res.status(404).send('User not found.'); }

    const {name, email} = req.body;

    // Error handling for missing name/email
    if (!name)
    { return res.status(400).send('Name is required.'); }
    if (!email)
    { return res.status(400).send('Email is required.'); }

    users[id] = {id, name, email}
    return res.json(users[id]);
    
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    // Error handling for invalid ID
    if (!users[id])
    { return res.status(404).send('User not found.'); }

    delete users[id];
    return res.status(204).send();
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing