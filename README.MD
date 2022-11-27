# A simple MongoDB CRUD server

For educational purposes

## How to use it

Clone the repository into your local machine

```bash
git clone https://github.com/Bokomoko/nodemongo.git
```

Make sure you have valid username and password for a MongoDB server as well as it's URI

I strongly recommend to use the MongoDB Atlas Cloud server. It's free and is one less thing to mess up your local configuration.

Edit the .env.sample file and add the credentials. Don't let any < or >

Rename the .env.sample to .env

If you're using any kind of web dev hosting like Repl.it or CodeSpaces or any other, add those env variables as "secrets"

First, make sure you're using Node version as stated in the .nvmrc

If you're use nvm ...

```bash
nvm use
```

With everything set, now it's time to install the dependencies

```bash
npm install
```

To run the server

```bash
npm start
```

The server will provide these entry points

* GET /tomadores - List all the tomadores present in the database
* GET /tomadores/:id - Get all the fields from a tomador identified by id
* POST /tomadores - Adds a tomador from the JSON body. Returns the full document and it's _id
* PUT /tomadores - Updates a tomador from the JSON body. Returns the updated document. An _id is required. Just provide the fields that needed to be changed and their new values
* DELETE /tomadores/:id - Deletes the tomador identified by id from the database.

All responses in JSON format with additional info and error codes if it's the case.
