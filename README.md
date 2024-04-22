<h1 align="center">Welcome to Events Platform Back-End 👋</h1>

<p>
This RESTful API was designed to provide essential functionalities for a platform where businesses can share their events with community members, allowing members to sign up and optionally make payments to participate in the events.</p>
<p>The technologies used in development include Express.js to handle API routes and business logic, Prisma for database interactions, Firebase Admin for authentication and other Firebase functionalities, Stripe for payment processing, Cloudinary for image manipulation, and Zod for data validation.</p>
<p>With this API, developers can create both a website and a mobile application to provide a user-friendly interface, enabling users to view events, sign up, and make payments securely and efficiently.</p>

### Hosted version

Link to the hosted version of the API below with available endpoints.

<a href='https://be-events-platfrom.onrender.com/api/v1' target="_blank">https://be-events-platfrom.onrender.com/api/v1</a>

## How to initialize this project

To run this project you need the following programs:

- Node: v20.9.0
- PostgreSQL: 16.2

Then follow the steps below:

<p>
Note: If you want to log in with an administrator user on the front-end, you can run the npm run seed command on your terminal to add the data to the database and then you must create a user on Firebase through the website with the following email: admin@ mail.com

With this user you will have access to the form to create new events on the website

The hosted version of the website uses this email as admin: admin@ mail.com
password: 10203040

</p>

<ol>
  <li>Clone this repository</li>
  <br>
  <li>Then you need to install the project's dependencies which you can look for in the `package.json` file.

Use your `npm` or `yarn` package managers to install dependencies

```sh
npm install
```

or

```sh
yarn install
```

</li>

  <li>
  
 This repository uses the environment variables, to run this project you need to create file .env in the root folder of this project, and inside contain the following environment variable below.
 
 ```env
# POSTGRESQL CONNECTION URIs - Se more https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/events_db?schema=public"

###################################

# FIREBASE AUTH ADMIN - Se more https://firebase.google.com/docs/auth/admin

PROJECT_ID="XXXXXX"
PRIVATE_KEY_ID="XXXXXX"
PRIVATE_KEY='"XXXXXX"'
CLIENT_EMAIL="XXXXXX"
CLIENT_ID="XXXXXX"
AUTH_URI="XXXXXX"
TOKEN_URI="XXXXXX"
AUTH_PROVIDER_X509_CERT_URL="XXXXXX"
CLIENT_X509_CERT_URL="XXXXXX"
UNIVERSE_DOMAIN="XXXXXX"

###################################

# CLOUDINARY KEY - used to host banner images for events created through the frontend, se more https://cloudinary.com/developers

#

CLOUD_NAME="XXXXX"
CLOUDINARY_API_KEY="XXXXXX"
CLOUDINARY_API_SECRET="XXXXXXXX"

###################################

# STRIPE KEY - used to handle the payments, se more https://docs.stripe.com/

STRIPE_PUBLISHABLE_KEY="XXXXXXX"
STRIPE_SECRET_KEY="XXXXXXXXXXX"
STRIPE_SUCCESS_URL="http://localhost:5173/checkout?success=true" # Customers will be directed to this URL if the checkout succeeds
STRIPE_CANCEL_URL="http://localhost:5173/checkout?canceled=true" # Customers will be directed to this URL if they decide to cancel payment and return to our website
STRIPE_SECRET_WEBHOOK="XXXXXXX" # For the payment flow to work correctly, the webhook must be configured through the Stripe CLI, which will listen to the "checkout.session.completed" events and automatically make a request to our API and complete the purchase order. Se more https://docs.stripe.com/payments/checkout/fulfill-orders?lang=node

````

</li>

 <li>To create and seed the database, you need to run the script bellow in your terminal.

```sh
npx prisma generate
npx prisma migrate dev
````

</li>

<li>To re-seed the database run the script below in the terminal

```sh
npm run setup-db
```

</li>

<li>
Run the following code in the terminal to begin start the server:

```sh
npm run dev
```

</li>
</ol>

## Author

👤 **Gilberto Silva**

- Github: [@gilbertouk](https://github.com/gilbertouk)
- LinkedIn: [@gilbertoantonio](https://linkedin.com/in/gilbertoantonio)

## Show your support

Give a ⭐️ if this project helped you!
