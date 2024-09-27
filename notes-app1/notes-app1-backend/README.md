yarn start = regular start
yarn start:background = start in the background
yarn stop = stop


Setting Up Your Database Connection String
To run this project locally, you need to set up a .env file with your MongoDB connection string. This connection string is used to connect to the database required for the application to function properly. Follow the steps below to recreate a functioning database connection string.

Step 1: Create a .env File
Copy the example environment file to create your own .env file. This file will store your environment variables securely.

bash
Copy code
cp .env.example .env
Open the newly created .env file in your code editor.

Step 2: Set Up Your MongoDB Database
You will need a MongoDB database to connect to. You can use a local MongoDB instance or set up a cloud database using MongoDB Atlas. Below are the steps for setting up a cloud database with MongoDB Atlas:

Sign Up or Log In to MongoDB Atlas:

Go to MongoDB Atlas and sign up for a free account or log in if you already have one.
Create a New Cluster:

Click on "Build a Cluster" and follow the prompts to create a new cluster. The free tier is usually sufficient for development.
Set Up a Database User:

Go to "Database Access" under the Security section.
Click "Add New Database User", create a username and password, and set the access permissions.
Network Access:

Go to "Network Access" and click "Add IP Address".
Add your IP address or allow access from anywhere (0.0.0.0/0) for development purposes. Be cautious with security settings in production.
Get Your Connection String:

Go to your cluster and click "Connect".
Select "Connect your application", and copy the provided connection string. It will look something like this:
php
Copy code
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
Step 3: Update the .env File
Paste the connection string you copied from MongoDB Atlas into the DB_CONNECTION variable in your .env file.

Replace the placeholders <username>, <password>, <cluster-url>, and <database-name> with your specific details:

plaintext
Copy code
DB_CONNECTION="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
<username>: Your MongoDB username.
<password>: Your MongoDB password.
<cluster-url>: The URL of your MongoDB cluster (e.g., cluster0.mongodb.net).
<database-name>: The name of the database you want to connect to (e.g., notesDB).
Step 4: Save and Test Your Connection
Save the .env file after updating it with your details.

Start your application and verify that it connects to your database without errors.