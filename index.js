import express from 'express'  // the web server (???)
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // loads the .env file into process.env


// data models
import Tomadores from './models/tomadores.js'


// constants
const PORT = 3000 // the port used by the express server

// obtain env variables to create connection string to the Atlas MongoDB cloud database
// If you're running on your local computer remember to set them on your OS prompt.
// If you're running on repl.it just set the secrets with
// key = variable name
// value = the values for username, password, host name (cluster) correspondingly

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD);
const mongohost = process.env.MONGO_HOST;
const mongodb = process.env.MONGO_INITDB_DATABASE;

// this is the connection string that will be used to connect to the database server
const uri = `mongodb+srv://${username}:${password}@${mongohost}/${mongodb}?retryWrites=true&w=majority`;

// connect to the database server
console.log(`Trying to connect to MongoDB Cloud database at ${mongohost}...`);
mongoose.connect(uri)
  .then((stuff) => {
    console.log(`Connection successful. Database Version =${stuff.version}`)

  })
  .catch((error) => {
    console.log(`Error connecting to ${mongohost}: `)
    console.log(error)
  })
// instantiate the app (web) server
const app = express() // creates the express instance that will be used

app.use(express.json()) // setup express for JSON() via middleware



// first route
// this is equal to https://nodemongo.bokomoko.repl.co/
// your address will be different
app.get("/",
  // the folowing function will be called whenever an access to / is done
  // req contains all data from the client request.
  // more info on the request data -> https://expressjs.com/pt-br/api.html#req
  // res will be the response returned to the client
  // more info on the response data -> https://expressjs.com/pt-br/api.html#res
  (req, res) => {
    // this is the code that will run whenever a get to the page is done
    // the req.ip contains the IP address of the client.
    console.log(`Somebody did a get from IP ${req.ip}`)
    // UNLESS it's been proxied (as is the case with all repl.it pages)
    console.log(`is There any proxy? ${req.get('X-Forwarded-For')}`)

    // if req.get('X-Forwarded-For') is no empty and is different from
    // req.ip it means that proxy occurred indeed

    // now prepare the response
    res
      .status(200)
      .json({ siteID: "Node plus Mongoose demo for educational purposes" })

  })

// entry point to add data to the tomadores collection

app.post('/tomadores', async (req, res) => {
  // data from the client will be inside the body of the request
  const tomador = { ...req.body }
  if (!tomador.razaoSocial) {
    res.status(400).json({ error: "razaoSocial is required" })
    return
  }

  try {
    const { _id } = await Tomadores.create(tomador) // result will contain the data just inserted plus the _ID     console.log({ result })
    res.status(201).json({ _id })
  }
  catch (error) {
    res.status(500).json({ error })
  }


})

// start the express server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

