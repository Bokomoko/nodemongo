import express from 'express'  // the web server (???)
import mongoose from 'mongoose'


// constants
const PORT = 3000 // the port used by the express server

// obtain env variables to create connection string to the Atlas MongoDB cloud database
// If you're running on your local computer remember to set them on your OS prompt.
// If you're running on repl.it just set the secrets with 
// key = variable name
// value = the values for username, password, host name (cluster) correspondingly 

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const mongohost = process.env.MONGO_HOST;

// this is the connection string that will be used to connect to the database server
const uri = `mongodb+srv://${username}:${password}@${mongohost}`;


// connect to the database server

mongoose.connect(uri)
  .then((stuff) => {
    console.log(`Connection successful`)
    console.log(`That's what we got`)
    for (const [key, value] of Object.entries(stuff)) {
      console.log(`${key} : ${typeof value}`)
    }
  })
  .catch((error) => console.log)

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

// start the express server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

