# Welcome to Full Stack Restaurant Rating Project!
## Team Name: DogeCoin

## Project is Hosted on HEROKU - http://dilsefoodie.herokuapp.com

_Topic: Restaurant Rating and Online Ordering System_

## Project Features

1. Fully responsive ReactJS Application aggregating restaurant details with Backend using MongoDB Cloud Atlas and hosted on HEROKU
2. Features Developed: User Dashboard, Login Authentication, Backend API’s using NodeJS, Food Ordering, Food Cart, Database management, Restaurant Reviews

### Introduction
As modern consumers, we greatly benefit from product recommendation applications. In particular, it is convenient to get a list of restaurants that match our preferences without much clicking, comparing, and browsing through long lists of reviews for each and every single business. 
Thus, our project focuses on creating a repository of restaurant ratings from users, for other users to search and browse by restaurant category and name, Also, Provide an experience to Order food from a restaurant in their vicinity.

Team Members:
1. Anshul Kapoor
2. Arun Nalluri
3. Pranay Singh
4. Ikenna Ibezim

## Testing Application
#### Link to Reference 
- #### https://jestjs.io/docs/tutorial-react

#### To Run the general test
- #### Run: npm test

#### To Run Link test
- #### Run: npm test Test/Link.react.test.js

## Available Scripts

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. If you are interested in how this works follow the nodemon In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.
Server Runs on http://localhost:5000

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>

## File structure
#### `Project Wireframes` - This holds all of our Design Files
#### `public` - This holds all of our static files
#### `src`
- #### `assets` - This folder holds assets such as images, docs, and fonts
- #### `components` - This folder holds all of the different components that will make up our views and use state functions to manage data
- #### `Static` - This folder holds all of the different components that are Static Templates and reusable
- #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
- #### `App.js` - This is what renders all of our browser routes and different views
- #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `backend` - Holds the server application
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
- #### `package.json` - Defines npm behaviors and packages for the client
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
