# react-notes

This is a simple React notes editor, designed with separate front- & back-end. Although this is a small app, I chose to organize the code modularly to practice scalable React architecture and improve code reusability.

How to set up the .env file:
Locate the .env.Example file
In the root directory of the project, you will find a file named .env.Example. This file contains placeholders for environment variables that your application needs to run.

Create a custom .env file

Make a copy of the .env.Example file.
Rename the copied file to .env.
This will be the file where you store your own environment-specific values.

Set up your MongoDB connection string
In the newly created .env file, you'll need to add your MongoDB connection string. Replace the placeholder in the example file with your actual connection string. The format should look like this:

plaintext
Copy code
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
Replace <username> with your MongoDB username.
Replace <password> with your MongoDB password.
Replace <cluster-url> with your MongoDB cluster URL.
Replace <database> with the name of the specific database you are connecting to.
Save the file
After making these changes, save the .env file.

Important: Do not commit the .env file to version control as it contains sensitive information like database credentials. Make sure it is included in the .gitignore file.