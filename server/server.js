// const express = require('./config/express.js')
import express from 'express'
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express()
app.listen(port, () => console.log(`Server now running on port ${port}!`));
