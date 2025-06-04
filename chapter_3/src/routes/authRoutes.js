import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { error } from 'console';


const router = express.Router();


// Register a new user endpoint (/auth/register)
router.post('/register', (req, res) => {
    const { username, password } = req.body;


    // Encrpt password
    const hashedPassword = bcrypt.hashSync(password, 8);

     // Save new user and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`); // Prepare a sql query to insert records into a table of the db
        const result = insertUser.run(username, hashedPassword); // Run the insertUser command to fetch the values and insert them into a the table

        const defaultTodo = `Hello :) Add your first todo!`; // Add the default todo for users who it is their first time creating an account

        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`); // Query for adding a todo

        insertTodo.run(result.lastInsertRowid, defaultTodo); // Run the isert command user_id is the id of the last row and task is the defaulTodo

        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn:'24h' }) // A token for authenticating a user for a subsequent access to the server 
        res.json({ token })

    }catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    // console.log(hashedPassword);
    

})

// Login user endpoint (/auth/login)
router.post('/login', (req, res) => {

    const { username, password } = req.body; // Destructure username and password from the request body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?'); // SQL to fetch a username from the users table

        const user = getUser.get(username); // Assigning a user's username from the getUser varianle

        if (!user) {return res.status(404).send({ message: "User not found" })}; // If no user match, return out of the function with an error code and not found message

        const passwordIsValid = bcrypt.compareSync(password, user.password); // Compare the entered  hashed password against the user harshed stored password

        if (!passwordIsValid) {return res.status(401).send({ message: "Invalid Password" })}; // For invalid password
        console.log(user)


        // Then we have a successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn:'24h' });
        res.json({ token });



    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})


export default router;