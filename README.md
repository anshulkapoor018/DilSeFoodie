# DilSeFoodie

DilSeFoodie is a full-stack restaurant discovery, review, and food ordering app focused on local restaurants around Jersey City and Hoboken. The project has been modernized from its original Heroku-era setup into a cleaner local development experience with a refreshed React UI, seeded local restaurant menus, and a first-pass Vercel API scaffold.

## What It Does

- Browse local restaurants by cuisine, location, and search term.
- View restaurant detail pages with address, category, website, reviews, and ordering actions.
- Explore pickup mode on a map-backed restaurant index.
- Browse restaurant-specific menus.
- Add menu items to a cart, adjust quantities, and review totals.
- Complete checkout as delivery or pickup.
- Sign up, log in, and access a profile/order history flow.
- Seed realistic local restaurants and menu items for development.

## Tech Stack

- React 17
- React Router
- Node.js and Express
- MongoDB with Mongoose
- Google Maps integrations
- Cloudinary integration hooks
- Nodemailer integration hooks
- Vercel serverless API scaffold

## Modernization Updates

The app now includes:

- A refreshed Teenage Engineering-inspired visual system.
- Modernized home, restaurant index, restaurant detail, menu, cart, checkout, search results, and auth screens.
- Local dev ports standardized to:
  - Frontend: `http://localhost:3002`
  - Backend: `http://localhost:5001`
- API base URL support through `client/src/config/api.js`.
- Local menu seeding for 11 restaurants and 44 menu items.
- Initial Vercel routing files:
  - `api/index.js`
  - `vercel.json`
  - `config/db.js`

## Local Setup

Install root dependencies:

```bash
npm install
```

Install client dependencies:

```bash
npm run client-install
```

Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/dilsefoodie
SESSION_SECRET=make-a-long-random-string-here
```

For local development, make sure MongoDB is running.

## Seed Local Data

Seed or refresh local restaurants and menu items:

```bash
npm run seed:local-menus
```

This upserts the local restaurant list and refreshes each restaurant menu. It currently seeds:

- 11 restaurants
- 44 menu items

## Run Locally

Start the backend and frontend together:

```bash
npm run dev
```

Open:

```text
http://localhost:3002
```

The backend API runs at:

```text
http://localhost:5001
```

## Useful Scripts

```bash
npm run dev
```

Runs the Express server and React client together.

```bash
npm run server
```

Runs only the Express server on port `5001`.

```bash
npm run client
```

Runs only the React client on port `3002`.

```bash
npm run seed:local-menus
```

Seeds local restaurants and menu items.

```bash
npm run vercel-build
```

Runs the current production build command used for Vercel-style builds.

## Environment Variables

Current local/deployment variables:

```bash
MONGODB_URI=
SESSION_SECRET=
```

Planned cleanup variables for Vercel readiness:

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

Some older backend routes still contain legacy email credentials in source. Before a real production deployment, those should be moved fully into environment variables and any exposed credentials should be rotated.

## Vercel Notes

The project is not fully Vercel-ready yet, but the first scaffold is in place. The frontend can build, and the Express app has an initial serverless entry under `api/index.js`.

Before production deployment, the remaining work is:

- Move all backend secrets to environment variables.
- Convert backend routes route-by-route for Vercel serverless behavior.
- Confirm MongoDB Atlas connection settings.
- Confirm upload/email flows in a serverless environment.
- Clean up legacy warnings and dependency audit issues.

## Project Structure

```text
api/                 Vercel serverless API entry
client/              React application
client/src/components
client/src/views
client/src/pages
client/src/cart
config/              Shared backend configuration
models/              Mongoose models
routes/              Express route handlers
seed/                Local seed data and seed scripts
server.js            Local Express server
vercel.json          Initial Vercel routing config
```

## Current Known Warnings

The app builds successfully, but the build still reports older warnings in untouched legacy areas, including:

- Some unused imports
- Some duplicate JSX props
- A few old lint warnings
- Dependency audit warnings from the older package set

These are candidates for future cleanup.

## Team Members:

Anshul Kapoor
Arun Nalluri
Pranay Singh
Ikenna Ibezim
